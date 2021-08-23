import { createContext, useState } from "react";

const ConversationContext = createContext();

const ConversationProvider = ({ children }) => {
  const [currentConversation, setCurrentConversation] = useState({});
  const [friends, setFriends] = useState([]);
  const [currentMembers, setCurrentMembers] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const clearProfiles = () => {
    setCurrentProfile({});
  };
  const checkOnlineUser = (id) => {
    return onlineUsers?.some((u) => u.userId === id);
  };
  return (
    <ConversationContext.Provider
      value={{
        currentConversation,
        setCurrentConversation,
        friends,
        setFriends,
        currentMembers,
        setCurrentMembers,
        currentProfile,
        setCurrentProfile,
        clearProfiles,
        onlineUsers,
        setOnlineUsers,
        checkOnlineUser,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export { ConversationContext, ConversationProvider };
