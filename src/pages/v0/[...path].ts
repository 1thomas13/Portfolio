import type { APIRoute } from "astro"

export const prerender = false

// The first edition moved from /v0/ to /v1/
export const GET: APIRoute = ({ url, redirect }) => redirect(url.pathname.replace(/^\/v0/, "/v1") + url.search, 301)
