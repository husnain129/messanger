import React from "react";
import Conversation from "../components/conversation/Conversation";
import Messages from "../components/messages/Messages";
import Sidebar from "../components/sidebar/Sidebar";
import s from "../Global.module.css";

const Messanger = () => {
  return (
    <div className={s.messanger}>
      <Sidebar />
      <Conversation />
      <Messages />
    </div>
  );
};

export default Messanger;
