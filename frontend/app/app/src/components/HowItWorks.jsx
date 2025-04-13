import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import GradientText from './GradientText';

export function HowItWorks() {
  const steps = [
    {
      number: 1,
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
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: "Connect",
      description: 'Click on "Talk to Agent" and enter your name to start a conversation with ArogyaMitra',
    },
    {
      number: 2,
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: "Describe",
      description: "Explain your symptoms or health concerns in detail through voice or text",
    },
    {
      number: 3,
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
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      title: "Receive Guidance",
      description: "Get personalized medical advice and recommendations based on your situation",
    },
    {
      number: 4,
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Human Escalation",
      description: "For complex cases, ArogyaMitra can connect you with a human healthcare professional",
    },
  ];

  const stepsVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const stepCardVariants = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  function ChatMessage({ text, isBot, delay = 0 }) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      const startTyping = setTimeout(() => {
        let i = 0;
        const timer = setInterval(() => {
          if (i < text.length) {
            setDisplayText(text.substring(0, i + 1));
            i++;
          } else {
            clearInterval(timer);
          }
        }, 50);
        return () => clearInterval(timer);
      }, delay * 1000);
      return () => clearTimeout(startTyping);
    }, [text, delay]);

    return (
      <div className={`message ${isBot ? "bot-message" : "user-message"}`}>
        <p>{displayText}</p>
      </div>
    );
  }

  const messages = [
    { text: "Hello! How can I help you with your health today?", isBot: true, delay: 0 },
    { text: "I've been having a headache for the past 3 days.", isBot: false, delay: 2 },
    {
      text: "I'm sorry to hear that. Could you tell me more about your headache? Where is the pain located and how would you describe it?",
      isBot: true,
      delay: 4,
    },
    { text: "It's mostly on the right side of my head and feels like a throbbing pain.", isBot: false, delay: 6 },
    {
      text: "Thank you for sharing that. Have you noticed any triggers for your headache, such as stress, lack of sleep, or certain foods?",
      isBot: true,
      delay: 8,
    },
  ];

  return (
    <section className="how-it-works">
      <div className="section-container">
        <h2 className="section-title">
          <GradientText>
            Interaction
          </GradientText>
        </h2>
        <motion.div className="steps-container" initial="hidden" animate="show" variants={stepsVariants}>
          {steps.map((step, index) => (
            <motion.div key={index} className="step-card" variants={stepCardVariants}>
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="interaction-showcase">
          <div className="showcase-content">
          <h3>
            <GradientText>
              Real-time Interaction
            </GradientText>
          </h3>
            <p>
              Our AI agent uses natural language processing to understand your concerns and provide relevant medical
              guidance. The conversation feels natural and human-like, making it comfortable to discuss your health
              issues.
            </p>
            <ul className="feature-list">
              <li>
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Voice and text-based communication
              </li>
              <li>
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Contextual understanding of medical terms
              </li>
              <li>
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Personalized follow-up questions
              </li>
              <li>
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Seamless transition to human specialists when needed
              </li>
            </ul>
          </div>
          <div className="showcase-image">
            <div className="chat-interface">
              <div className="chat-header">
                <div className="chat-avatar">
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <stop stopColor="#8B5CF6" />
                        <stop offset="1" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="chat-title">ArogyaMitra</div>
              </div>
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <ChatMessage key={index} text={msg.text} isBot={msg.isBot} delay={msg.delay} />
                ))}
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Type your message..." />
                <button className="send-button">
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
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}