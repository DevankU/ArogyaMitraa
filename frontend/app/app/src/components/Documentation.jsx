export function Documentation() {
    return (
      <div className="documentation-page">
        <div className="docs-container">
          <div className="docs-sidebar">
            <div className="docs-nav">
              <h3>Contents</h3>
              <ul>
                <li>
                  <a href="#getting-started">Getting Started</a>
                </li>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#voice-assistant">Voice Assistant</a>
                </li>
                <li>
                  <a href="#chat-interface">Chat Interface</a>
                </li>
                <li>
                  <a href="#privacy">Privacy & Security</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="docs-content">
            <h1>ArogyaMitra Documentation</h1>
            <p className="docs-intro">
              Welcome to the ArogyaMitra documentation. This guide will help you understand how to use our AI-powered
              healthcare assistant effectively.
            </p>
  
            <section id="getting-started">
              <h2>Getting Started</h2>
              <div className="docs-card">
                <h3>What is ArogyaMitra?</h3>
                <p>
                  ArogyaMitra is an AI-powered healthcare assistant designed to provide immediate medical guidance and
                  support. Our platform combines advanced artificial intelligence with medical expertise to deliver
                  personalized healthcare solutions accessible to everyone, anytime, anywhere.
                </p>
              </div>
  
              <div className="docs-card">
                <h3>How to Start a Conversation</h3>
                <ol>
                  <li>
                    Click on the <strong>"Talk to Agent"</strong> button on the homepage
                  </li>
                  <li>Enter your name when prompted</li>
                  <li>Once connected, you can start describing your health concerns</li>
                  <li>The AI assistant will respond with relevant questions and guidance</li>
                </ol>
              </div>
            </section>
  
            <section id="features">
              <h2>Features</h2>
              <div className="docs-card">
                <h3>24/7 Availability</h3>
                <p>
                  ArogyaMitra is available round the clock to address your health concerns whenever they arise. No
                  appointments or waiting times are needed.
                </p>
              </div>
  
              <div className="docs-card">
                <h3>Medical Knowledge Base</h3>
                <p>
                  Our AI is trained on extensive medical databases to provide accurate health information and guidance. It
                  can help with symptom assessment, general health queries, medication information, and preventive
                  healthcare tips.
                </p>
              </div>
  
              <div className="docs-card">
                <h3>Human Escalation</h3>
                <p>
                  For complex cases that require human expertise, ArogyaMitra can seamlessly connect you with a healthcare
                  professional. The system is designed to recognize when a case needs human intervention.
                </p>
              </div>
            </section>
  
            <section id="voice-assistant">
              <h2>Voice Assistant</h2>
              <div className="docs-card">
                <h3>Using Voice Commands</h3>
                <p>
                  ArogyaMitra supports voice interaction, allowing you to speak directly to the assistant. This hands-free
                  approach is convenient for many situations.
                </p>
                <ul>
                  <li>
                    <strong>Start speaking</strong> after the connection is established
                  </li>
                  <li>Speak clearly and at a moderate pace</li>
                  <li>Pause briefly between sentences to allow the AI to process your input</li>
                  <li>
                    Use the <strong>Mute</strong> button when you want to temporarily disable your microphone
                  </li>
                </ul>
              </div>
  
              <div className="docs-card">
                <h3>Voice Controls</h3>
                <p>Available controls during a voice session:</p>
                <ul>
                  <li>
                    <strong>Mute/Unmute:</strong> Toggle your microphone on/off
                  </li>
                  <li>
                    <strong>End Call:</strong> Terminate the current session
                  </li>
                </ul>
              </div>
            </section>
  
            <section id="chat-interface">
              <h2>Chat Interface</h2>
              <div className="docs-card">
                <h3>Text-based Communication</h3>
                <p>
                  If you prefer typing or are in a situation where speaking isn't convenient, you can use the text-based
                  chat interface. Simply type your messages in the input field and press Enter or click the send button.
                </p>
              </div>
  
              <div className="docs-card">
                <h3>Conversation History</h3>
                <p>
                  Your conversation history is displayed in the chat window, allowing you to review previous exchanges.
                  This helps maintain context throughout your interaction with the assistant.
                </p>
              </div>
            </section>
  
            <section id="privacy">
              <h2>Privacy & Security</h2>
              <div className="docs-card">
                <h3>Data Protection</h3>
                <p>
                  ArogyaMitra takes your privacy seriously. All conversations are encrypted and securely stored. Your
                  personal health information is protected according to healthcare data protection standards.
                </p>
                <ul>
                  <li>End-to-end encryption for all communications</li>
                  <li>Secure data storage with limited access</li>
                  <li>Option to delete your conversation history</li>
                  <li>No sharing of personal data with third parties without consent</li>
                </ul>
              </div>
            </section>
  
            <section id="faq">
              <h2>Frequently Asked Questions</h2>
              <div className="docs-card faq-section">
                <div className="faq-item">
                  <h3>Is ArogyaMitra a replacement for a doctor?</h3>
                  <p>
                    No, ArogyaMitra is designed to provide initial guidance and information but is not a substitute for
                    professional medical advice. For serious health concerns, always consult with a qualified healthcare
                    provider.
                  </p>
                </div>
  
                <div className="faq-item">
                  <h3>How accurate is the information provided?</h3>
                  <p>
                    ArogyaMitra is trained on verified medical information and continuously updated. However, it should be
                    used as a supplementary resource rather than the sole source of medical advice.
                  </p>
                </div>
  
                <div className="faq-item">
                  <h3>Can I use ArogyaMitra in an emergency?</h3>
                  <p>
                    No, ArogyaMitra is not designed for emergency situations. In case of a medical emergency, please call
                    your local emergency services (like 911 in the US) immediately.
                  </p>
                </div>
  
                <div className="faq-item">
                  <h3>Is there a limit to how often I can use the service?</h3>
                  <p>
                    No, you can use ArogyaMitra as often as needed. The service is designed to be available 24/7 without
                    usage restrictions.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
  
  