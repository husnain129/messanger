import React, { useState } from "react";
import { IconContext } from "react-icons";
import { RiSendPlaneFill } from "react-icons/ri";
import Header from "./header/Header";
import s from "./Messages.module.css";

const Messages = () => {
  const [active, setActive] = useState(true);
  return (
    <div className={s.messages}>
      <Header active={true} />
      <div className={s.messages__content}>
        <Message active={active} />
        <Message active={false} />
        <Message active={true} />
        <Message active={false} />
        <Message active={true} />
        <Message active={false} />
        <Message active={false} />
        <Message active={active} />
        <Message active={false} />
      </div>
      <div className={s.inputContainer}>
        <div className={s.input}>
          <input
            type="text"
            placeholder="Type a message here...."
            className={s.input_msg}
          />
          <IconContext.Provider value={{ className: s.icons }}>
            <RiSendPlaneFill size={24} />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

const Message = ({ active }) => {
  return (
    <div className={`${s.msg}  ${active && s.own}`}>
      <p className={`${s.msgVal} ${active && s.msgOwn}`}>Hi Alex What's Up?</p>
      <p className={s.msgTime}>Yesterday 14:26 PM</p>
    </div>
  );
};

export default Messages;
