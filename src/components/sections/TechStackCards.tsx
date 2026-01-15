import SpotlightCard from "../ui/SpotlightCard"
import { getI18N, getCurrentLocale } from "@/i18n"

export default function TechStackCards() {
  const currentLocale = getCurrentLocale()
  const t = getI18N({ currentLocale })

  return (
    <>
      {t.techStackData.map((tech) => (
        <SpotlightCard key={tech.category} className="md:h-52 w-full md:w-124 p-2 m-auto" spotlightColor="rgba(0, 229, 255, 0.2)">
          <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className="text-center inline-flex items-center rounded-md bg-black px-2 py-1 text-sm font-medium text-white ring-1 ring-inset ring-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </SpotlightCard>
      ))}
    </>
  )
}
