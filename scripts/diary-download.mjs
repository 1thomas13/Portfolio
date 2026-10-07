// Downloads the diary from the repo and saves it decrypted to diary-data/decrypted/ (git-ignored),
// to read it or ask Claude Code about it. Uses DIARY_GITHUB_TOKEN, DIARY_GITHUB_REPO and DIARY_KEY from .env
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { decrypt, parseKey } from "../src/lib/diary/crypto.js"

const env = Object.fromEntries([...(await readFile(".env", "utf8")).matchAll(/^\s*(\w+)\s*=\s*(.*?)\s*$/gm)].map((m) => [m[1], m[2]]))
const key = parseKey(env.DIARY_KEY)
const [owner, name] = (env.DIARY_GITHUB_REPO ?? "").split("/")
const branch = env.DIARY_GITHUB_BRANCH || "main"

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: { Authorization: `Bearer ${env.DIARY_GITHUB_TOKEN}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `query($owner: String!, $name: String!, $expression: String!) {
      repository(owner: $owner, name: $name) { object(expression: $expression) { ... on Tree { entries { name object { ... on Blob { text } } } } } }
    }`,
    variables: { owner, name, expression: `${branch}:weeks` },
  }),
})
const json = await res.json()
if (json.errors || !json.data?.repository) throw new Error(JSON.stringify(json.errors ?? json))

const entries = (json.data.repository.object?.entries ?? []).filter((e) => e.name.endsWith(".enc"))
await mkdir("diary-data/decrypted", { recursive: true })
for (const entry of entries) await writeFile(`diary-data/decrypted/${entry.name.replace(/\.enc$/, ".md")}`, decrypt(entry.object.text, key))
console.log(`${entries.length} weeks in diary-data/decrypted/`)
