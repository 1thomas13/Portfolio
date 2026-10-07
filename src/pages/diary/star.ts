import type { APIRoute } from "astro"
import { isWeekId } from "@/lib/diary/week"
import { update } from "@/lib/diary/store"

export const prerender = false

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData()
  const field = (name: string) => String(form.get(name) ?? "")
  const back = field("back")
  const target = back.startsWith("/diary") ? back : "/diary/"
  const id = field("week")
  if (!isWeekId(id)) return redirect(target, 303)

  await update("Star", ({ weeks }) => {
    const week = weeks.get(id)
    const entry = week?.days.find((d) => d.date === field("day"))?.entries[Number(field("index"))]
    // If the week changed in between (another tab), don't star the wrong entry
    if (!week || !entry || entry.text !== field("text")) return []
    entry.star = !entry.star
    return [week]
  })
  return redirect(target, 303)
}
