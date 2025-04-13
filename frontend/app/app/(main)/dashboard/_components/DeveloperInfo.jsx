"use client"

import { motion } from "framer-motion"
import GradientText from "@/components/ui/GradientText"
import IndiaGradient from "@/components/ui/IndiaGradient"
import { BlurFade } from "@/components/magicui/blur-fade"

const DeveloperInfo = () => {
  const developers = [
    {
      name: "Arav Saxena",
      role: "Lead Developer",
      bio: "I am a passionate about cricket and also a part time coder.",
      image: "/arav.jpg",
      github: "https://github.com/arav7781",
      linkedin: "https://linkedin.com/in/aravsaxena",
    },
    {
      name: "Shrey Raj",
      role: "UI/UX Designer",
      bio: "Passionate about creating intuitive and accessible healthcare interfaces.",
      image: "/shreyy.jpg?height=150&width=150",
      github: "#",
      linkedin: "#",
    },
    {
      name: "Riddhima Deshmukh",
      role: "Python developer",
      bio: "Avid reader and theatre enthusiast with a keep interest in public speaking. Enjoys playing volleyball, solving sudokus and a good cup of coffee.",
      image: "/rid.jpg?height=150&width=150",
      github: "https://github.com/ridds-io",
      linkedin: "https://www.linkedin.com/in/riddhima-deshmukh-45759730a"
    },
    {
      name: "Devank Upadhaya",
      role: "Software Developer",
      bio: "Expert in handling multimodal in healthcare.",
      image: "/dev.jpg?height=150&width=150",
      github: "#",
      linkedin: "#",
    },
    {
      name: "Nandini Patawri",
      role: "GenAI",
      bio: "Expert in Generative AI.",
      image: "/nand.jpg?height=150&width=150",
      github: "#",
      linkedin: "#",
    },
    {
      name: "kartik Mehta",
      role: "MLops",
      bio: "Expert in handling MLops.",
      image: "/911677.jpg?height=150&width=150",
      github: "#",
      linkedin: "#"
    },
  ]

  return (
    <section className="developer-info">
      <BlurFade delay={0.50} inView>
      <div className="developer-container">
        <GradientText as="h2" className="section-title text-center mb-12">
          Meet Our Team
        </GradientText>

        <div className="developer-grid">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              className="developer-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="developer-image">
                <img src={dev.image} alt={dev.name} />
              </div>
              <div className="developer-details">
                <IndiaGradient as="h3" className="developer-name">
                  {dev.name}
                </IndiaGradient>
                <p className="developer-role">{dev.role}</p>
                <p className="developer-bio">{dev.bio}</p>
                <div className="developer-links">
                  <a href={dev.github} target="_blank" rel="noopener noreferrer" className="dev-link github">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="dev-link linkedin">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </BlurFade>
    </section>
  )
}

export default DeveloperInfo
