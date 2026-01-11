import SpotlightCard from "./SpotlightCard"

const technologies = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Redux"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Nest.js", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Others",
    skills: ["Docker", "AWS", "Git", "Linux"],
  },
]

export default function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {technologies.map((tech) => (
        <SpotlightCard key={tech.category} className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
          <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </SpotlightCard>
      ))}
    </div>
  )
}
