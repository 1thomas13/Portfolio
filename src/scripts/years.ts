// Years of experience since the first job (January 2022), so the copy doesn't go stale: in i18n
// strings, {years} becomes the number ("4") and {Years} the capitalized word ("Four"). Computed at
// build time and recomputed by fillYearsOnPage with the visitor's date.
export const START = { year: 2022, month: 0 }

const WORDS = {
  es: ["cero", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"],
  en: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"],
}

export const monthsOfExperience = (today = new Date()) =>
  today.getFullYear() * 12 + today.getMonth() - (START.year * 12 + START.month)

const yearsOfExperience = (today = new Date()) => Math.floor(monthsOfExperience(today) / 12)

export function fillYears(text: string, locale: string, today = new Date()) {
  const years = yearsOfExperience(today)
  const word = WORDS[locale === "en" ? "en" : "es"][years] ?? String(years)
  return text.replaceAll("{years}", String(years)).replaceAll("{Years}", word.charAt(0).toUpperCase() + word.slice(1))
}

// Job duration as in a CV: "2 yrs 3 mos", "8 mos"
export const durationWords = (locale: string) =>
  locale === "en" ? { y: ["yr", "yrs"], m: ["mo", "mos"] } : { y: ["año", "años"], m: ["mes", "meses"] }

export function formatDuration(months: number, words: ReturnType<typeof durationWords>) {
  const y = Math.floor(months / 12)
  const m = months % 12
  return [y && `${y} ${words.y[y > 1 ? 1 : 0]}`, m && `${m} ${words.m[m > 1 ? 1 : 0]}`].filter(Boolean).join(" ")
}

// Elements with data-years-text="..." keep the original text with the placeholders
export function fillYearsOnPage() {
  const locale = document.documentElement.lang
  document.querySelectorAll<HTMLElement>("[data-years-text]").forEach((el) => {
    el.textContent = fillYears(el.dataset.yearsText ?? "", locale)
  })
}
