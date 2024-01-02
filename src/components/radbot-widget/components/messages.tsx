import { MessageType } from "@/types/MessageType";
import parse from "html-react-parser";
import { useState } from "react";

export default function MessagesSection({
  messages,
}: {
  messages: MessageType[];
}) {
  const capitalize = (str: string) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
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
                <audio controls className="my-2 w-full max-w-sm rounded-lg">
                  <source src={message.audio} type="audio/mpeg"></source>
                  Your browser does not support the audio element.
                </audio>
                <video controls className="my-2 rounded-lg w-full max-w-sm">
                  <source src={message.video} type="video/mp4"></source>
                  Your browser does not support the video element.
                </video>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
