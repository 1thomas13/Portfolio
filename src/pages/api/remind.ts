import type { APIRoute } from "astro"
import { CRON_SECRET } from "astro:env/server"
import { createHash, timingSafeEqual } from "node:crypto"
import { pushConfigured, remind } from "@/lib/diary/reminders"

export const prerender = false

const hash = (text: string) => createHash("sha256").update(text).digest()

// Called nightly by the Vercel cron (see astro.config.mjs)
export const GET: APIRoute = async ({ request }) => {
  const auth = request.headers.get("authorization") ?? ""
  if (!CRON_SECRET || !timingSafeEqual(hash(auth), hash(`Bearer ${CRON_SECRET}`))) return new Response(null, { status: 401 })
  if (!pushConfigured()) return Response.json({ error: "Faltan DIARY_VAPID_PUBLIC y DIARY_VAPID_PRIVATE" }, { status: 500 })
  return Response.json(await remind())
}
