import { useState, useEffect } from "react"
import { getCurrentLocale } from "@/i18n"

interface Props {
  size?: string
  isOverWhiteSection?: boolean
}

export default function SwitchLang({ size, isOverWhiteSection = false }: Props) {
  const [currentLocale, setCurrentLocale] = useState<string>("es")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const locale = getCurrentLocale()
      setCurrentLocale(locale)
    }
  }, [])

  const handleClick = () => {
    if (typeof window === "undefined") return

    const currentPath = window.location.pathname
    const isCurrentlyEnglish = currentPath.startsWith("/en/") || currentPath === "/en"
    let newPath = ""

    if (isCurrentlyEnglish) {
      // Cambiar a español: quitar /en/
      newPath = currentPath.replace("/en/", "/").replace("/en", "/") || "/"
    } else {
      // Cambiar a inglés: agregar /en/
      newPath = currentPath === "/" ? "/en/" : `/en${currentPath}`
    }

    window.location.href = newPath
  }

  const isSpanish = currentLocale === "es"

  return (
    <div
      onClick={handleClick}
      className={`${size === "xl" ? "text-xl" : ""} text-secondary font-extrabold rounded-full h-full inline-flex cursor-pointer select-none relative z-10 backdrop-blur-md border transition-all duration-300 ${isOverWhiteSection
          ? "border-black/20"
          : "border-white/20"
        }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
      style={{ pointerEvents: 'auto' }}
    >
      <span
        className={`py-2 px-4 border border-r-0 rounded-l-full transition-all ${isOverWhiteSection
            ? isSpanish
              ? "bg-black/60 text-white border-black/20 font-semibold"
              : "bg-black/40 text-white/50 border-black/20 font-normal"
            : isSpanish
              ? "bg-white/20 text-white border-white/20 font-semibold"
              : "bg-white/10 text-white/50 border-white/20 font-normal"
          }`}
      >
        ES
      </span>

      <span
        className={`py-2 px-4 border border-l-0 rounded-r-full transition-all ${isOverWhiteSection
            ? !isSpanish
              ? "bg-black/60 text-white border-black/20 font-semibold"
              : "bg-black/40 text-white/50 border-black/20 font-normal"
            : !isSpanish
              ? "bg-white/20 text-white border-white/20 font-semibold"
              : "bg-white/10 text-white/50 border-white/20 font-normal"
          }`}
      >
        EN
      </span>
    </div>
  )
}
