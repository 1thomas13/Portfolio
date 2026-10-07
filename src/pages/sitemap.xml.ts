import type { APIRoute } from "astro"
import { LOCALIZED_PATHS } from "@/i18n"

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href
  const entries = Object.entries(LOCALIZED_PATHS).flatMap(([es, en]) => {
    const alternates = [
      `<xhtml:link rel="alternate" hreflang="es" href="${url(es)}"/>`,
      `<xhtml:link rel="alternate" hreflang="en" href="${url(en)}"/>`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${url(es)}"/>`,
    ].join("")
    return [es, en].map((path) => `<url><loc>${url(path)}</loc>${alternates}</url>`)
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`
  return new Response(xml, { headers: { "Content-Type": "application/xml" } })
}
