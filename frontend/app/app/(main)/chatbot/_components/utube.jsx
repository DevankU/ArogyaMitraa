"use client"
import GradientText from "@/components/ui/GradientText"
import { BlurFade } from "@/components/magicui/blur-fade"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const YouTubeSection = () => {
  const video = {
    title: "Watch & Learn",
    heading: "See Chatbot in Action",
    description: "Watch how our Chatbot can transform your healthcare experience",
    demo: "Chatbot Demo",
    seeHow: "See how our Chatbot works",
    tryIt: "Try All Features",
  }

  return (
    <section id="video-section" className="py-20 bg-gradient-to-r from-blue-50 to-green-50 mt-5 rounded-3xl"style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)" }}>
      <div
        className="container mx-auto px-4 rounded-3xl"
      >
        <BlurFade delay={0.3} inView>
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
              {video.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>{video.heading}</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{video.description}</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-300">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/hhQl0uk_IxQ"
                title={video.demo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">{video.demo}</h3>
                <p>{video.seeHow}</p>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

export default YouTubeSection
