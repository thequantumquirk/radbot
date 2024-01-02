import { MessageType } from "@/types/MessageType";
import parse from "html-react-parser";
import { AudioLines, Video } from "lucide-react";
import { useState } from "react";

export default function MessagesSection({
  messages,
}: {
  messages: MessageType[];
}) {
  const capitalize = (str: string) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  const [audioId, setAudioId] = useState<number | null>(null);
  const [videoId, setVideoId] = useState<number | null>(null);

  const handleAudioId = (id: number) => {
    setAudioId(audioId !== id ? id : null);
  };

  const handleVideoId = (id: number) => {
    setVideoId(videoId !== id ? id : null);
  };

  return (
    <div className="grow h-full flex flex-col">
      {messages.map((message, id) => (
        <div key={id}>
          <div
            className={`${
              message.role === "assistant"
                ? "bg-assist-bg"
                : "text-foreground bg-user-bg"
            } items-center p-4 w-full border-b border-white`}
          >
            <p className="font-bold">{capitalize(message.role)}</p>
            <div className="whitespace-pre-wrap">{parse(message.content)}</div>
            {message.role === "assistant" && (
              <>
                {audioId === id && message.audio && (
                  <audio controls className="my-2">
                    <source src={message.audio} type="audio/mpeg"></source>
                    Your browser does not support the audio element.
                  </audio>
                )}
                {videoId === id && message.video && (
                  <video width="320" height="240" controls className="my-2">
                    <source src={message.video} type="video/mp4"></source>
                    Your browser does not support the video element.
                  </video>
                )}
                <div className="flex w-full justify-end items-center gap-1">
                  <button onClick={() => handleAudioId(id)}>
                    <AudioLines size={20} />
                    <p className="sr-only">Toggle Audio</p>
                  </button>
                  <button onClick={() => handleVideoId(id)}>
                    <Video size={24} />
                    <p className="sr-only">Toggle Video</p>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
