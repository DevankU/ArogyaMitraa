"use client"

import { useState, useEffect } from "react"
import FeaturesAssistants from "./_components/FeaturesAssistants"
import History from "./_components/History"
import Feedback from "./_components/Feedback"
import ProductDescription from "./_components/ProductDescription"
import DeveloperInfo from "./_components/DeveloperInfo"
import { BlurFade } from "@/components/magicui/blur-fade"
import IndiaGradient from "@/components/ui/IndiaGradient"
import Link from "next/link"
import AppHeader from "../_components/AppHeader"
import { ArrowRight, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import GradientText from "@/components/ui/GradientText"
import { motion } from "framer-motion"

// Health quotes list
const healthQuotes = [
  "The greatest wealth is health. — Virgil",
  "Health is a state of complete harmony of the body, mind, and spirit. — B.K.S. Iyengar",
  "Take care of your body. It's the only place you have to live. — Jim Rohn",
  "Health is not valued until sickness comes. — Thomas Fuller",
  "The first wealth is health. — Ralph Waldo Emerson",
  "A healthy outside starts from the inside. — Robert Urich",
  "Health is a relationship between you and your body. — Terri Guillemets",
  "Your body hears everything your mind says. — Naomi Judd",
  "Good health is not something we can buy. However, it can be an extremely valuable savings account. — Anne Wilson Schaef",
  "Health is like money, we never have a true idea of its value until we lose it. — Josh Billings",
  "The human body is the best picture of the human soul. — Ludwig Wittgenstein",
  "Happiness is nothing more than good health and a bad memory. — Albert Schweitzer",
  "To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear. — Buddha",
  "A good laugh and a long sleep are the best cures in the doctor's book. — Irish Proverb",
  "Let food be thy medicine and medicine be thy food. — Hippocrates",
  "The doctor of the future will no longer treat the human frame with drugs, but rather will cure and prevent disease with nutrition. — Thomas Edison",
  "Walking is man's best medicine. — Hippocrates",
  "Sleep is that golden chain that ties health and our bodies together. — Thomas Dekker",
  "Early to bed and early to rise makes a man healthy, wealthy, and wise. — Benjamin Franklin",
  "The groundwork for all happiness is good health. — Leigh Hunt",
  "Health and cheerfulness naturally beget each other. — Joseph Addison",
  "He who has health has hope, and he who has hope has everything. — Arabian Proverb",
  "It is health that is real wealth and not pieces of gold and silver. — Mahatma Gandhi",
  "The greatest of follies is to sacrifice health for any other kind of happiness. — Arthur Schopenhauer",
  "Healthy citizens are the greatest asset any country can have. — Winston Churchill",
  "Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity. — John F. Kennedy",
  "The body is a sacred garment. — Martha Graham",
  "Health is a large word. It embraces not the body only, but the mind and spirit as well. — James H. West",
  "The mind and body are not separate. what affects one, affects the other. — Anonymous",
  "Nurturing yourself is not selfish – it's essential to your survival and your well-being. — Renee Peterson Trudeau",
  "Almost everything will work again if you unplug it for a few minutes, including you. — Anne Lamott",
  "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit. Then get back to work. — Ralph Marston",
  "Your health is what you make of it. Everything you do and think either adds to the vitality, energy, and spirit you possess or takes away from it. — Ann Wigmore",
  "The part can never be well unless the whole is well. — Plato",
  "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship. — Buddha",
  "The secret of health for both mind and body is not to mourn for the past, worry about the future, or anticipate troubles, but to live in the present moment wisely and earnestly. — Buddha",
  "Keeping your body healthy is an expression of gratitude to the whole cosmos – the trees, the clouds, everything. — Thich Nhat Hanh",
  "If you don't take care of your body, where will you live? — Unknown",
  "Those who think they have no time for bodily exercise will sooner or later have to find time for illness. — Edward Stanley",
  "The best six doctors anywhere, and no one can deny it, are sunshine, water, rest, air, exercise, and diet. — Wayne Fields",
  "Health is a state of body. Wellness is a state of being. — J. Stanford",
  "The greatest miracle on Earth is the human body. It is stronger and wiser than you may realize, and improving its ability to heal is within your control. — Dr. Fabrizio Mancini",
  "Your body is a temple, but only if you treat it as one. — Astrid Alauda",
  "The food you eat can be either the safest and most powerful form of medicine or the slowest form of poison. — Ann Wigmore",
  "Health is not simply the absence of sickness. — Hannah Green",
  "Wellness is the complete integration of body, mind, and spirit – the realization that everything we do, think, feel, and believe has an effect on our state of well-being. — Greg Anderson",
  "The higher your energy level, the more efficient your body. The more efficient your body, the better you feel and the more you will use your talent to produce outstanding results. — Tony Robbins",
  "A healthy attitude is contagious but don't wait to catch it from others. Be a carrier. — Tom Stoppard",
  "Wellness encompasses a healthy body, a sound mind, and a tranquil spirit. Enjoy the journey as you strive for wellness. — Laurette Gagnon Beaulieu",
  "The mind has great influence over the body, and maladies often have their origin there. — Moliere",
]

const footer = {
  description:
    "AI-powered healthcare assistant available 24/7 to address your medical concerns and provide guidance with personalized care.",
  rights: "All rights reserved.",
  quickLinks: "Quick Links",
  contact: "Contact",
  designedWith: "Designed with ❤️ by DataWizards",
}

const nav = {
  home: "Home",
  features: "Features",
  demo: "Demo",
  contact: "Contact",
}

const Footer = () => {
  return (
    <footer id="contact" className="py-10 bg-gradient-to-r from-blue-50 to-green-50 w-full rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logoipsum-custom-logo.svg" alt="logo" width={40} height={35} />
              <IndiaGradient className="text-2xl font-semibold">ArogyaMitra</IndiaGradient>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">{footer.description}</p>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} ArogyaMitra. {footer.rights}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {nav.features}
                </Link>
              </li>
              <li>
                <Link
                  href="#video-section"
                  className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {nav.demo}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                <Mail className="h-5 w-5" />
                github@7781
              </li>
              <li className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                <Phone className="h-5 w-5" />
                +91 96534 13126
              </li>
              <li className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                <MapPin className="h-5 w-5" />
                Pune, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">{footer.designedWith}</p>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-50"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-pink-500 transition-colors p-2 rounded-full hover:bg-pink-50"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-blue-50"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function DashBoard() {
  const [quote, setQuote] = useState("")

  // Get a random quote when the component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * healthQuotes.length)
    setQuote(healthQuotes[randomIndex])
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-50 to-green-50">
      <AppHeader />

      {/* Main Content Container */}
      <div className="pt-24 w-full max-w-[1800px] mx-auto space-y-8 px-4 sm:px-6 lg:px-8 pb-12">
        {/* Health Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#2AC9AF]/20 to-[#4B79D9]/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/80 rounded-full p-3 shadow-md">
              <Quote className="h-6 w-6 text-[#2AC9AF]" />
            </div>
            <p className="text-gray-700 italic font-medium">{quote}</p>
          </div>
        </motion.div>

  

        {/* Features Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-100">
          <FeaturesAssistants />

          <BlurFade delay={0.5} inView>
            <div className="bg-gradient-to-r from-[#2AC9AF]/5 to-[#4B79D9]/5 rounded-xl p-4 mt-8 border border-blue-100/50">
              <h2 className="text-xl sm:text-2xl text-gray-700 text-center px-2 font-medium">
                Video Calling and Vital Analysis will be coming soon!
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <History />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <Feedback />
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Daily Health Tips */}
        <BlurFade delay={0.5} inView>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="text-center mb-8">
              <GradientText as="h2" className="text-2xl font-bold mb-2">
                Your Daily Wellness Journey
              </GradientText>
              <p className="text-gray-600">Track your progress and stay motivated with personalized health insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-[#2AC9AF]/10 to-[#4B79D9]/10 p-6 rounded-xl border border-blue-100/50 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#2AC9AF]"
                  >
                    <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
                    <path d="M2 20h20"></path>
                    <path d="M14 12v.01"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Track Your Progress</h3>
                <p className="text-gray-600">Monitor your health metrics and see your improvement over time</p>
              </div>

              <div className="bg-gradient-to-r from-[#2AC9AF]/10 to-[#4B79D9]/10 p-6 rounded-xl border border-blue-100/50 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#4B79D9]"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Personalized Care</h3>
                <p className="text-gray-600">Get recommendations tailored to your unique health profile</p>
              </div>

              <div className="bg-gradient-to-r from-[#2AC9AF]/10 to-[#4B79D9]/10 p-6 rounded-xl border border-blue-100/50 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#2AC9AF]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v4l2 2"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Timely Reminders</h3>
                <p className="text-gray-600">Never miss your medications or appointments with smart alerts</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Product Description Section */}
        <BlurFade delay={0.5} inView>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-100">
            <ProductDescription />
          </div>
        </BlurFade>

        <div className="bg-gradient-to-r from-[#2AC9AF]/10 to-[#4B79D9]/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-full">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.5,
                  }}
                >
                  <GradientText as="h1" className="text-3xl md:text-2xl font-bold mb-2 text-center">
                    Enjoying? might want to go PRO
                  </GradientText>
                </motion.div>
              </motion.div>
            </div>
            <Button className="bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] hover:opacity-90 transition-all rounded-full px-6 py-6 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              <Link href="/Docs">Go Pro</Link>
            </Button>
          </div>
        </div>

        {/* Developer Info Section */}
        <div className="w-full">
          <BlurFade delay={0.5} inView>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-100">
              <DeveloperInfo />
            </div>
          </BlurFade>
        </div>

        {/* Footer Section */}
        <BlurFade delay={0.5} inView>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100">
            <Footer />
          </div>
        </BlurFade>
      </div>
    </div>
  )
}

export default DashBoard
