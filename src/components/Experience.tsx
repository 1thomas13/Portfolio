import { useEffect, useRef, useState } from "react"
import SpotlightCard from "./SpotlightCard"

const experiences = [
  {
    company: "TechInnovate Solutions",
    position: "Senior Full-Stack Developer",
    period: "Jan 2022 - Present",
    description: "Leading development of enterprise SaaS platforms for financial services clients.",
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    responsibilities: [
      "Architected and implemented scalable microservices architecture",
      "Led a team of 5 developers using Agile methodologies",
      "Optimized application performance, reducing load times by 40%",
      "Implemented CI/CD pipelines with GitHub Actions and AWS",
      "Collaborated with UX designers to create intuitive user interfaces",
    ],
  },
  {
    company: "DataFlow Systems",
    position: "Full-Stack Developer",
    period: "Mar 2020 - Dec 2021",
    description: "Developed data visualization and analytics platforms for business intelligence.",
    technologies: ["React", "Express.js", "MongoDB", "D3.js", "GraphQL", "Docker"],
    responsibilities: [
      "Built responsive dashboards with real-time data visualization",
      "Developed RESTful and GraphQL APIs for data retrieval and manipulation",
      "Implemented authentication and authorization systems",
      "Optimized database queries for large datasets",
      "Participated in code reviews and mentored junior developers",
    ],
  },
  {
    company: "WebSphere Innovations",
    position: "Frontend Developer",
    period: "Jun 2018 - Feb 2020",
    description: "Created interactive web applications for e-commerce and media clients.",
    technologies: ["React", "Redux", "JavaScript", "SASS", "Webpack", "Jest"],
    responsibilities: [
      "Developed responsive and accessible user interfaces",
      "Implemented state management with Redux and Context API",
      "Created reusable component libraries",
      "Wrote unit and integration tests with Jest and React Testing Library",
      "Collaborated with backend developers to integrate APIs",
    ],
  },
]

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [callsToday, setCallsToday] = useState(142)
  const [chatsActive, setChatsActive] = useState(8)
  const [appointmentsBooked, setAppointmentsBooked] = useState(23)
  const [partsQuotes, setPartsQuotes] = useState(17)

  useEffect(() => {
    const currentRef = sectionRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const intervals = [
      setInterval(() => setCallsToday((prev) => prev + 1), 8000),
      setInterval(() => setChatsActive((prev) => Math.min(prev + 1, 12)), 12000),
      setInterval(() => setAppointmentsBooked((prev) => prev + 1), 15000),
      setInterval(() => setPartsQuotes((prev) => prev + 1), 10000),
    ]

    return () => intervals.forEach(clearInterval)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 relative z-10">
      <div className="bg-white/98 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] border border-white/40 relative overflow-hidden mx-4">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-orange-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 relative z-10">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">
              Experience
            </h2>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${index}`}
              >
                <SpotlightCard className="bg-white" spotlightColor="rgba(0, 229, 255, 0.2)">
                  <div className="pb-2 text-black">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div className=" text-xl">{exp.position}</div>
                      <div className=" md:ml-auto w-fit">
                        {exp.period}
                      </div>
                    </div>
                    <div className="text-lg text-black font-medium ">{exp.company}</div>
                  </div>
                  <div className=" text-black">
                    <p className="mb-4">{exp.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <div key={tech} className="text-xs">
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-sm">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
