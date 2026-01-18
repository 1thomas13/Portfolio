import { useState, useEffect, useRef } from "react"
import { Menu, X, HomeIcon } from "lucide-react"
import { getI18N, getCurrentLocale } from "@/i18n"
import SwitchLang from "../ui/SwitchLang"

export function GlassmorphismNav() {
  const currentLocale = getCurrentLocale()
  const t = getI18N({ currentLocale })
  const [isOpen, setIsOpen] = useState(false)
  const [isOverWhiteSection, setIsOverWhiteSection] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const switchLangRef = useRef<HTMLDivElement>(null)

  const navigation = [
    { name: t.nav.home, href: "#features", icon: <HomeIcon strokeWidth={3} size={20} /> },
    { name: t.nav.about, href: "#ai-team" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.projects, href: "#projects" },
  ]

  useEffect(() => {
    const checkScrollPosition = () => {
      const experienceSection = document.getElementById("experience")
      if (experienceSection) {
        const rect = experienceSection.getBoundingClientRect()
        const navHeight = 90
        const isOverSection = rect.top <= navHeight && rect.bottom >= navHeight - 22
        setIsOverWhiteSection(isOverSection)
      }
    }

    const updateSwitchLangPosition = () => {
      if (navRef.current && switchLangRef.current) {
        const navRect = navRef.current.getBoundingClientRect()
        const navRight = navRect.right
        const gap = 16
        switchLangRef.current.style.left = `${navRight + gap}px`
        switchLangRef.current.style.top = `40px`
        switchLangRef.current.style.opacity = '1'
      }
    }

    if (typeof window !== "undefined") {
      if (switchLangRef.current) {
        switchLangRef.current.style.opacity = '0'
        switchLangRef.current.style.transition = 'opacity 0.3s ease-in-out'
      }

      updateSwitchLangPosition()
      requestAnimationFrame(updateSwitchLangPosition)

      window.addEventListener("scroll", checkScrollPosition, { passive: true })
      window.addEventListener("scroll", updateSwitchLangPosition, { passive: true })
      window.addEventListener("resize", updateSwitchLangPosition, { passive: true })
      checkScrollPosition()

      return () => {
        window.removeEventListener("scroll", checkScrollPosition)
        window.removeEventListener("scroll", updateSwitchLangPosition)
        window.removeEventListener("resize", updateSwitchLangPosition)
      }
    }
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      return
    }

    const element = document.querySelector(href)
    if (element) {
      const rect = element.getBoundingClientRect()
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      const elementAbsoluteTop = rect.top + currentScrollY
      const navbarHeight = 100
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight)

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  return (
    <>
      <div className={`md:hidden fixed top-6 right-6 flex items-center gap-4 ${isOpen ? 'z-[60]' : 'z-50'}`}>
        <SwitchLang />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
        >
          <div className="relative w-8 h-8">
            <Menu
              size={32}
              className={`absolute inset-0 transition-all duration-300 text-white ${isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                }`}
            />
            <X
              size={32}
              className={`absolute inset-0 transition-all duration-300 text-white ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                }`}
            />
          </div>
        </button>
      </div>

      <nav ref={navRef} className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50">
        <div className="md:max-w-4xl mx-auto">
          <div className={`hidden md:block backdrop-blur-md border rounded-full px-4 py-3 md:px-6 md:py-2 transition-all duration-300 text-white ${isOverWhiteSection
            ? "md:bg-black/60 md:border-black/20"
            : "bg-white/10 border-white/20"
            }`}>
            <div className="flex items-center justify-between">
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) =>
                (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-nowrap hover:scale-105 transition-all duration-200 font-medium cursor-pointer opacity-80 hover:opacity-100"
                  >
                    {item.icon ?? item.name}
                  </button>
                ))}
              </div>

              <div className="hidden md:block ml-5">
                <button
                  className={`relative font-medium px-6 py-2 rounded-full flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group ${isOverWhiteSection
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-white hover:bg-gray-50 text-black"
                    }`}
                  onClick={() => scrollToSection("#contact")}
                >
                  <span className="mr-2">{t.nav.contact}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div ref={switchLangRef} className="hidden md:block fixed top-[40px] z-50 items-center transition-opacity duration-300" style={{ opacity: 0 }}>
        <SwitchLang isOverWhiteSection={isOverWhiteSection} />
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="md:hidden fixed inset-0 z-50 flex flex-col">
            <div className="backdrop-blur-md bg-black/50 text-white flex-1 flex flex-col">
              <div className="flex-1 flex flex-col justify-center px-6 space-y-4">
                {navigation.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-white/90 hover:text-white hover:bg-white/20 rounded-lg px-6 py-4 text-left transition-all duration-300 font-medium cursor-pointer transform hover:scale-[1.02] hover:translate-x-1 text-lg"
                    style={{
                      animationDelay: `${index * 80 + 100}ms`,
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
