import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { AuthContext } from "../../../context/AuthContext";
import { ConversationContext } from "../../../context/ConversationContext";
import { StyleContext } from "../../../context/StyleContext";
import s from "./Header.module.css";
const Header = ({ active }) => {
  const { currentConversation, checkOnlineUser, friends } =
    useContext(ConversationContext);
  const { messagesWidth, setMessagesWidth } = useContext(StyleContext);
  const [profile, setProfile] = useState(currentConversation);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (friends.length !== 0 && user) {
      if (Object.keys(profile).length === 0 && profile.constructor === Object) {
        let friendId = friends[0]?.member.members.find((i) => i !== user._id);
        (async () => {
          const { data } = await axios.get(
            `http://localhost:3300/api/v1/profile/${friendId}`
          );
          setProfile(data.profile);
        })();
      }
    }
  }, [friends]);
  useEffect(() => {
    setProfile(currentConversation);
  }, [currentConversation]);
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.header_left}>
          <div className={s.imgContainer}>
            <img src={profile?.image} alt="." className={s.img} />
            {profile && (
              <div
                className={s.imgDot}
                style={{
                  backgroundColor: checkOnlineUser(profile?.user?._id)
                    ? "#2fdb5d"
                    : "#757c70",
                }}
              />
            )}
          </div>
          <div className={s.userInfo}>
            <p className={s.title}>
              {profile?.firstName} {profile?.lastName}
            </p>
            <p className={s.status}>
              {checkOnlineUser(profile?.user?._id)
                ? "online"
                : "Offline . Last Seen 3 hours ago"}
            </p>
          </div>
        </div>
        <div className={s.header_right}>
          <IconContext.Provider value={{ className: s.icons }}>
            {messagesWidth ? (
              <>
                <HiLockClosed
                  size={26}
                  onClick={() => setMessagesWidth(!messagesWidth)}
                />
              </>
            ) : (
              <>
                <HiLockOpen
                  size={26}
                  onClick={() => setMessagesWidth(!messagesWidth)}
                />
              </>
            )}
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Header;
