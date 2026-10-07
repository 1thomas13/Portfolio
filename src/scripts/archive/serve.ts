import { getArchiveData } from "@/i18n"
import { START } from "@/scripts/years"

// The old editions don't declare a charset, so non-ASCII characters are escaped
const ascii = (json: string) => json.replace(/[\u007f-￿]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"))

export const serveArchiveScript = (source: string) =>
  new Response(source.replace("__DATA__", ascii(JSON.stringify({ ...getArchiveData(), start: START }))), {
    headers: { "Content-Type": "text/javascript; charset=utf-8" },
  })
