import Lenis from "lenis"

declare global {
  interface Window {
    lenis?: Lenis
  }
}

const $$ = <T extends Element = HTMLElement>(selector: string) => [...document.querySelectorAll<T>(selector)]

function initSmoothScroll() {
  const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  window.lenis = lenis
  return lenis
}

function initAnchors(lenis: Lenis | null) {
  $$("[data-scroll-to]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = el.dataset.scrollTo
      if (!target) return
      e.preventDefault()
      document.dispatchEvent(new CustomEvent("nav:close"))
      const offset = -(document.querySelector("header")?.offsetHeight ?? 0)
      if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 })
      else document.querySelector(target)?.scrollIntoView()
    })
  })
}

/* The section crossing the middle of the viewport sets the theme */
function initThemes() {
  const sections = $$("[data-theme-section]")
  const root = document.documentElement
  const update = () => {
    const middle = window.innerHeight / 2
    const current = sections.find((section) => {
      const rect = section.getBoundingClientRect()
      return rect.top <= middle && rect.bottom > middle
    })
    const theme = current?.dataset.themeSection
    if (theme && root.dataset.theme !== theme) root.dataset.theme = theme
  }
  window.addEventListener("scroll", update, { passive: true })
  update()
}

function initReveals() {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-in")
        observer.unobserve(entry.target)
      }),
    { threshold: 0.15 },
  )
  $$("[data-reveal]").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`
    observer.observe(el)
  })
}

function initAutoplay() {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach(({ target, isIntersecting }) => {
        const video = target as HTMLVideoElement
        if (isIntersecting) video.play().catch(() => {})
        else video.pause()
      }),
    { threshold: 0.3 },
  )
  $$<HTMLVideoElement>("[data-autoplay]").forEach((video) => observer.observe(video))
}

/* A project card shrinks and darkens as the next one covers it */
function initStack() {
  const cards = $$("[data-stack-card]")
  if (cards.length < 2) return
  const desktop = window.matchMedia("(min-width: 768px)")
  const update = () => {
    cards.forEach((card, i) => {
      const next = cards[i + 1]
      if (!next || !desktop.matches) {
        card.style.transform = ""
        card.style.filter = ""
        return
      }
      const gap = next.getBoundingClientRect().top - card.getBoundingClientRect().top
      const covered = Math.min(1, Math.max(0, 1 - gap / card.offsetHeight))
      card.style.transform = `scale(${1 - covered * 0.06})`
      card.style.filter = `brightness(${1 - covered * 0.25})`
    })
  }
  window.addEventListener("scroll", update, { passive: true })
  window.addEventListener("resize", update)
  update()
}

export function initMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const lenis = reduced ? null : initSmoothScroll()

  initAnchors(lenis)
  initThemes()
  initAutoplay()

  if (!reduced) {
    document.documentElement.classList.add("motion")
    initReveals()
    initStack()
  }
}
