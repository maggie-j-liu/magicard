import Image from "next/image";
import { Inter } from "next/font/google";
import { useReactMediaRecorder } from "react-media-recorder";
import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import { BsFillRecord2Fill, BsFillStopFill, BsStopFill } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { ImLoop2 } from "react-icons/im";
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
  return (
    <video
      ref={videoRef}
      className="rounded-lg"
      //   width={500}
      //   height={500}
      autoPlay
    />
  );
};

export default function Home() {
  return (
    <main>
      <div
        className={`max-w-screen min-h-screen bg-[#fcf3dc] bg-opacity-40 px-6 pt-12 pb-4 lg:px-52 lg:pt-16 lg:pb-8 xl:px-96 xl:pb-12 2xl:px-[500px]`}
      >
        <div className="text-4xl text-center block font-extrabold font-['Newsreader']">
          <div className="inline-block text-xl -mt-12 -rotate-45">✨</div>
          magicard
          <div className="inline-block text-xl -mt-12 rotate-45">✨</div>
        </div>

        <p className="font-['Spectral'] text-center">
          send an magical letter to someone special...
        </p>

        <div className="mt-12 flex justify-center items-center">
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
                  <div>
                    {status == "recording" ? (
                      <>
                        <div className="bg-red-200 rounded-lg p-2 ml-2 -mb-12 relative w-fit">
                          <BsFillRecord2Fill className="text-red-500 animate-pulse" />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {status === "stopped" ? (
                    <video
                      className="rounded-lg"
                      src={mediaBlobUrl}
                      controls
                      autoPlay
                    />
                  ) : (
                    <VideoPreview stream={previewStream} />
                  )}
                  {status == "recording" ? (
                    <button
                      onClick={() => {
                        stopRecording();
                      }}
                    >
                      <BsStopFill className="hover:text-red-400 transition ease-in-out md:text-5xl text-4xl" />
                    </button>
                  ) : status == "idle" ? (
                    <button
                      onClick={() => {
                        startRecording();
                      }}
                    >
                      <AiFillPlayCircle className="hover:text-red-400 transition ease-in-out md:text-5xl text-4xl" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        startRecording();
                      }}
                    >
                      <ImLoop2 className="mt-2 hover:text-red-400 transition ease-in-out md:text-4xl text-3xl" />
                    </button>
                  )}
                </div>
              );
            }}
          />
        </div>
      </div>
    </main>
  );
}
