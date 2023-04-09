import Image from "next/image";
import { Inter } from "next/font/google";
import { useReactMediaRecorder } from "react-media-recorder";
import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import { BsFillRecord2Fill, BsFillStopFill, BsStopFill } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { ImLoop2 } from "react-icons/im";
import QRCode from "qrcode";
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
const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export default function Home() {
  const [blob, setBlob] = useState<Blob>();
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [qrCode, setQRCode] = useState("");
  return (
    <main>
      <div
        className={`max-w-screen min-h-screen bg-[#fcf3dc] bg-opacity-40 px-6 pt-12 pb-4 lg:px-52 lg:pt-16 lg:pb-8 xl:px-96 xl:pb-12 2xl:px-[500px]`}
      >
        <div className="prose prose-slate">
          <div className="text-5xl text-center block font-semibold font-serif">
            <div className="inline-block mr-2 text-4xl -mt-12 -rotate-45">
              ✨
            </div>
            magicard
            <div className="inline-block text-4xl ml-2 -mt-12 rotate-45">
              ✨
            </div>
          </div>

          <p className=" mt-1 text-center font-serif">
            send an magical letter to someone special...
          </p>
        </div>

        <div className="mt-12 flex justify-center items-center">
          <DynamicComponent
            video
            onStop={(_, b) => {
              setBlob(b);
            }}
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
                        <div className="bg-red-200 rounded-lg p-2 ml-4 -mb-12 relative w-fit">
                          <BsFillRecord2Fill className="text-red-500 animate-pulse" />
                        </div>
                      </>
                    ) : status == "stopped" ? (
                      <div className="-mb-14 ml-4 p-1.5 rounded-lg relative font-bold font-serif w-fit bg-orange-200 bg-opacity-100">
                        preview
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className=" p-2 border-2 border-yellow-700 rounded-lg">
                    {status === "stopped" ? (
                      <div>
                        <video
                          className="rounded-lg"
                          src={mediaBlobUrl ?? ""}
                          controls
                          autoPlay
                        />
                      </div>
                    ) : (
                      <VideoPreview stream={previewStream} />
                    )}

                    <div className="mt-2 flex justify-center items-center">
                      {status == "recording" ? (
                        <button
                          onClick={() => {
                            stopRecording();
                          }}
                        >
                          <BsStopFill className="hover:text-red-400 transition ease-in-out md:text-6xl text-7xl" />
                        </button>
                      ) : status == "idle" ? (
                        <button
                          onClick={() => {
                            startRecording();
                          }}
                        >
                          <AiFillPlayCircle className="hover:text-red-400 transition ease-in-out md:text-5xl text-6xl" />
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              startRecording();
                            }}
                          >
                            <ImLoop2 className="text-yellow-800 py-2 hover:text-red-400 transition ease-in-out md:text-5xl text-6xl" />
                          </button>
                          <button
                            className="px-4 py-1.5 bg-amber-800 bg-opacity-30 hover:bg-opacity-50 duration-150 hover:duration-100 rounded-md"
                            onClick={async () => {
                              const file = (await blobToBase64(
                                blob!
                              )) as string;
                              const formData = new FormData();
                              formData.append("file", file);
                              formData.append(
                                "upload_preset",
                                "unsigned_preset"
                              );
                              const result = await fetch(
                                "https://api.cloudinary.com/v1_1/dxxmohqvs/auto/upload",
                                {
                                  method: "POST",
                                  body: formData,
                                }
                              ).then((res) => res.json());
                              console.log(result);
                              const videoLink = `https://res.cloudinary.com/dxxmohqvs/video/upload/${result.public_id}.mp4`;
                              const params = new URLSearchParams({
                                video: videoLink,
                              });
                              const qr = await QRCode.toDataURL(
                                `https://maggiejliu-default-losaltoshacks.dev.8thwall.app/cryans-image-target-test2?${params}`
                              );
                              setQRCode(qr);

                              // setUploadedUrl(
                              //   `https://res.cloudinary.com/dxxmohqvs/video/upload/${result.public_id}.mp4`
                              // );
                            }}
                          >
                            ✨ create
                          </button>
                        </div>
                      )}
                    </div>
                    {uploadedUrl}
                    <img src={qrCode} />
                  </div>

                  <div className="mt-4 h-2 w-full bg-amber-800 bg-opacity-60 roudned-md" />

                  <div className="font-serif text-3xl mt-4 font-semibold">
                    How it works.
                  </div>
                  <div className="mt-4 h-1 w-full bg-red-800 bg-opacity-40 roudned-md" />

                  <p className="font-bold text-2xl mt-4 font-serif">1.</p>
                  <p className="font-serif text-xl">
                    Record a message with the video recorder above!
                  </p>

                  <Image
                    src="/howto/recordavideo.png"
                    width={300}
                    height={500}
                    className="mt-2 shadow-lg rounded-lg border border-black"
                  />
                  <div className="mt-4 h-1 w-full bg-red-800 bg-opacity-40 roudned-md" />
                  <p className="font-bold text-2xl mt-4 font-serif">2.</p>
                  <p className="font-serif">
                    Print out the greeting card that you receive and send it to
                    a friend!
                  </p>

                  <Image
                    src="/howto/giving.jpg"
                    width={300}
                    height={500}
                    className="mt-2 shadow-lg rounded-lg border border-black"
                  />
                  <div className="mt-4 h-1 w-full bg-red-800 bg-opacity-40 roudned-md" />
                  <p className="font-bold text-2xl mt-4 font-serif">3.</p>
                  <p className="font-serif">
                    When your friend scans your picture, they&apos;be able to
                    see your video in AR!
                  </p>
                  <Image
                    src="/howto/watching.jpg"
                    width={300}
                    height={500}
                    className="mt-2 shadow-lg rounded-lg border border-black"
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
    </main>
  );
}
