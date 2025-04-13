"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Brain, Square, Paperclip, Camera, X } from "lucide-react"
import Aurora from "@/components/ui/Aurora"
import IndiaGradient from "@/components/ui/IndiaGradient"
import { BlurFade } from "@/components/magicui/blur-fade"
import '../chat.css';
import GradientText from "@/components/ui/GradientText"

import { UserButton } from '@stackframe/stack';

const Chatbot = () => {
  const [message, setMessage] = useState("")
  const [attachedImage, setAttachedImage] = useState(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const [typingStopped, setTypingStopped] = useState(false)
  const [isUserScrolled, setIsUserScrolled] = useState(false)
  const chatContainerRef = useRef(null)
  const videoRef = useRef(null)
  const typingIntervalRef = useRef(null)

  useEffect(() => {
    if (!isUserScrolled && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  useEffect(() => {
    if (!conversationId) {
      setConversationId(Date.now().toString())
    }
  }, [conversationId])

  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      const isBottom = scrollHeight - scrollTop - clientHeight < 100
      setIsUserScrolled(!isBottom)
    }

    const container = chatContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAttachedImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const captureFromCamera = async () => {
    setCameraActive(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch (err) {
      console.error("Camera error:", err)
    }
  }

  const takeSnapshot = () => {
    if (!videoRef.current) return
    const canvas = document.createElement("canvas")
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext("2d")
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    const dataURL = canvas.toDataURL("image/jpeg")
    setAttachedImage(dataURL)
    const stream = videoRef.current.srcObject
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    setCameraActive(false)
  }

  const stopTyping = () => {
    setTypingStopped(true)
    clearInterval(typingIntervalRef.current)
    setLoading(false)
  }

  const sendMessage = async (baseModel, isThinking) => {
    if (!message.trim() && !attachedImage) return;

    let selectedModel;
    let payload;
    if (attachedImage) {
      selectedModel = "meta-llama/llama-4-scout-17b-16e-instruct";
      payload = {
        conversation_id: conversationId,
        model: selectedModel,
        image: attachedImage,
        prompt: message || "Analyze this image for dermatological, injury, or dental concerns.",
      };
    } else {
      selectedModel = isThinking ? "qwen-qwq-32b" : baseModel;
      payload = {
        conversation_id: conversationId,
        model: selectedModel,
        message: message,
      };
    }

    const userMessageId = Date.now();
    let thinkingId;

    setTypingStopped(false);
    setLoading(true);
    const newHistory = [...chatHistory, { id: userMessageId, sender: "user", text: message, image: attachedImage || null }];

    if (isThinking && !attachedImage) {
      thinkingId = userMessageId + 1;
      newHistory.push({ id: thinkingId, sender: "ai", text: "", isThinking: true });
    }

    setChatHistory(newHistory);
    setMessage("");
    setAttachedImage(null);

    try {
      const response = await fetch(attachedImage ? "http://localhost:5000/analyze-image" : "http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error with API request");

      const data = await response.json();
      const thinkingContent = data.thinking || "";
      const answer = data.answer;

      if (isThinking && thinkingContent && !attachedImage) {
        setChatHistory((prev) =>
          prev.map((msg) =>
            msg.id === thinkingId ? { ...msg, text: `Thinking... ${thinkingContent}`, isThinking: false } : msg
          )
        );
      } else if (isThinking && !attachedImage) {
        setChatHistory((prev) => prev.filter((msg) => msg.id !== thinkingId));
      }

      const answerId = Date.now() + 2;
      setChatHistory((prev) => [...prev, { id: answerId, sender: "ai", text: "", isTyping: true }]);
      const tokens = answer.split(" ");
      let currentText = "";
      tokens.forEach((token, index) => {
        setTimeout(() => {
          currentText += token + " ";
          setChatHistory((prev) =>
            prev.map((msg) =>
              msg.id === answerId ? { ...msg, text: currentText } : msg
            )
          );
          if (index === tokens.length - 1) {
            setChatHistory((prev) =>
              prev.map((msg) =>
                msg.id === answerId ? { ...msg, isTyping: false } : msg
              )
            );
          }
        }, index * 100); // Adjust delay as needed
      });
    } catch (error) {
      console.error("Error:", error);
      if (isThinking && !attachedImage) {
        setChatHistory((prev) => prev.filter((msg) => msg.id !== thinkingId));
      }
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage("gemma2-9b-it", false);
    }
  }

  return (
    <div className="chatbot-container bg-gradient-to-r from-blue-50 to-green-50">
      <div className="aurora-container">
        <Aurora colorStops={["#FF671F", "#FFFFFF", "#046A38"]} amplitude={0.8} blend={0.3} speed={0.5} />
      </div>
    
      <header className="chatbot-header bg-gradient-to-r from-blue-50 to-green-50">
      <div className="aurora-container">
        <Aurora colorStops={["#FF671F", "#FFFFFF", "#046A38"]} amplitude={0.8} blend={0.3} speed={0.5} />
      </div>
    
        <div className="header-title">
          <BlurFade delay={0.3} inView>
            <GradientText>ArogyaBot-1o</GradientText>
          </BlurFade>
        </div>
        <div className="header-subtitle"><UserButton /></div>
      </header>

      {cameraActive && (
        <div style={{ textAlign: 'center', margin: '1rem' }}>
          <video ref={videoRef} style={{ maxWidth: '100%', borderRadius: '0.5rem' }} autoPlay playsInline />
          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={takeSnapshot} className="send-button">Click</button>
          </div>
        </div>
      )}

      <div className="chat-area bg-gradient-to-r from-blue-50 to-green-50" ref={chatContainerRef}>
        
        {chatHistory.length === 0 ? (
          <div className="welcome-container">
            <BlurFade delay={0.3} inView>
              <div className="welcome-icon animate-pulse">
                <img src="/nurse.png" alt="Welcome" />
              </div>
            </BlurFade>
            <BlurFade delay={0.3} inView>
              <IndiaGradient><h2 className="text-2xl" >Welcome to ArogyaBot</h2></IndiaGradient>
              <p className="welcome-message">I'm here to assist with your health-related questions.</p>
              <p className="welcome-message">
                Click <Brain size={18} className="inline-block text-gray-500" /> for deeper analysis.
              </p>
            </BlurFade>
          </div>
        ) : (
          <div className="messages-container ">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-bubble">
                  {msg.isThinking ? (
                    <div>
                      <span>Thinking</span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  ) : msg.isTyping ? (
                    <div>
                      <span>{msg.text}</span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
                {msg.sender === "user" && msg.image && (
                  <img src={msg.image} alt="Attached image" className="attached-image" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {attachedImage && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={attachedImage}
              alt="Preview"
              style={{ maxHeight: '120px', borderRadius: '0.5rem', boxShadow: '0 0 6px rgba(0,0,0,0.2)' }}
            />
            <button
              onClick={() => setAttachedImage(null)}
              title="Remove image"
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer'
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="input-container bg-gradient-to-r from-blue-50 to-green-50">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          onChange={handleImageUpload}
        />
        <button
          type="button"
          onClick={() => document.getElementById("image-upload").click()}
          className="attach-button"
          title="Attach image"
        >
          <Paperclip size={18} />
        </button>
        <button
          type="button"
          onClick={captureFromCamera}
          className="attach-button"
          title="Capture from camera"
        >
          <Camera size={18} />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="message-input"
          placeholder="Type your health question..."
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => sendMessage("gemma2-9b-it", false)}
          className="send-button"
          disabled={loading || (!message.trim() && !attachedImage)}
        >
          <Send size={18} />
        </button>
        <button
          type="button"
          onClick={() => sendMessage("qwen-qwq-32b", true)}
          className="think-button"
          disabled={loading || (!message.trim() && !attachedImage)}
          title="Think deeply about this question"
        >
          <Brain size={18} />
        </button>
        {loading && (
          <button
            type="button"
            className="stop-button"
            onClick={stopTyping}
            title="Stop AI response"
          >
            <Square size={18} />
          </button>
        )}
      </div>

      <footer className="chatbot-footer text-center text-gray-500 mb-2">ArogyaMitra - Your AI health Companion</footer>
    </div>
  )
}

export default Chatbot