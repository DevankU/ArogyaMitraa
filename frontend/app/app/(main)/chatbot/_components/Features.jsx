// FeaturesSection.jsx
"use client"
import { Heart, Clock, Shield } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"
import GradientText from "@/components/ui/GradientText"

const FeaturesSection = () => {
  const features = [
    {
      icon: <Heart className="w-10 h-10 text-pink-500" />,
      title: "Intelligent Understanding",
      description: "ArogyaMitra processes your queries using advanced NLP to understand symptoms, context, and concerns just like a real assistant.",
    },
    {
      icon: <Clock className="w-10 h-10 text-indigo-500" />,
      title: "Real-Time Assistance",
      description: "Our chatbot is always available to offer instant responses, no matter the time or urgency—healthcare is now truly 24/7.",
    },
    {
      icon: <Shield className="w-10 h-10 text-emerald-500" />,
      title: "Vision-Driven Analysis",
      description: "With built-in vision capabilities, ArogyaMitra can interpret images (like scans or symptoms) to assist in early detection and guidance.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-gradient-to-r from-blue-50 to-green-50 mt-5 rounded-3xl "style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)" }}>
      <div className="container mx-auto px-4 rounded-3xl box-shadow-lg">
        <BlurFade delay={0.3} inView>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>How Chatbot Thinks & Acts</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ArogyaMitra is your AI-powered companion, designed to think, respond, and guide with a human-like understanding of health concerns.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.2} inView>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6 p-4 rounded-full bg-gray-50 inline-block">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
