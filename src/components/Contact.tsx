"use client"

import { Mail, Linkedin, Github, ExternalLink, Download } from "lucide-react"
import Magnet from "./Magnent"
import SpotlightCard from "./SpotlightCard"

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "thomi.b137@gmail.com",
      href: "mailto:thomi.b137@gmail.com",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Visit Profile",
      href: "https://www.linkedin.com",
      color: "from-blue-500 to-cyan-500",
      external: true,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "View Code",
      href: "https://github.com/1thomas13",
      color: "from-gray-600 to-gray-800",
      external: true,
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Let's{" "}
            Connect
          </h2>
          <div className="w-20 h-1  from-primary to-accent rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm open to conversations about
            full-time employment, contract roles, or collaboration in the React ecosystem. Drop me a line!
          </p>
        </div>



        <div
          className="grid md:grid-cols-3 gap-24"
        >
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <Magnet key={method.value} padding={500} disabled={false} magnetStrength={32}>
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold mb-3 text-white">{method.label}</h3>
                  <a
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className=" text-white hover:underline text-sm flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary focus:rounded"
                    aria-label={method.external ? `Visit ${method.label} profile (opens in new window)` : undefined}
                  >
                    {method.value}
                    {method.external && <ExternalLink className="w-3 h-3" aria-hidden="true" />}
                  </a>
                </SpotlightCard>
              </Magnet>
            )
          })}
        </div>
      </div>
    </section>
  )
}
