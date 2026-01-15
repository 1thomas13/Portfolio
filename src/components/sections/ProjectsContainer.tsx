"use client"

import { Github, ExternalLink } from "lucide-react"
import { getI18N, getCurrentLocale } from "@/i18n"
import SpotlightCard from "@/components/ui/SpotlightCard"

interface Project {
  id: string
  title: string
  image: string
  description: string
  technologies: string[]
  github?: string
  demo: string
}

interface ProjectsContainerProps {
  projects: Project[]
}

export default function ProjectsContainer({ projects }: ProjectsContainerProps) {
  const currentLocale = getCurrentLocale()
  const t = getI18N({ currentLocale })

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {projects.map((project) => (
        <SpotlightCard
          key={project.id}
          className="p-0! overflow-hiddenrelative"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <div className="relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover transition-transform "
            />
            <a
              href={project.demo || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-100 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-110 z-10"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <ExternalLink size={16} />
              {t.projects.view}
            </a>
          </div>

          <div className="p-6 text-white space-y-3">
            <h3 className="text-left text-xl font-bold text-white">
              {project.title}
            </h3>

            <p className="text-sm text-left text-white/70 leading-relaxed line-clamp-2">
              {project.description}
            </p>

            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={`${project.id}-tech-${index}`}
                    className="inline-flex items-center rounded-md bg-black px-2.5 py-1 text-xs font-medium text-white ring-1 ring-inset ring-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {project.github && project.github !== "#" && (
              <div className="pt-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-[10px] font-medium text-white transition-all duration-200"
                >
                  <Github size={12} />
                  {t.projects.github}
                </a>
              </div>
            )}
          </div>
        </SpotlightCard>
      ))}
    </div>
  )
}
