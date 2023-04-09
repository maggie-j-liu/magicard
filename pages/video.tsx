import { ReactMediaRecorder } from "react-media-recorder";
import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
const DynamicComponent = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  {
    ssr: false,
  }
);

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={500} height={500} autoPlay controls />;
};

const Video = () => {
  return (
    <DynamicComponent
      video
      render={({
        previewStream,
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
      }) => {
        return (
          <div>
            <div>{status}</div>
            <button
              onClick={() => {
                startRecording();
              }}
            >
              start recording
            </button>
            <button
              onClick={() => {
                stopRecording();
              }}
            >
              stop recording
            </button>
            {status === "stopped" ? (
              <video src={mediaBlobUrl} controls autoPlay loop />
            ) : (
              <VideoPreview stream={previewStream} />
            )}
          </div>
        );
      }}
    />
  );
};

export default Video;
