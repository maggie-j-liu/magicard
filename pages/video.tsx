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
  return <video ref={videoRef} autoPlay />;
};

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const Video = () => {
  const [blob, setBlob] = useState<Blob>();
  const [uploadedUrl, setUploadedUrl] = useState("");
  return (
    <>
      <DynamicComponent
        video
        blobPropertyBag={{ type: "video/mp4" }}
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
              <button
                className="disabled:text-gray-400"
                disabled={status !== "stopped"}
                onClick={async () => {
                  const file = (await blobToBase64(blob!)) as string;
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", "unsigned_preset");
                  const result = await fetch(
                    "https://api.cloudinary.com/v1_1/dxxmohqvs/auto/upload",
                    {
                      method: "POST",
                      body: formData,
                    }
                  ).then((res) => res.json());
                  console.log(result);

                  setUploadedUrl(
                    `https://res.cloudinary.com/dxxmohqvs/video/upload/${result.public_id}.mp4`
                  );
                }}
              >
                upload
              </button>
              {status === "stopped" ? (
                <video src={mediaBlobUrl ?? ""} controls autoPlay />
              ) : (
                <VideoPreview stream={previewStream} />
              )}
            </div>
          );
        }}
      />
      {uploadedUrl}
    </>
  );
};

export default Video;
