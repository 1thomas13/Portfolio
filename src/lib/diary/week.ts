// One week per file (weeks/2026-W41.md, or .enc when encrypted), as Markdown that also reads well on GitHub:
//
// # Semana 41 · 2026
// ## Pendientes
// - [ ] algo #tag          [x] done · [>] carried over to the next week
// ## 2026-10-05
// - [aprendí] ★ qué pasó, qué esperaba #tag      ★ = starred
//   → qué hago distinto
// ## Cierre
// ### ¿Qué avancé?
// respuesta

export const TYPES = [
  { key: "hice", label: "Hice", placeholder: "Qué hiciste y para qué. Ej: armé la cola de mails de la app." },
  { key: "aprendi", label: "Aprendí", placeholder: "Qué aprendiste y dónde. Ej: Redis no es solo caché, lo puedo usar para encolar tareas." },
  { key: "me-trabe", label: "Me trabé", placeholder: "Con qué te trabaste y cuánto tiempo. Ej: dos días con el refresh token." },
  { key: "me-di-cuenta", label: "Me di cuenta", placeholder: "Qué creías y qué pasó. Ej: se cayó un sitio porque se actualizó una dependencia sin tocar el package.json. Creía que eso no podía pasar." },
  { key: "repensar", label: "Repensar", placeholder: "Qué harías distinto. Ej: hubiera pedido el diseño antes de empezar." },
] as const

export const CLOSE_QUESTIONS = ["¿Qué avancé?", "¿Qué me costó y qué me destrabó?", "¿Qué me llevo para la semana que viene?"]

export type PendingState = " " | "x" | ">"
export interface Pending {
  text: string
  state: PendingState
}
export interface Entry {
  type: string
  text: string
  next?: string
  star?: boolean
}
export interface Day {
  date: string
  entries: Entry[]
}
export interface Week {
  id: string
  pending: Pending[]
  days: Day[]
  close: { question: string; answer: string }[]
  // Sections outside the format (added by hand on GitHub) are kept as they are
  extra: { heading: string; body: string }[]
}

export const plain = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")

export const slug = (text: string) => plain(text).trim().replace(/\s+/g, "-")

export const typeLabel = (type: string) => TYPES.find((t) => t.key === slug(type))?.label ?? type

export const tagsOf = (text: string) => [...new Set([...text.matchAll(/#([\p{L}\p{N}_-]+)/gu)].map((m) => m[1].toLowerCase()))]

const DATE = /^\d{4}-\d{2}-\d{2}$/
const DAY_MS = 864e5
const pad = (n: number) => String(n).padStart(2, "0")
const toIso = (d: Date) => d.toISOString().slice(0, 10)

export function today(timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date())
}

export function weekOf(date: string) {
  const d = new Date(`${date}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7) + 3)
  const year = d.getUTCFullYear()
  const week = Math.floor((d.getTime() - Date.UTC(year, 0, 1)) / DAY_MS / 7) + 1
  return `${year}-W${pad(week)}`
}

export const isWeekId = (id: string) => /^\d{4}-W\d{2}$/.test(id)

export function daysOf(id: string) {
  const [year, week] = id.split("-W").map(Number)
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const monday = jan4.getTime() - ((jan4.getUTCDay() + 6) % 7) * DAY_MS + (week - 1) * 7 * DAY_MS
  return Array.from({ length: 7 }, (_, i) => toIso(new Date(monday + i * DAY_MS)))
}

export const shiftWeek = (id: string, weeks: number) => weekOf(toIso(new Date(new Date(`${daysOf(id)[0]}T00:00:00Z`).getTime() + weeks * 7 * DAY_MS)))

export const formatDay = (date: string, options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "short" }) =>
  new Intl.DateTimeFormat("es-AR", { timeZone: "UTC", ...options }).format(new Date(`${date}T00:00:00Z`)).replace(".", "")

export const emptyWeek = (id: string): Week => ({ id, pending: [], days: [], close: [], extra: [] })

export function parseWeek(id: string, markdown: string): Week {
  const week = emptyWeek(id)
  let section: { kind: "pending" | "day" | "close" | "extra"; day?: Day; extra?: { heading: string; body: string } } | null = null
  let lastEntry: Entry | null = null
  let lastClose: { question: string; answer: string } | null = null

  for (const raw of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trimEnd()
    const h2 = line.match(/^## (.+)$/)
    if (h2) {
      const heading = h2[1].trim()
      lastEntry = lastClose = null
      if (slug(heading) === "pendientes") section = { kind: "pending" }
      else if (slug(heading) === "cierre") section = { kind: "close" }
      else if (DATE.test(heading)) {
        const day = { date: heading, entries: [] }
        week.days.push(day)
        section = { kind: "day", day }
      } else {
        const extra = { heading, body: "" }
        week.extra.push(extra)
        section = { kind: "extra", extra }
      }
      continue
    }
    if (/^# /.test(line) || (!section && !line.trim())) continue
    if (!section) {
      const extra = { heading: "Notas", body: "" }
      week.extra.push(extra)
      section = { kind: "extra", extra }
    }

    if (section.kind === "extra") {
      section.extra!.body += `${raw}\n`
      continue
    }
    if (!line.trim()) continue

    if (section.kind === "pending") {
      const m = line.match(/^- \[([ x>])\] (.*)$/i)
      week.pending.push(m ? { state: m[1].toLowerCase() as PendingState, text: m[2].trim() } : { state: " ", text: line.replace(/^- /, "").trim() })
    } else if (section.kind === "day") {
      const m = line.match(/^- \[([^\]]+)\] ?(.*)$/)
      const next = line.match(/^\s+→\s*(.*)$/)
      if (m) {
        const star = /^★\s*/.test(m[2])
        lastEntry = { type: m[1].trim(), text: m[2].replace(/^★\s*/, "").trim(), star }
        section.day!.entries.push(lastEntry)
      } else if (next && lastEntry) {
        lastEntry.next = lastEntry.next ? `${lastEntry.next}\n${next[1]}` : next[1]
      } else if (lastEntry) {
        lastEntry.text += `\n${line.trim()}`
      } else {
        lastEntry = { type: "nota", text: line.replace(/^- /, "").trim() }
        section.day!.entries.push(lastEntry)
      }
    } else {
      const h3 = line.match(/^### (.+)$/)
      if (h3) week.close.push((lastClose = { question: h3[1].trim(), answer: "" }))
      else if (lastClose) lastClose.answer = lastClose.answer ? `${lastClose.answer}\n${line}` : line
      else week.close.push((lastClose = { question: "", answer: line }))
    }
  }
  week.days.sort((a, b) => a.date.localeCompare(b.date))
  return week
}

const indent = (text: string, prefix: string) => text.split("\n").map((l, i) => (i ? `  ${l}` : `${prefix}${l}`)).join("\n")

export function serializeWeek(week: Week) {
  const [year, number] = week.id.split("-W")
  const out = [`# Semana ${Number(number)} · ${year}`, ""]
  if (week.pending.length) {
    out.push("## Pendientes", ...week.pending.map((p) => `- [${p.state}] ${p.text}`), "")
  }
  for (const day of week.days) {
    if (!day.entries.length) continue
    out.push(`## ${day.date}`)
    for (const e of day.entries) {
      out.push(indent(e.text, `- [${e.type}] ${e.star ? "★ " : ""}`))
      if (e.next) out.push(indent(e.next, "  → ").replace(/\n {2}/g, "\n  → "))
    }
    out.push("")
  }
  const answered = week.close.filter((c) => c.answer.trim())
  if (answered.length) {
    out.push("## Cierre")
    for (const c of answered) out.push(...(c.question ? [`### ${c.question}`] : []), c.answer.trim(), "")
  }
  for (const e of week.extra) out.push(`## ${e.heading}`, e.body.trim(), "")
  return `${out.join("\n").trim()}\n`
}

// When the week doesn't exist yet, open pending items from the last week move here and are
// marked [>] there. Returns the weeks that changed
export function openWeek(weeks: Map<string, Week>, id: string): Week[] {
  if (weeks.has(id)) return []
  const week = emptyWeek(id)
  weeks.set(id, week)
  const previous = [...weeks.keys()].filter((k) => k < id).sort().at(-1)
  const from = previous ? weeks.get(previous)! : null
  const open = from?.pending.filter((p) => p.state === " ") ?? []
  if (!from || !open.length) return [week]
  for (const p of open) {
    p.state = ">"
    week.pending.push({ text: p.text, state: " " })
  }
  return [from, week]
}

// How many weeks in a row this pending item has been carried (1 = it's from this week)
export function carriedWeeks(weeks: Map<string, Week>, id: string, text: string) {
  const ids = [...weeks.keys()].filter((k) => k < id).sort().reverse()
  let count = 1
  for (const k of ids) {
    if (!weeks.get(k)!.pending.some((p) => p.state === ">" && p.text === text)) break
    count++
  }
  return count
}
