import Image from "next/image";
import { Inter } from "next/font/google";
import { useReactMediaRecorder } from "react-media-recorder";
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("../components/header"), {
  ssr: false,
});

export default function Home() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

  return (
    <main>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </main>
  );
}
