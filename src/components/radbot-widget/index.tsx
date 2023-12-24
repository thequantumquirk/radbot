"use client";
import { Button } from "@/components/radbot-widget/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/radbot-widget/ui/dialog";
import { MessageType } from "@/types/MessageType";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="absolute bottom-5 right-5">
                      <MessageCircle />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bottom-5 right-0 p-0 rounded-lg md:right-5 h-[70vh] translate-x-0 translate-y-[-30%]">
                    <ChatScreen />
                  </DialogContent>
                </Dialog>
              </MessagesContext.Provider>
            </ChatIdContext.Provider>
          </ChatContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </TooltipProvider>
  );
}
