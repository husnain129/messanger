import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "../components/conversation/Conversation";
import Messages from "../components/messages/Messages";
import Profile from "../components/profile/Profile";
import { AuthContext } from "../context/AuthContext";
import s from "../Global.module.css";
import { getOthersProfile, profileSelector } from "../redux/ProfileSlice";

const Messanger = ({ history }) => {
  const { user } = useContext(AuthContext);
  const { profiles } = useSelector(profileSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOthersProfile(user.id));
  }, [history]);

  return (
    <div className={`${s.container} ${s.messanger}`}>
      <Conversation />
      <Messages />
      <Profile />
    </div>
  );
};

export default Messanger;
