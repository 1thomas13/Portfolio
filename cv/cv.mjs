import { chromium } from "playwright-core"
import path from "node:path"
const b = await chromium.launch({ channel: "msedge" })
for (const lang of ["en", "es"]) {
  const p = await b.newPage()
  await p.goto("file:///" + path.resolve(`cv-${lang}.html`).split("\\").join("/"))
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300)
  await p.pdf({ path: `cv-${lang}.pdf`, format: "A4", preferCSSPageSize: true, printBackground: true })
  // Preview image of each page for review
  await p.setViewportSize({ width: 794, height: 1123 })
  await p.emulateMedia({ media: "print" })
  await p.screenshot({ path: `cv-${lang}.png`, fullPage: true })
  await p.close()
}
await b.close()
