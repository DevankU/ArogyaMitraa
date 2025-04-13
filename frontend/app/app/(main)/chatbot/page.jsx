"use client"
import AppHeader from "@/app/components/AppHeader"
import Chatbot from "./_components/Chatbot"
import FeaturesSection from "./_components/Features"
import GoPro from "./_components/GoPro"
import YouTubeSection from "./_components/utube"
import IndiaGradient from "@/components/ui/IndiaGradient"
import Link from "next/link"
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
    <footer id="contact" className="mt-4 py-10 bg-gradient-to-r from-blue-50 to-green-50  w-full rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="logoipsum-custom-logo.svg?height=40&width=40" alt="logo" width={40} height={35} />
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
                <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {nav.features}
                </Link>
              </li>
              <li>
                <Link href="#video-section" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {nav.demo}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
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
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                github@7781
              </li>
              <li className="flex items-center gap-2 text-gray-600">
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 96534 13126
              </li>
              <li className="flex items-center gap-2 text-gray-600">
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
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Pune, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">{footer.designedWith}</p>

          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function ChatbotPage() {
  return (
    <div className="h-screen w-full max-w-[1800px] flex flex-col mx-auto">
      <main className="flex-1 flex flex-col">
        <Chatbot className="flex-1" />
        <GoPro />
        <YouTubeSection />
        <FeaturesSection />
        <Footer/>
      </main>
    </div>
  )
}

export default ChatbotPage