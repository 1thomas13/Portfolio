import SpotlightCard from "./SpotlightCard"
import { getI18N, getCurrentLocale } from "@/i18n"

export default function Footer() {
  const currentLocale = getCurrentLocale()
  const t = getI18N({ currentLocale })

  return (
    <footer>
      <SpotlightCard
        className="mt-24 group w-full flex flex-col md:flex-row items-center justify-center bg-white/10 backdrop-blur-md rounded-none px-4 py-3 md:px-6 md:py-2 gap-3 md:gap-0"
        spotlightColor="rgba(0, 229, 255, 0.2)">
        <div className="flex items-center gap-1.5">
          Made with
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white fill-transparent transition-all duration-300 group-hover:text-red-500 group-hover:fill-red-500">
            <path
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
            />
          </svg>
          by Thomas Barreto
        </div>

        <a
          href="https://github.com/1thomas13/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/80 hover:text-white transition md:absolute md:right-4 md:right-6">
          {t.footer.viewSourceCode}
        </a>
      </SpotlightCard>
    </footer>
  )
}
