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
        <div className="text-5xl text-center block font-semibold font-['Noto Sans Japanese']">
          <div className="inline-block mr-2 text-4xl -mt-12 -rotate-45">✨</div>
          magicard
          <div className="inline-block text-4xl ml-2 -mt-12 rotate-45">✨</div>
        </div>

        <p className=" mt-1 text-center">
          send an magical letter to someone special...
        </p>

        <div
          className="md:block hidden absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#f2eee9" offset="0%" />
                <stop stopColor="#f7e5d0" offset="77.402%" />
                <stop stopColor="#ffdbb0" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle className="shadow-lg" cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" className="shadow-lg" />
            </g>
          </svg>
        </div>

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
