import React from "react";
import Conversation from "../components/conversation/Conversation";
import Messages from "../components/messages/Messages";
import Profile from "../components/profile/Profile";
import s from "../Global.module.css";

const Messanger = () => {
  return (
    <div className={`${s.container} ${s.messanger}`}>
      <Conversation />
      <Messages />
      <Profile />
    </div>
  );
};

export default Messanger;
