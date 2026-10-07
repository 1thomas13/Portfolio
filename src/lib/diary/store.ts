import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { DIARY_GITHUB_BRANCH, DIARY_GITHUB_REPO, DIARY_GITHUB_TOKEN, DIARY_KEY } from "astro:env/server"
import type { PushSubscription } from "web-push"
import { decrypt, encrypt, parseKey } from "./crypto.js"
import { parseWeek, serializeWeek, type Week } from "./week"

const FOLDER = "weeks"
const LOCAL_DIR = join(process.cwd(), "diary-data")

// With DIARY_KEY everything is stored encrypted (.enc); without it, as plain text (local testing only)
const key = DIARY_KEY ? parseKey(DIARY_KEY) : null
const EXT = key ? "enc" : "md"
const SUBSCRIPTIONS = key ? "subscriptions.enc" : "subscriptions.json"
const encode = (text: string) => (key ? encrypt(text, key) : text)

function decode(text: string, file: string) {
  if (!key) return text
  try {
    return decrypt(text, key)
  } catch {
    throw new StoreError(`No se pudo descifrar ${file}. ¿Cambió DIARY_KEY?`)
  }
}

export class StoreError extends Error {}
class Conflict extends Error {}

interface Snapshot {
  weeks: Map<string, Week>
  subscriptions: PushSubscription[]
  head: string | null
}

interface Change {
  weeks?: Week[]
  subscriptions?: PushSubscription[]
}

const useGithub = () => Boolean(DIARY_GITHUB_TOKEN && DIARY_GITHUB_REPO)

async function github<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${DIARY_GITHUB_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json().catch(() => ({}))
  const message = json.errors?.map((e: { message: string }) => e.message).join(" · ") ?? (res.ok ? "" : `GitHub respondió ${res.status}`)
  if (/expected.*head|is at .* but expected/i.test(message)) throw new Conflict(message)
  if (message) throw new StoreError(message)
  return json.data
}

async function readGithub(): Promise<Snapshot> {
  const [owner, name] = DIARY_GITHUB_REPO!.split("/")
  const branch = DIARY_GITHUB_BRANCH
  const data = await github<{
    repository: {
      ref: { target: { oid: string } } | null
      weeks: { entries: { name: string; object: { text: string | null } }[] } | null
      subscriptions: { text: string | null } | null
    } | null
  }>(
    `query($owner: String!, $name: String!, $ref: String!, $weeks: String!, $subscriptions: String!) {
      repository(owner: $owner, name: $name) {
        ref(qualifiedName: $ref) { target { oid } }
        weeks: object(expression: $weeks) { ... on Tree { entries { name object { ... on Blob { text } } } } }
        subscriptions: object(expression: $subscriptions) { ... on Blob { text } }
      }
    }`,
    { owner, name, ref: `refs/heads/${branch}`, weeks: `${branch}:${FOLDER}`, subscriptions: `${branch}:${SUBSCRIPTIONS}` },
  )
  if (!data.repository) throw new StoreError(`No encuentro el repo ${DIARY_GITHUB_REPO}. Revisá el nombre y que el token tenga acceso.`)
  if (!data.repository.ref) throw new StoreError(`El repo no tiene la rama ${branch}. Si está vacío, crealo con un README.`)
  return {
    weeks: toWeeks((data.repository.weeks?.entries ?? []).map((e) => ({ name: e.name, text: e.object.text ?? "" }))),
    subscriptions: parseSubscriptions(data.repository.subscriptions?.text && decode(data.repository.subscriptions.text, SUBSCRIPTIONS)),
    head: data.repository.ref.target.oid,
  }
}

async function readLocal(): Promise<Snapshot> {
  const dir = join(LOCAL_DIR, FOLDER)
  const names = await readdir(dir).catch(() => [] as string[])
  const files = await Promise.all(names.map(async (name) => ({ name, text: await readFile(join(dir, name), "utf8") })))
  const subscriptions = await readFile(join(LOCAL_DIR, SUBSCRIPTIONS), "utf8").catch(() => "")
  return { weeks: toWeeks(files), subscriptions: parseSubscriptions(subscriptions && decode(subscriptions, SUBSCRIPTIONS)), head: null }
}

function toFiles({ weeks = [], subscriptions }: Change) {
  const files = weeks.map((w) => ({ path: `${FOLDER}/${w.id}.${EXT}`, content: encode(serializeWeek(w)) }))
  if (subscriptions) files.push({ path: SUBSCRIPTIONS, content: encode(`${JSON.stringify(subscriptions, null, 2)}\n`) })
  return files
}

async function writeGithub(files: { path: string; content: string }[], message: string, head: string | null) {
  await github(`mutation($input: CreateCommitOnBranchInput!) { createCommitOnBranch(input: $input) { commit { oid } } }`, {
    input: {
      branch: { repositoryNameWithOwner: DIARY_GITHUB_REPO, branchName: DIARY_GITHUB_BRANCH },
      message: { headline: message },
      expectedHeadOid: head,
      fileChanges: { additions: files.map((f) => ({ path: f.path, contents: Buffer.from(f.content).toString("base64") })) },
    },
  })
}

async function writeLocal(files: { path: string; content: string }[]) {
  await mkdir(join(LOCAL_DIR, FOLDER), { recursive: true })
  await Promise.all(files.map((f) => writeFile(join(LOCAL_DIR, f.path), f.content)))
}

function toWeeks(files: { name: string; text: string }[]) {
  const weeks = new Map<string, Week>()
  for (const { name, text } of files.sort((a, b) => a.name.localeCompare(b.name))) {
    const [base, ext] = name.split(".")
    if (ext === EXT && /^\d{4}-W\d{2}$/.test(base)) weeks.set(base, parseWeek(base, decode(text, name)))
  }
  return weeks
}

function parseSubscriptions(text: string | null | undefined): PushSubscription[] {
  try {
    const list = JSON.parse(text || "[]")
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function read(): Promise<Snapshot> {
  if (useGithub()) {
    if (!key) throw new StoreError("Falta DIARY_KEY: sin clave el diario no se guarda en GitHub.")
    return readGithub()
  }
  // Vercel has no writable disk: without GitHub configured, the diary only works locally
  if (import.meta.env.PROD) throw new StoreError("Falta configurar DIARY_GITHUB_TOKEN y DIARY_GITHUB_REPO en Vercel.")
  return readLocal()
}

// change gets what was read and returns what it modified. If another change landed in between
// (another tab, an edit on GitHub), it reads again and reapplies on top of it
export async function update(message: string, change: (snapshot: Snapshot) => Change | Week[]) {
  for (let attempt = 0; ; attempt++) {
    const snapshot = await read()
    const result = change(snapshot)
    const files = toFiles(Array.isArray(result) ? { weeks: [...new Set(result)] } : { ...result, weeks: [...new Set(result.weeks ?? [])] })
    if (!files.length) return
    if (!useGithub()) return writeLocal(files)
    try {
      return await writeGithub(files, message, snapshot.head)
    } catch (error) {
      if (!(error instanceof Conflict) || attempt > 0) throw error
    }
  }
}
