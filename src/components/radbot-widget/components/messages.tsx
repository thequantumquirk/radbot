import { MessageType } from "@/types/MessageType";
import parse from "html-react-parser";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";

export default function MessagesSection({
  messages,
}: {
  messages: MessageType[];
}) {
  const capitalize = (str: string) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  const divRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (divRef.current)
      divRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="relative grow h-full flex flex-col-reverse overflow-y-scroll">
      {messages
        .slice(0)
        .reverse()
        .map((message, id) => (
          <div key={id} className={`${id === 0 ? "z-20" : "z-0"}`}>
            <div
              ref={id === 0 ? divRef : null}
              className={`${
                message.role === "assistant"
                  ? "bg-assist-bg"
                  : "text-foreground bg-user-bg"
              } items-center p-4 w-full border-b border-white`}
            >
              <p className="font-bold">{capitalize(message.role)}</p>
              <div className="whitespace-pre-wrap">
                {parse(message.content)}
              </div>
              {message.role === "assistant" && (
                <>
                  <video
                    controls
                    className="my-2 rounded-lg w-full max-w-sm h-64"
                  >
                    <source src={message.video} type="video/mp4"></source>
                    Your browser does not support the video element.
                  </video>
                </>
              )}
            </div>
          </div>
        ))}
      <Button
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-10"
        onClick={() => scrollToBottom()}
      >
        <ArrowDown />
      </Button>
    </div>
  );
}
