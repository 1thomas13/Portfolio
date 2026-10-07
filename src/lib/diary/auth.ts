import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import type { AstroCookies } from "astro"
import { DIARY_PASSWORD, DIARY_SECRET } from "astro:env/server"

const COOKIE = "diary"
const MAX_AGE = 60 * 60 * 24 * 30

export const isConfigured = () => Boolean(DIARY_PASSWORD && DIARY_SECRET)

const same = (a: string, b: string) => timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest())

// The password is part of the signing key: changing it logs out every session
const sign = (expires: string) => createHmac("sha256", `${DIARY_SECRET}:${DIARY_PASSWORD}`).update(expires).digest("base64url")

export function isLoggedIn(cookies: AstroCookies) {
  if (!isConfigured()) return false
  const [expires, signature] = cookies.get(COOKIE)?.value.split(".") ?? []
  return Boolean(expires && signature && Number(expires) > Date.now() && same(signature, sign(expires)))
}

export async function logIn(cookies: AstroCookies, password: string) {
  if (!isConfigured() || !same(password, DIARY_PASSWORD!)) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return false
  }
  const expires = String(Date.now() + MAX_AGE * 1000)
  cookies.set(COOKIE, `${expires}.${sign(expires)}`, {
    path: "/diary",
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    maxAge: MAX_AGE,
  })
  return true
}

export const logOut = (cookies: AstroCookies) => cookies.delete(COOKIE, { path: "/diary" })
