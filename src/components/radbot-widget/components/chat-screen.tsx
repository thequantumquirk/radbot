import { useContext } from "react";
import Image from "next/image";
import ChatbotSidebar from "./sidebar";
import PromptInput from "./prompt-input";
import MessagesSection from "./messages";
import { MessagesContext } from "../providers/messages-provider";
import { ChatContext } from "../providers/chat-provider";

export default function ChatScreen() {
  const { isChatPresent } = useContext(ChatContext);
  const { messages } = useContext(MessagesContext);
  return (
    <main
      className={`flex relative flex-col items-center ${
        !isChatPresent ? "justify-center" : "justify-between"
      } gap-4 p-4 overflow-hidden h-screen bg-background`}
    >
      <ChatbotSidebar />
      {!isChatPresent ? (
        <section className="flex flex-col justify-between items-center">
          <Image src="/logo.svg" alt="Logo" height={100} width={100} />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            The <span className="text-primary">Gooey</span> Chatbot
          </h1>
          <h4 className="text-sm sm:text-md lg:text-xl font-bold">
            Ask your <span className="text-primary">queries</span> and get it{" "}
            <span className="text-primary">answered</span>
          </h4>
        </section>
      ) : (
        <div className="flex gap-2 items-center">
          <div className="hidden lg:block">
            <Image src="/logo.svg" alt="Logo" height={40} width={40} />
          </div>
          <h1 className="text-2xl lg:text-3xl w-full font-bold">
            The <span className="text-primary">Gooey</span> Chatbot
          </h1>
        </div>
      )}
      {messages.length > 0 && (
        <section className="grow w-full lg:w-[80vw] h-64 bg-foreground/10 rounded-lg overflow-y-hidden">
          <MessagesSection messages={messages} />
        </section>
      )}
      <PromptInput />
    </main>
  );
}
