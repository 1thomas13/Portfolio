import { defineMiddleware } from "astro:middleware"
import { isLoggedIn } from "@/lib/diary/auth"

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url
  // Case-insensitive: Vercel routing may serve /Diary the same as /diary
  if (context.isPrerendered || !/^\/diary(\/|$)/i.test(pathname)) return next()

  if (!/^\/diary\/login\/?$/.test(pathname) && !isLoggedIn(context.cookies)) return context.redirect("/diary/login", 303)

  const response = await next()
  response.headers.set("Cache-Control", "private, no-store")
  response.headers.set("X-Robots-Tag", "noindex, nofollow")
  return response
})
