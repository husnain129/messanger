import { createContext, useState } from "react";

const StyleContext = createContext();

const StyleProvider = ({ children }) => {
  const [messagesWidth, setMessagesWidth] = useState(false);
  return (
    <StyleContext.Provider value={{ messagesWidth, setMessagesWidth }}>
      {children}
    </StyleContext.Provider>
  );
};

export { StyleContext, StyleProvider };
