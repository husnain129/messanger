import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { RiSendPlaneFill } from "react-icons/ri";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { ConversationContext } from "../../context/ConversationContext";
import { StyleContext } from "../../context/StyleContext";
import Header from "./header/Header";
import s from "./Messages.module.css";

const Messages = () => {
  const { user } = useContext(AuthContext);
  const { messagesWidth } = useContext(StyleContext);
  const { currentMembers } = useContext(ConversationContext);
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState("");
  console.log("currentConversation", currentMembers);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentMembers._id,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:3300/api/v1/messages",
        message
      );
      setMessages([...messages, data]);
      setNewMessage("");
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3300/api/v1/messages/${currentMembers._id}`
        );
        if (data) {
          setMessages(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentMembers]);

  return (
    <div
      className={s.messages}
      style={{
        width: messagesWidth && "70%",
      }}
    >
      <Header active={true} />
      <div className={s.messages__content}>
        {messages &&
          messages.map((msg, index) => (
            <Message msg={msg} active={msg.sender === user._id} />
          ))}
      </div>
      <div className={s.inputContainer}>
        <div className={s.input}>
          <input
            type="text"
            placeholder="Type a message here...."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={s.input_msg}
          />
          <IconContext.Provider value={{ className: s.icons }}>
            <RiSendPlaneFill size={24} onClick={handleSubmit} />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

const Message = ({ msg, active }) => {
  return (
    <div className={`${s.msg}  ${active && s.own}`}>
      <p className={`${s.msgVal} ${active && s.msgOwn}`}>{msg?.text}</p>
      <p className={s.msgTime}>{format(msg.createdAt)}</p>
    </div>
  );
};

export default Messages;
