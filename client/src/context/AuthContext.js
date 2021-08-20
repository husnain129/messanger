import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/UserSlice";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const {
    user: { token },
  } = useSelector(userSelector);

  const [user, setUserContext] = useState(
    (typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : "") || ""
  );
  const [_token, setToken] = useState(user.token || token);

  const [profile, setProfile] = useState();
  return (
    <AuthContext.Provider
      value={{
        _token,
        setToken,
        user,
        setUserContext,
        profile,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
