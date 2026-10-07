import { DIARY_TZ, DIARY_VAPID_PRIVATE, DIARY_VAPID_PUBLIC } from "astro:env/server"
import webpush, { WebPushError, type PushSubscription } from "web-push"
import { today, weekOf, type Week } from "./week"
import { read, update } from "./store"

export interface Notice {
  title: string
  body: string
  url: string
}

export const pushConfigured = () => Boolean(DIARY_VAPID_PUBLIC && DIARY_VAPID_PRIVATE)

// Sunday without a close: close the week. Any other day, only if nothing was written yet
export function noticeFor(weeks: Map<string, Week>, date = today(DIARY_TZ)): Notice | null {
  const week = weeks.get(weekOf(date))
  const sunday = new Date(`${date}T00:00:00Z`).getUTCDay() === 0
  if (sunday && !week?.close.some((c) => c.answer.trim())) {
    return { title: "Cerrá la semana", body: "Tres preguntas: qué avanzaste, qué te costó, qué te llevás.", url: "/diary/#close" }
  }
  if (!week?.days.some((d) => d.date === date && d.entries.length)) {
    return { title: "¿Qué pasó hoy?", body: "Con una cosa alcanza: algo que hiciste, aprendiste o te trabó.", url: "/diary/" }
  }
  return null
}

export async function send(subscriptions: PushSubscription[], notice: Notice) {
  webpush.setVapidDetails("https://thomasbarreto.vercel.app", DIARY_VAPID_PUBLIC!, DIARY_VAPID_PRIVATE!)
  const results = await Promise.allSettled(subscriptions.map((s) => webpush.sendNotification(s, JSON.stringify(notice), { TTL: 60 * 60 * 6 })))
  // 404 / 410: the browser dropped the subscription (app uninstalled, site data cleared)
  const gone = subscriptions.filter((_, i) => {
    const r = results[i]
    return r.status === "rejected" && r.reason instanceof WebPushError && [404, 410].includes(r.reason.statusCode)
  })
  if (gone.length) {
    const endpoints = new Set(gone.map((s) => s.endpoint))
    await update("Reminders: remove expired devices", ({ subscriptions }) => ({
      subscriptions: subscriptions.filter((s) => !endpoints.has(s.endpoint)),
    }))
  }
  return results.filter((r) => r.status === "fulfilled").length
}

export async function remind() {
  const { weeks, subscriptions } = await read()
  const notice = noticeFor(weeks)
  if (!notice || !subscriptions.length) return { sent: 0, notice }
  return { sent: await send(subscriptions, notice), notice }
}
