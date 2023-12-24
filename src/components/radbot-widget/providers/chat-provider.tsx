import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

type ChatContextType = {
  isChatPresent: boolean;
  setIsChatPresent: Dispatch<SetStateAction<boolean>>;
};

export const ChatContext = createContext<ChatContextType>({
  isChatPresent: false,
  setIsChatPresent: () => {},
});

const ChatProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatPresent, setIsChatPresent] = useState(false);

  return (
    <ChatContext.Provider value={{ isChatPresent, setIsChatPresent }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
