import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    (typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : "") || ""
  );
  const [token, setToken] = useState(user.token || "");
  const [profile, setProfile] = useState();

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, profile, setProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
