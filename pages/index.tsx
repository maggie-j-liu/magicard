import Image from "next/image";
import { Inter } from "next/font/google";
import VideoRecorder from "react-video-recorder";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <VideoRecorder
        onRecordingComplete={(videoBlob) => {
          console.log(videoBlob);
        }}
      />
    </main>
  );
}
