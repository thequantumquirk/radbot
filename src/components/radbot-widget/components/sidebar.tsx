"use client";
import {
  Check,
  Menu,
  MessagesSquare,
  Pencil,
  Plus,
  Trash,
  X,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogHeader,
} from "../ui/dialog";
import { ChatType } from "@/types/ChatType";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ThemeToggle } from "../ui/theme-toggle";
import { ChatIdContext } from "../providers/chatid-provider";

const ChatbotSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState<ChatType[] | []>([]);
  const [renameChatId, setRenameChatId] = useState<string>("");
  const [chatName, setChatName] = useState<string>("");
  const { chatId, setChatId } = useContext(ChatIdContext);

  const handleOpenSidebar = () => setIsOpen(true);
  const handleCloseSidebar = () => setIsOpen(false);
  const handleChatRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  };

  const renameChat = (id: string) => {
    if (chatName) {
      setChats((prevChats: any) => {
        const updatedChats = prevChats.map((chat: any) => {
          if (chat.key === id) {
            chat.name = chatName;
          }
          return chat;
        });
        localStorage.setItem("savedChats", JSON.stringify(updatedChats));
        return updatedChats;
      });
    }
    setRenameChatId("");
  };

  const createChat = () => {
    let newChat = {
      key: crypto.randomUUID(),
      name: "New Chat",
    };
    if (chats) {
      setChats((prev: any) => {
        const updatedChats = [...prev, newChat];
        localStorage.setItem("savedChats", JSON.stringify(updatedChats));
        return updatedChats;
      });
    } else {
      setChats([newChat]);
      localStorage.setItem("savedChats", JSON.stringify([newChat]));
    }
    updateChatId(newChat.key);
  };

  const updateChatId = (id: string) => {
    setChatId(id);
  };

  const deleteChat = (id: string) => {
    setChats((prevChats: any) => {
      const updatedChats = prevChats.filter((chat: any) => chat.key !== id);
      localStorage.setItem("savedChats", JSON.stringify(updatedChats));
      return updatedChats;
    });
  };

  useEffect(() => {
    let savedChats = localStorage.getItem("savedChats");
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    } else if (chats.length === 0) {
      let newChat = {
        key: crypto.randomUUID(),
        name: "New Chat",
      };
      setChats([newChat]);
      localStorage.setItem("savedChats", JSON.stringify([newChat]));
    }
    if (chats.length > 0 && !chatId) {
      setChatId(chats[0].key);
    }
  }, [chats.length]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseSidebar();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const renderSidebar = () => (
    <div
      className={`${
        !isOpen ? "left-[-30rem]" : "left-0 backdrop-blur-sm w-full"
      } absolute top-0 transition-all h-full duration-300 rounded-lg ease-in-out`}
    >
      <div className="relative h-full w-80 lg:w-96 bg-secondary rounded-lg p-4">
        <div className="flex gap-1">
          <Button
            className="flex gap-2 items-center justify-center w-full"
            onClick={createChat}
          >
            <Plus />
            Create New Chat
          </Button>
          <ThemeToggle />
        </div>
        {chats && (
          <>
            <p className="font-bold my-1">Your chats</p>
            <div className="flex flex-col gap-2 my-2 w-full h-[92vh] overflow-y-scroll">
              {chats.map((chat: ChatType) => (
                <div
                  className="flex items-center justify-between gap-2 rounded-lg bg-background px-6 py-4"
                  key={chat.key}
                >
                  {renameChatId !== chat.key ? (
                    <button
                      className="w-full flex gap-2"
                      onClick={() => updateChatId(chat.key)}
                    >
                      <MessagesSquare />
                      <span>{chat.name}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div>
                        <MessagesSquare />
                      </div>
                      <Input
                        defaultValue={chat.name}
                        onChange={handleChatRename}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            renameChat(chat.key);
                          }
                        }}
                      />
                      <button onClick={() => renameChat(chat.key)}>
                        <Check />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-4 items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="flex justify-end"
                          onClick={() => setRenameChatId(chat.key)}
                        >
                          <Pencil
                            size={20}
                            className="opacity-50 hover:opacity-100 transition-all"
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Rename the Chat Instance</TooltipContent>
                    </Tooltip>
                    <Dialog>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <button disabled={chats.length <= 1}>
                              <Trash
                                size={20}
                                className={`${
                                  chats.length <= 1
                                    ? "opacity-25"
                                    : "opacity-50 hover:opacity-100 transition-all"
                                }`}
                              />
                            </button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        {chats.length > 1 && (
                          <TooltipContent>
                            <p>Delete the Chat Instance</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                      <DialogContent>
                        <DialogHeader>
                          <h2>Do you want to delete the Chat?</h2>
                        </DialogHeader>
                        <DialogFooter>
                          <div className="flex gap-2">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                No
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                onClick={() => deleteChat(chat.key)}
                                type="button"
                              >
                                Yes
                              </Button>
                            </DialogClose>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="absolute top-5 p-3 h-8 right-[-3.5rem]"
              onClick={handleCloseSidebar}
            >
              <X size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Close the Sidebar</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <>
      <div>
        {!isOpen && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`absolute top-5 left-5 p-3 h-8`}
                onClick={handleOpenSidebar}
              >
                <Menu size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open the Sidebar</TooltipContent>
          </Tooltip>
        )}
        {renderSidebar()}
      </div>
    </>
  );
};

export default ChatbotSidebar;
