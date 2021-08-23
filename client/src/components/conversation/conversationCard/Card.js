import React, { useContext, useState } from "react";
import { ConversationContext } from "../../../context/ConversationContext";
import s from "./Card.module.css";
const Card = ({ select, conversation, id }) => {
  const [profile, setProfile] = useState(conversation);
  const { checkOnlineUser } = useContext(ConversationContext);

  const ss = {
    bg: "#2B2F4D",
    title: "#FBFDFF",
    text: "#bdbec4",
    status: "#a5a9bd",
  };

  return (
    <div className={s.container}>
      <div
        className={s.card}
        style={{ backgroundColor: select === id && ss.bg }}
      >
        <div className={s.cardHeader}>
          <div className={s.titleContainer}>
            <div className={s.imgContainer}>
              <img src={profile?.image} alt="emma" className={s.img} />
              <div
                className={s.imgDot}
                style={{
                  borderColor: select === id && "#2B2F4D",
                  backgroundColor: checkOnlineUser(profile?.user._id)
                    ? "#2fdb5d"
                    : "#757c70",
                }}
              />
            </div>
            <div className={s.userName}>
              <p
                className={s.title}
                style={{ color: select === id && ss.title }}
              >
                {profile?.firstName} {profile?.lastName}
              </p>
              <p
                className={s.status}
                style={{ color: select === id && ss.status }}
              >
                {checkOnlineUser(profile?.user._id) ? "online" : "Offline"}
              </p>
            </div>
          </div>
          <p className={s.time} style={{ color: select === id && ss.status }}>
            {checkOnlineUser(profile?.user._id) ? "now" : "3h ago"}
          </p>
        </div>
        {/* <div className={s.cardFooter}>
          <p className={s.msg} style={{ color: select === id && ss.text }}>
            Analysis of foreign experience, as it is commo...
          </p>
          <p className={s.totalMsg}>2</p>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
