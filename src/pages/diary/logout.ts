import type { APIRoute } from "astro"
import { logOut } from "@/lib/diary/auth"

export const prerender = false

export const POST: APIRoute = ({ cookies, redirect }) => {
  logOut(cookies)
  return redirect("/diary/login", 303)
}
