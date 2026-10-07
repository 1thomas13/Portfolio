import source from "@/scripts/archive/detour.js?raw"
import { serveArchiveScript } from "@/scripts/archive/serve"

export const GET = () => serveArchiveScript(source)
