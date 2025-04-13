"use client"
import { api } from "@/convex/_generated/api"
import { Coachingexperts } from "@/services/Options"
import { useQuery } from "convex/react"
import { useParams } from "next/navigation"
import { useEffect, useState, useCallback, useRef } from "react"
import Image from "next/image"
import { UserButton } from "@stackframe/stack"
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react"
import "@livekit/components-styles"
import {
  useVoiceAssistant,
  BarVisualizer,
  VoiceAssistantControlBar,
  useTrackTranscription,
  useLocalParticipant,
} from "@livekit/components-react"
import { Track } from "livekit-client"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic,
  AudioWaveform,
  MessageSquare,
  Languages,
  LogOut,
  HelpCircle,
  AlertCircle,
  Heart,
  Sparkles,
  Star,
  Shield,
  Clock,
  Zap,
  ChevronDown,
  Info,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import GradientText from "@/components/ui/GradientText"
import "./disscusion.css"
import AppHeader from "../../_components/AppHeader"

// Message component for chat transcript
const Message = ({ type, text }) => {
  return (
    <motion.div
      className={`message ${type === "agent" ? "message-agent-container" : "message-user-container"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <strong className={`message-${type}`}>{type === "agent" ? "Agent:" : "You:"}</strong>
      <span className="message-text">{text}</span>
    </motion.div>
  )
}

// VoiceAssistantContent component (used inside LiveKitRoom)
const VoiceAssistantContent = ({ setMessages }) => {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant()
  const localParticipant = useLocalParticipant()
  const { segments: userTranscriptions } = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  })

  useEffect(() => {
    const allMessages = [
      ...(agentTranscriptions?.map((t) => ({ ...t, type: "agent" })) ?? []),
      ...(userTranscriptions?.map((t) => ({ ...t, type: "user" })) ?? []),
    ].sort((a, b) => a.firstReceivedTime - b.firstReceivedTime)
    setMessages(allMessages)
  }, [agentTranscriptions, userTranscriptions, setMessages])

  const containerVariants = {
    active: {
      scale: 1.05,
      boxShadow: "0 10px 30px -5px rgba(124, 58, 237, 0.5)",
      transition: {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
    inactive: {
      scale: 1,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
    },
  }

  return (
    <div className="voice-assistant-container">
      <motion.div
        className="visualizer-container"
        variants={containerVariants}
        animate={state === "connecting" || state === "speaking" ? "active" : "inactive"}
      >
        <BarVisualizer
          state={state}
          barCount={24}
          trackRef={audioTrack}
          colors={["#8B5CF6", "#EC4899", "#3B82F6"]}
          className="visualizer"
        />
        <motion.div
          className="absolute bottom-2 right-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Badge variant={state === "speaking" ? "default" : "outline"} className="animate-pulse">
            {state === "idle" && "Ready"}
            {state === "connecting" && "Connecting..."}
            {state === "speaking" && "Speaking"}
            {state === "error" && "Error"}
          </Badge>
        </motion.div>
      </motion.div>
      <motion.div
        className="control-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <VoiceAssistantControlBar />
      </motion.div>
    </div>
  )
}

// Product description component
const ProductDescription = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-6"
    >
      <Card className="product-card overflow-hidden border-0">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-blue-300/30 to-green-300/30 rounded-full blur-3xl"></div>

        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <span>About ArogyaMitra Voice Assistant</span>
          </CardTitle>
          <CardDescription className="text-base">
            Your personal healthcare voice assistant powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base text-muted-foreground mb-6">
            ArogyaMitra is an advanced AI-powered voice assistant designed to provide healthcare guidance, answer
            medical questions, and offer personalized health advice in multiple Indian languages.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <motion.div
              className="feature-card flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="feature-icon-wrapper">
                <Languages className="feature-icon text-purple-500" />
              </div>
              <div>
                <h4 className="text-base font-medium">Multilingual Support</h4>
                <p className="text-sm text-muted-foreground">
                  Available in English, Hindi, Marathi, Punjabi, and Tamil
                </p>
              </div>
            </motion.div>

            <motion.div
              className="feature-card flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="feature-icon-wrapper">
                <Clock className="feature-icon text-blue-500" />
              </div>
              <div>
                <h4 className="text-base font-medium">24/7 Availability</h4>
                <p className="text-sm text-muted-foreground">Get healthcare guidance anytime, anywhere</p>
              </div>
            </motion.div>

            <motion.div
              className="feature-card flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="feature-icon-wrapper">
                <Heart className="feature-icon text-pink-500" />
              </div>
              <div>
                <h4 className="text-base font-medium">Personalized Advice</h4>
                <p className="text-sm text-muted-foreground">Tailored health recommendations based on your needs</p>
              </div>
            </motion.div>

            <motion.div
              className="feature-card flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="feature-icon-wrapper">
                <MessageSquare className="feature-icon text-emerald-500" />
              </div>
              <div>
                <h4 className="text-base font-medium">Conversation Transcript</h4>
                <p className="text-sm text-muted-foreground">
                  Automatic recording of your conversation for future reference
                </p>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// User instructions component
const UserInstructions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-6"
    >
      <Accordion type="single" collapsible className="w-full instruction-accordion">
        <AccordionItem value="instructions">
          <AccordionTrigger className="flex items-center gap-2 text-lg py-4 px-4 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-t-xl">
            <div className="instruction-icon-wrapper">
              <HelpCircle className="instruction-icon text-violet-500" />
            </div>
            <span>How to use ArogyaMitra</span>
          </AccordionTrigger>
          <AccordionContent className="bg-white p-6 rounded-b-xl shadow-inner">
            <ol className="space-y-4 text-base text-muted-foreground list-none pl-0">
              <motion.li className="instruction-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="step-number">1</div>
                <div>
                  <strong>Enter your name and select your preferred language</strong> from the dropdown menu.
                </div>
              </motion.li>

              <motion.li className="instruction-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="step-number">2</div>
                <div>
                  <strong>Click the "Connect" button</strong> to start a new conversation with the voice assistant.
                </div>
              </motion.li>

              <motion.li className="instruction-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="step-number">3</div>
                <div>
                  <strong>Speak clearly into your microphone</strong> when you see the "Ready" status.
                </div>
              </motion.li>

              <motion.li className="instruction-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="step-number">4</div>
                <div>
                  <strong>Wait for the assistant to respond</strong> - you'll see the visualizer animate when it's
                  speaking.
                </div>
              </motion.li>

              <motion.li className="instruction-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="step-number">5</div>
                <div>
                  <strong>View the transcript</strong> of your conversation in the chat panel on the right.
                </div>
              </motion.li>

              <motion.li className="instruction-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="step-number">6</div>
                <div>
                  <strong>Use the control bar</strong> to mute/unmute your microphone or adjust settings.
                </div>
              </motion.li>

              <motion.li className="instruction-step" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="step-number">7</div>
                <div>
                  <strong>Click "Disconnect"</strong> when you're finished with your conversation.
                </div>
              </motion.li>
            </ol>

            <Alert className="mt-6 border-0 bg-gradient-to-r from-amber-50 to-yellow-50">
              <div className="flex items-start gap-3">
                <div className="alert-icon-wrapper">
                  <AlertCircle className="alert-icon text-amber-500" />
                </div>
                <div>
                  <AlertTitle className="text-amber-700">Important Note</AlertTitle>
                  <AlertDescription className="text-amber-600">
                    At the end of your conversation, ArogyaMitra will automatically generate a summary and
                    recommendations based on your discussion.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  )
}

// Main DiscussionRoom component
export default function DiscussionRoom() {
  const { roomid } = useParams()
  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid })
  const [Expert, setExpert] = useState()
  const [token, setToken] = useState(null)
  const [isSubmittingName, setIsSubmittingName] = useState(true)
  const [name, setName] = useState("")
  const [language, setLanguage] = useState("en-US")
  const [messages, setMessages] = useState([])
  const chatContentRef = useRef(null)
  const [showDetails, setShowDetails] = useState(false)
  const mainContainerRef = useRef(null) // Reference for the main container

  // Fetch expert data
  useEffect(() => {
    if (DiscussionRoomData) {
      const foundExpert = Coachingexperts.find((item) => item.name === DiscussionRoomData.expertName)
      console.log("Expert:", foundExpert)
      setExpert(foundExpert)
    }
  }, [DiscussionRoomData])

  // Auto-scroll to the bottom of the chat when messages update
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight
    }
  }, [messages])

  // Ensure the page is scrollable
  useEffect(() => {
    // Set overflow to auto on the main container and body
    document.body.style.overflow = "auto"
    document.body.style.height = "auto"

    // Scroll to top on initial load
    window.scrollTo(0, 0)

    return () => {
      // Reset styles when component unmounts
      document.body.style.overflow = ""
      document.body.style.height = ""
    }
  }, [])

  // Fetch token
  const getToken = useCallback(async (userName, selectedLanguage) => {
    try {
      const response = await fetch(
        `/api/getToken?name=${encodeURIComponent(userName)}&language=${encodeURIComponent(selectedLanguage)}`,
      )
      const token = await response.text()
      setToken(token)
      setIsSubmittingName(false)
    } catch (error) {
      console.error("Error fetching token:", error)
    }
  }, [])

  // Handle form submission
  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      getToken(name, language)
    }
  }

  // Handle disconnection
  const handleDisconnect = () => {
    setToken(null)
    setIsSubmittingName(true)
    setMessages([])
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const pulseAnimation = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  // Handle scroll to details section
  const scrollToDetails = () => {
    setShowDetails(!showDetails)

    // If showing details, scroll to the details section after a short delay
    if (!showDetails) {
      setTimeout(() => {
        const detailsElement = document.querySelector(".additional-details")
        if (detailsElement) {
          detailsElement.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 300)
    }
  }

  return (
    <div className="min-h-screen bg-main" ref={mainContainerRef}>
      <div className="bg-blob-1"></div>
      <div className="bg-blob-2"></div>
      <div className="bg-blob-3"></div>

      <AppHeader />

      <motion.div
        className="discussion-room-container pt-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div
          className="page-title-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GradientText
            className="page-title text-3xl md:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {DiscussionRoomData?.coachingOption || "ArogyaMitra Voice Assistant"}
          </GradientText>
          <motion.div
            className="title-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Zap className="title-badge-icon" />
            <span>AI-Powered</span>
          </motion.div>
        </motion.div>

        {/* Main Interaction Area - Voice Agent and Chat Transcript */}
        <div className="main-interaction-area">
          <div className="interaction-grid">
            {/* Expert Container */}
            <motion.div className="expert-container" variants={fadeIn} transition={{ delay: 0.3 }}>
              <div className="expert-card">
                <div className="expert-content">
                  {Expert?.avatar && (
                    <motion.div className="expert-profile" variants={pulseAnimation} animate="pulse">
                      <div className="avatar-container">
                        <div className="avatar-glow"></div>
                        <Image
                          src={Expert.avatar || "/placeholder.svg?height=120&width=120"}
                          alt="Avatar"
                          width={120}
                          height={120}
                          className="expert-avatar"
                        />
                        <motion.div
                          className="status-indicator"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      </div>
                      <GradientText className="expert-name">{Expert?.name || "Healthcare Assistant"}</GradientText>
                      <div className="expert-title-container">
                        <p className="expert-title">Voice Nurse Assistant</p>
                        <div className="expert-badge">
                          <Shield className="expert-badge-icon" />
                          <span>Certified</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {token ? (
                    <LiveKitRoom
                      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL || "wss://your-livekit-server-url"}
                      token={token}
                      connect={true}
                      video={false}
                      audio={true}
                      onDisconnected={handleDisconnect}
                    >
                      <RoomAudioRenderer />
                      <VoiceAssistantContent setMessages={setMessages} />
                    </LiveKitRoom>
                  ) : (
                    <motion.div
                      className="connect-prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="connect-icon-container">
                        <Mic className="connect-icon" />
                        <div className="connect-icon-rings">
                          <div className="ring ring1"></div>
                          <div className="ring ring2"></div>
                          <div className="ring ring3"></div>
                        </div>
                      </div>
                      <h3 className="connect-title">Ready to Start Conversation</h3>
                      <p className="connect-description">Enter your name and select a language to begin</p>
                    </motion.div>
                  )}

                  <motion.div className="user-button-container" whileHover={{ scale: 1.05 }}>
                    <UserButton />
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="form-container"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {isSubmittingName ? (
                  <form onSubmit={handleNameSubmit} className="connect-form">
                    <div className="input-container">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="name-input"
                        required
                      />
                      <div className="input-icon">
                        <MessageSquare size={16} />
                      </div>
                    </div>

                    <div className="input-container">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="language-select"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="mr">Marathi</option>
                        <option value="pa">Punjabi</option>
                        <option value="ta">Tamil</option>
                      </select>
                      <div className="input-icon">
                        <Languages size={16} />
                      </div>
                    </div>

                    <Button type="submit" className="connect-button">
                      Connect
                    </Button>
                  </form>
                ) : (
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button onClick={handleDisconnect} variant="destructive" className="disconnect-button">
                      <LogOut size={16} />
                      Disconnect
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Chat Section */}
            <motion.div className="chat-container" variants={fadeIn} transition={{ delay: 0.4 }}>
              <div className="chat-card">
                <div className="chat-header">
                  <GradientText>
                    <h2 className="chat-title">
                      <MessageSquare className="chat-icon" />
                      Chat Transcript
                    </h2>
                  </GradientText>
                  <motion.div
                    className="message-counter"
                    animate={{
                      scale: messages.length > 0 ? [1, 1.05, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {messages.length} messages
                  </motion.div>
                </div>

                <div className="chat-content" ref={chatContentRef}>
                  <AnimatePresence>
                    {token ? (
                      messages.length > 0 ? (
                        messages.map((msg, index) => <Message key={msg.id || index} type={msg.type} text={msg.text} />)
                      ) : (
                        <motion.div
                          className="empty-chat"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div>
                            <div className="empty-chat-icon-container">
                              <AudioWaveform className="empty-chat-icon" />
                              <div className="empty-chat-icon-glow"></div>
                            </div>
                            <p>Your conversation will appear here.</p>
                            <p className="empty-chat-subtitle">Start speaking to see the transcript.</p>
                          </div>
                        </motion.div>
                      )
                    ) : (
                      <motion.div
                        className="empty-chat"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div>
                          <div className="empty-chat-icon-container">
                            <MessageSquare className="empty-chat-icon" />
                            <div className="empty-chat-icon-glow"></div>
                          </div>
                          <p>Connect to start the conversation.</p>
                          <p className="empty-chat-subtitle">Enter your name and select a language.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div className="footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <div className="footer-card">
              <AudioWaveform className="footer-icon" />
              <p className="footer-text">
                At the end of the conversation, we will automatically generate feedback/notes from your conversation.
              </p>
              <div className="footer-stars">
                <Star className="star star1" />
                <Star className="star star2" />
                <Star className="star star3" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Toggle Details Button */}
        <motion.div
          className="details-toggle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={scrollToDetails}
        >
          <div className="details-toggle-content">
            <Info className="details-toggle-icon" />
            <span>{showDetails ? "Hide Details" : "Show Details"}</span>
            <ChevronDown
              className={`details-toggle-arrow ${showDetails ? "rotate-180" : ""}`}
              style={{ transition: "transform 0.3s ease" }}
            />
          </div>
        </motion.div>

        {/* Additional Details Section */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="additional-details"
              id="details-section"
            >
              {/* Product Description */}
              <ProductDescription />

              {/* User Instructions */}
              <UserInstructions />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
