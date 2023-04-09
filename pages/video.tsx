import { ReactMediaRecorder } from "react-media-recorder";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const DynamicComponent = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  {
    ssr: false,
  }
);

const Video = () => {
  return (
    <DynamicComponent
      video
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <video src={mediaBlobUrl} controls autoPlay loop />
        </div>
      )}
    />
  );
};
