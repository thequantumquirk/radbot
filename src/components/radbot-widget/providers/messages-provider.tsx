import { MessageType } from "@/types/MessageType";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

type ChatIdContextType = {
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
};

export const MessagesContext = createContext<ChatIdContextType>({
  messages: [],
  setMessages: () => {},
});

const MessagesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
