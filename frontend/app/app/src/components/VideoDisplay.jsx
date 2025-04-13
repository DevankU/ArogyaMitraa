import { useParticipants, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { VideoTrack } from "@livekit/components-react";

const VideoDisplay = () => {
  const participants = useParticipants();
  const { tracks } = useTracks([
    { source: Track.Source.Camera, withPlaceholder: false },
  ]);

  // Display local camera preview
  const localVideoTrack = tracks.find(
    (t) => t.source === Track.Source.Camera && t.participant.isLocal
  );

  return (
    <div className="video-container">
      {localVideoTrack ? (
        <VideoTrack track={localVideoTrack} />
      ) : (
        <div className="no-video">Camera preview not available</div>
      )}
    </div>
  );
};

export default VideoDisplay;