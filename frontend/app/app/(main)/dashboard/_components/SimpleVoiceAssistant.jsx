"use client";
import "./SimpleVoiceAssistant.css";
import {
  useVoiceAssistant,
  BarVisualizer,
  VoiceAssistantControlBar,
  useTrackTranscription,
  useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import GradientText from "@/components/ui/GradientText";

const Message = ({ type, text }) => {
  return (
    <div
      className={`mb-2 p-3 rounded-lg ${
        type === "agent" ? "bg-purple-50" : "bg-green-50"
      }`}
    >
      <strong
        className={`font-medium ${
          type === "agent" ? "text-[#e758fa]" : "text-[#2ecc71]"
        }`}
      >
        {type === "agent" ? "Agent: " : "You: "}
      </strong>
      <span className="text-[#333]">{text}</span>
    </div>
  );
};

const SimpleVoiceAssistant = () => {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const localParticipant = useLocalParticipant();
  const { segments: userTranscriptions } = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const allMessages = [
      ...(agentTranscriptions?.map((t) => ({ ...t, type: "agent" })) ?? []),
      ...(userTranscriptions?.map((t) => ({ ...t, type: "user" })) ?? []),
    ].sort((a, b) => a.firstReceivedTime - b.firstReceivedTime);
    setMessages(allMessages);
  }, [agentTranscriptions, userTranscriptions]);

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto p-5 h-full bg-white/90 backdrop-blur-md rounded-2xl shadow-lg">
      <GradientText as="h2" className="text-2xl font-bold mb-6 text-center">
        Voice Assistant
      </GradientText>

      <div className="w-full max-w-[800px] h-[300px] mx-auto bg-gray-50 rounded-xl p-4 border border-gray-100">
        <BarVisualizer
          state={state}
          barCount={12}
          trackRef={audioTrack}
          className="h-full"
        />
      </div>

      <div className="w-full max-w-[800px] mt-5">
        <VoiceAssistantControlBar className="bg-gray-50 p-3 rounded-lg" />

        <div className="p-5 max-h-[300px] overflow-y-scroll w-full h-full border border-gray-200 rounded-lg mt-5 bg-white shadow-sm">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <Message key={msg.id || index} type={msg.type} text={msg.text} />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Start speaking or type a message to begin the conversation
            </div>
          )}
        </div>

        <div className="mt-5 w-full flex gap-3">
          <input
            type="text"
            placeholder="Type your message here..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleVoiceAssistant;
