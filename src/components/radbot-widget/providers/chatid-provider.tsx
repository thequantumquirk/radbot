import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

type ChatIdContextType = {
  chatId: string;
  setChatId: Dispatch<SetStateAction<string>>;
};

export const ChatIdContext = createContext<ChatIdContextType>({
  chatId: "",
  setChatId: () => {},
});

const ChatIdProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [chatId, setChatId] = useState("");

  return (
    <ChatIdContext.Provider value={{ chatId, setChatId }}>
      {children}
    </ChatIdContext.Provider>
  );
};

export default ChatIdProvider;
