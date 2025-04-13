import { useState } from "react";

export const ChatMessageInput = ({ placeholder, accentColor, onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  // Define button color classes dynamically
  const buttonClass = {
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    purple: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
    pink: "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500",
  }[accentColor] || "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"; // Default fallback

  return (
    <div className="flex items-center border-t border-gray-200 p-4">
      <input
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className={`px-4 py-2 rounded-r-lg text-white focus:outline-none focus:ring-2 ${buttonClass}`}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};
