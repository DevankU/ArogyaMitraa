"use client"

import { useState, useEffect } from "react"
import { GradientText } from "./GradientText"

export function NurseAvatar() {
  const [currentFunction, setCurrentFunction] = useState(0)
  const nurseFunctions = [
    {
      title: "Health Assessment",
      description: "Evaluates your symptoms and provides initial diagnosis",
      icon: (
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
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <path d="M9 14h.01"></path>
          <path d="M15 14h.01"></path>
          <path d="M12 16v.01"></path>
        </svg>
      ),
    },
    {
      title: "Medication Guidance",
      description: "Provides information about medications and proper usage",
      icon: (
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
        >
          <path d="m19 14-7-7-1.27 1.28"></path>
          <path d="M19 14v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5"></path>
          <path d="m18 12 1-1 1-3-3 1-1 1"></path>
          <path d="m2 12 5 5c1-1 2-3 2-5s-1-4-2-5l-5 5z"></path>
        </svg>
      ),
    },
    {
      title: "Emergency Response",
      description: "Guides you through emergency situations until help arrives",
      icon: (
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
        >
          <path d="M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3"></path>
          <path d="M19 19h-3"></path>
          <path d="M19 5h-3"></path>
          <path d="M13 5V3"></path>
          <path d="M13 21v-2"></path>
          <path d="M13 13v-2"></path>
          <path d="M13 17v-2"></path>
          <path d="M13 9V7"></path>
          <path d="M17 12h2"></path>
          <path d="M5 12h6"></path>
        </svg>
      ),
    },
    {
      title: "Health Education",
      description: "Provides preventive care information and health tips",
      icon: (
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
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFunction((prev) => (prev + 1) % nurseFunctions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [nurseFunctions.length])

  return (
    <div className="nurse-avatar-container">
      <div className="nurse-avatar">
        <div className="avatar-image">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="58" fill="url(#nurse-gradient)" stroke="white" strokeWidth="4" />
            <path
              d="M60 30C53.3726 30 48 35.3726 48 42C48 48.6274 53.3726 54 60 54C66.6274 54 72 48.6274 72 42C72 35.3726 66.6274 30 60 30Z"
              fill="white"
            />
            <path d="M78 64H42C42 73.9411 50.0589 82 60 82C69.9411 82 78 73.9411 78 64Z" fill="white" />
            <path d="M60 54V82" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
            <path d="M48 64H72" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <linearGradient id="nurse-gradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="avatar-pulse"></div>
        </div>
        <div className="nurse-functions">
          {nurseFunctions.map((func, index) => (
            <div key={index} className={`function-item ${index === currentFunction ? "active" : ""}`}>
              <div className="function-icon">{func.icon}</div>
              <div className="function-text">
                <h3>
                  <GradientText>{func.title}</GradientText>
                </h3>
                <p>{func.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

