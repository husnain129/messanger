import { createContext, useState } from "react";

const ConversationContext = createContext();

const ConversationProvider = ({ children }) => {
  const [currentConversation, setCurrentConversation] = useState({});
  return (
    <ConversationContext.Provider
      value={{ currentConversation, setCurrentConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export { ConversationContext, ConversationProvider };
