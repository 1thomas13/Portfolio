import { useState, useEffect } from "react"
import { getCurrentLocale } from "@/i18n"

interface Props {
  size?: string
}

export default function SwitchLang({ size }: Props) {
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
      className={`${size === "xl" ? "text-xl" : ""} text-secondary font-extrabold rounded-full h-full inline-flex cursor-pointer select-none relative z-10`}
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
        className={`py-2 px-4 border-2 border-secondary border-r-0 rounded-l-full transition-all ${isSpanish
          ? "bg-white/20 text-white"
          : "bg-white/10 text-white/50"
          }`}
      >
        ES
      </span>

      <span
        className={`py-2 px-4 border-2 border-secondary border-l-0 rounded-r-full transition-all ${!isSpanish
          ? "bg-white/20 text-white"
          : "bg-white/10 text-white/50"
          }`}
      >
        EN
      </span>
    </div>
  )
}
