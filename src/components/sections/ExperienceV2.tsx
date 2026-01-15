"use client"

import { Download } from "lucide-react"
import React from "react"
import { cn } from "@/lib/utils"
import { getI18N, getCurrentLocale } from "@/i18n"

interface ExperienceV2Props {
  className?: string
}

const ExperienceV2 = ({ className }: ExperienceV2Props) => {
  const currentLocale = getCurrentLocale()
  const t = getI18N({ currentLocale })
  const experiences = t.experienceData

  return (
    <section
      id="experience"
      className={cn(
        "py-16 sm:py-24 relative z-10 bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] border border-white/40 overflow-hidden",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-10 lg:space-y-20">
        <div className="flex w-full items-end justify-between">
          <h1 className="text-5xl font-semibold tracking-tighter lg:text-6xl text-black" >
            {t.experience.title}
          </h1>
          <a
            href="/Thomas Barreto CV - Español.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-all duration-200"
          >
            {t.hero.viewCV} <Download className="size-4" />
          </a>
        </div>

        <ul>
          {experiences.map((exp, index) => (
            <li
              key={index}
              className="flex flex-col justify-between border-b border-slate-200 py-10 md:flex-row"
            >
              <div className="max-w-lg text-xl font-semibold tracking-tighter lg:w-1/3 text-black">
                {exp.period}
              </div>
              <div className="lg:w-1/3">
                <h2 className="mb-4 text-2xl font-semibold tracking-tighter text-black">
                  {exp.position}
                </h2>
                <p className="text-black opacity-50">{exp.description}</p>
              </div>
              <div className="text-right lg:w-1/4 text-black">{exp.company}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ExperienceV2
