import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { RiSendPlaneFill } from "react-icons/ri";
import { io } from "socket.io-client";
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
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentMembers._id,
    };
    const receiverId = currentMembers.members.find((m) => m.id !== user?._id);
    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });
    try {
      const { data } = await axios.post(
        "http://localhost:3300/api/v1/messages",
        message
      );
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data?.text,
        createdAt: Date.now(),
      });
    });
    if (arrivalMessage) {
      socket.current.on("getMessage");
    }
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentMembers.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentMembers]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log("users", users);
    });
  }, [user]);

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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            <div
              key={index}
              ref={scrollRef}
              style={{
                width: "100%",
                display: "flex",
                align: "center",
                justifyContent: "center",
              }}
            >
              <Message msg={msg} key={index} active={msg.sender === user._id} />
            </div>
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
    <div className={` ${s.msg} ${active && s.own}`}>
      <p className={`${s.msgVal} ${active && s.msgOwn}`}>{msg?.text}</p>
      <p className={s.msgTime}>{format(msg.createdAt)}</p>
    </div>
  );
};

export default Messages;
