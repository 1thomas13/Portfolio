"use client"

import { Mail, Linkedin, Github, ExternalLink, Download } from "lucide-react"
import Magnet from "./Magnent"

export default function Projects() {


  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center justify-center">
        <div
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Projects
          </h2>
          <div className="w-20 h-1  from-primary to-accent rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Some of my personal or clients' projects that showcase my skills and experience.
          </p>
        </div>

        <div className="w-3xl h-72 bg-white/10 rounded-2xl mx-auto mb-8" >

        </div>
        <div className="w-3xl h-72 bg-white/10 rounded-2xl mx-auto mb-8" >

        </div>
        <button
          className={` m-auto relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-3 rounded-full flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group transform 
      mt-8`}>
          View More
        </button>
      </div>
    </section>
  )
}
