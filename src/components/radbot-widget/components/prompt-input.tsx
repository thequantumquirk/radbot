"use client";

import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { SendHorizonal } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Loader from "../ui/loader";
import { MessageType } from "@/types/MessageType";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { MessagesContext } from "../providers/messages-provider";
import { ChatIdContext } from "../providers/chatid-provider";
import { ChatContext } from "../providers/chat-provider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

export default function PromptInput() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const { setMessages } = useContext(MessagesContext);
  const { chatId } = useContext(ChatIdContext);
  const { isChatPresent, setIsChatPresent } = useContext(ChatContext);

  const handlePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleChatPresenceChange = (val: boolean) => {
    setIsChatPresent(val);
  };

  const insertMessage = (text: string, role: "user" | "assistant") => {
    const message: MessageType = {
      id: crypto.randomUUID(),
      role,
      content: text,
    };
    setMessages((prev: any) => {
      const updatedChatResponse = prev ? [...prev, message] : [message];
      localStorage.setItem(chatId, JSON.stringify(updatedChatResponse));
      return updatedChatResponse;
    });
    if (role === "user") {
      setPrompt("");
    }
  };

  const renderMarkdown = async (markdown: string) => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(markdown);

    return String(file);
  };

  const sendReqQuery = useMutation({
    mutationFn: async (input_prompt: string) => {
      handleChatPresenceChange(true);
      insertMessage(input_prompt, "user");
      const { data } = await axios.post(
        "https://api.gooey.ai/v2/video-bots/?example_id=ehsu8hb8",
        {
          input_prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOOEY_KEY}`,
          },
        }
      );
      return data;
    },
    onSuccess: async (data) => {
      let message = await renderMarkdown(data.output.output_text[0]);
      insertMessage(message, "assistant");
    },
    onError: (error) => {
      if (error) {
        toast({
          title: "An error occured.",
        });
      }
    },
  });

  useEffect(() => {
    if (chatId) {
      let savedMessages = localStorage.getItem(chatId);
      if (savedMessages && savedMessages?.length > 0) {
        handleChatPresenceChange(true);
        setMessages(JSON.parse(savedMessages));
      } else {
        handleChatPresenceChange(false);
        setMessages([]);
      }
    }
  }, [chatId]);

  return (
    <>
      <div className="flex gap-2 items-center">
        <Input
          className="w-64"
          placeholder="Enter your Prompt"
          value={prompt}
          onChange={handlePrompt}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !sendReqQuery.isPending && prompt) {
              sendReqQuery.mutate(prompt);
            }
          }}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() =>
                !sendReqQuery.isPending && prompt && sendReqQuery.mutate(prompt)
              }
            >
              {sendReqQuery.isPending ? <Loader /> : <SendHorizonal />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {sendReqQuery.isPending
              ? "Please wait till we fetch your query"
              : "Send your Query"}
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}
