// // Transcriptions.jsx
// import { useEffect, useState } from "react";
// import { 
//   TranscriptionSegment, 
//   Participant,
//   TrackPublication,
//   RoomEvent, 
// } from "livekit-client";
// import { useMaybeRoomContext } from "@livekit/components-react";

// // Functional component to display and manage transcriptions
// export default function Transcriptions({ onTranscription }) {
//   const room = useMaybeRoomContext();
//   const [transcriptions, setTranscriptions] = useState([]);

//   // Effect to handle transcription events
//   useEffect(() => {
//     if (!room) {
//       return;
//     }

//     const updateTranscriptions = (
//       segments,  // Removed type annotation
//       participant,  // Removed type annotation
//       publication  // Removed type annotation
//     ) => {
//       // Call the onTranscription callback for each segment
//       segments.forEach(onTranscription);
//       // Update state with new transcriptions
//       setTranscriptions((prev) => [...prev, ...segments]);
//     };

//     // Subscribe to transcription events
//     room.on(RoomEvent.TranscriptionReceived, updateTranscriptions);
    
//     // Cleanup function to unsubscribe
//     return () => {
//       room.off(RoomEvent.TranscriptionReceived, updateTranscriptions);
//     };
//   }, [room, onTranscription]);

//   // JSX rendering of transcription list
//   return (
//     <ul>
//       {transcriptions
//         .sort((a, b) => a.firstReceivedTime - b.firstReceivedTime)
//         .map((segment) => (
//           <li key={segment.id}>{segment.text}</li>
//         ))}
//     </ul>
//   );
// }