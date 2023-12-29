"use client";
import { MessageType } from "@/types/MessageType";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ChatContext } from "./providers/chat-provider";
import { ChatIdContext } from "./providers/chatid-provider";
import { MessagesContext } from "./providers/messages-provider";
import ChatScreen from "./components/chat-screen";
import { TooltipProvider } from "./ui/tooltip";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "./ui/toaster";

export default function RadBotWidget() {
  const queryClient = new QueryClient();
  const [isChatPresent, setIsChatPresent] = useState(false);
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [open, setOpen] = useState(false);
  const windowWidth = useRef(0);
  useEffect(() => {
    windowWidth.current = window.innerWidth;
  }, []);
  return (
    <TooltipProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <ChatContext.Provider value={{ isChatPresent, setIsChatPresent }}>
            <ChatIdContext.Provider value={{ chatId, setChatId }}>
              <MessagesContext.Provider value={{ messages, setMessages }}>
                <Toaster />
                <ChatScreen />
              </MessagesContext.Provider>
            </ChatIdContext.Provider>
          </ChatContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </TooltipProvider>
  );
}
