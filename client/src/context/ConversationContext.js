import { createContext, useState } from "react";

const ConversationContext = createContext();

const ConversationProvider = ({ children }) => {
  const [currentConversation, setCurrentConversation] = useState({});
  const [friends, setFriends] = useState([]);
  const [currentMembers, setCurrentMembers] = useState([]);
  return (
    <ConversationContext.Provider
      value={{
        currentConversation,
        setCurrentConversation,
        friends,
        setFriends,
        currentMembers,
        setCurrentMembers,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export { ConversationContext, ConversationProvider };
