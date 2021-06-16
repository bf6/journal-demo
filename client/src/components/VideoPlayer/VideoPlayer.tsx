import React from "react";
import { VideoPlayerProps } from "./VideoPlayer.types";
import Hls from "hls.js";

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ recording }) => {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    let hls: Hls;
    if (videoRef.current) {
      const video = videoRef.current;
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(recording.playback_ids[0].playback_url);
        hls.attachMedia(video);
      } else {
        console.error("This is a legacy browser that doesn't support MSE");
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoRef, recording]);

  return (
    <video
      className="w-full h-96 bg-black justify-self-center"
      controls
      autoPlay
      ref={videoRef}
    />
  );
};
