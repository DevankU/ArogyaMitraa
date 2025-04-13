"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import Aurora from "./components/Aurora"
import LiveKitModal from "./components/LiveKitModal"
import { Contact } from "./components/Contact"
import { Features } from "./components/Features"
import { HowItWorks } from "./components/HowItWorks"
import { ProductDescription } from "./components/ProductDescription"
import { Documentation } from "./components/Documentation"
import GradientText from './components/GradientText'
import RollingGallery from './components/RollingGallery'

function HomePage() {
  const [showSupport, setShowSupport] = useState(false)

  const handleSupportClick = () => {
    setShowSupport(true)
  }

  return (
    <>
      <main>
        <div className="aurora-container">
          <Aurora colorStops={["#3B82F6", "#10B981", "#3B82F6"]} />
        </div>
        <section className="hero">
          {/* <div className="aurora-container">
            <Aurora colorStops={["#3B82F6", "#10B981", "#3B82F6"]} />
          </div> */}
          <div className="hero-content">
            <h1>
              <GradientText>Your Health, Our Priority</GradientText>
            </h1>
            <p>
              <GradientText>Call Us: +1(920)-375-7113</GradientText>
            </p>
            <p>AI-powered healthcare assistant available 24/7 to address your medical concerns and provide guidance</p>
            <button className="talk-button" onClick={handleSupportClick}>
              <div className="pulse-ring"></div>
              <span>Talk to Nurse</span>
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>
          </div>
        </section>
        <ProductDescription />
        <div className="gallery-wrapper">
          <RollingGallery autoplay={true} pauseOnHover={true} />
        </div>
        <HowItWorks />
        <Features />
        <Contact />
      </main>

      {showSupport && <LiveKitModal setShowSupport={setShowSupport} />}
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <div className="content-wrapper">
          <header className="header">
            <div className="logo-container">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z"
                    fill="url(#paint0_linear)"
                  />
                  <path
                    d="M23 11.5C23 14.538 20.538 17 17.5 17H16V14.5H17.5C19.157 14.5 20.5 13.157 20.5 11.5C20.5 9.843 19.157 8.5 17.5 8.5C15.843 8.5 14.5 9.843 14.5 11.5V12.5V17C14.5 19.485 12.485 21.5 10 21.5C7.515 21.5 5.5 19.485 5.5 17C5.5 14.515 7.515 12.5 10 12.5H11.5V15H10C8.895 15 8 15.895 8 17C8 18.105 8.895 19 10 19C11.105 19 12 18.105 12 17V12.5V11.5C12 8.462 14.462 6 17.5 6C20.538 6 23 8.462 23 11.5Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient id="paint0_linear" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#10B981" />
                      <stop offset="1" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="logo">ArogyaMitra</div>
            </div>
            <nav className="main-nav">
              <Link to="/docs" className="nav-link">Docs</Link>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App