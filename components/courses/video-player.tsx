"use client";

import React, { useEffect, useRef } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";

const VideoPlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  const playerRef = useRef<YouTubePlayer | null>(null);

  const handlePlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    event.target.playVideo(); // optional autoplay
    console.log("YouTube player is ready", event.target);
  };

  useEffect(() => {
    console.log(videoId, "videoId in VideoPlayer");

    if (playerRef.current && videoId) {
      playerRef.current.loadVideoById(videoId); // no need for @ts-ignore
    }
  }, [videoId]);

  return (
    <div className="flex items-center justify-center">
      <YouTube
        videoId={videoId}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
          },
        }}
        onReady={handlePlayerReady}
      />
    </div>
  );
};

export default VideoPlayer;
