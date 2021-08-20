import React, { useContext } from "react";
import { IconContext } from "react-icons";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { useSelector } from "react-redux";
import { StyleContext } from "../../../context/StyleContext";
import { profileSelector } from "../../../redux/ProfileSlice";
import s from "./Header.module.css";
const Header = ({ active }) => {
  const { profiles } = useSelector(profileSelector);

  const { messagesWidth, setMessagesWidth } = useContext(StyleContext);
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.header_left}>
          <div className={s.imgContainer}>
            <img src={profiles[0]?.image} alt="." className={s.img} />
            <div className={s.imgDot} />
          </div>
          <div className={s.userInfo}>
            <p className={s.title}>
              {profiles[0]?.firstName} {profiles[0]?.lastName}
            </p>
            {active ? (
              <p className={s.status}>Online</p>
            ) : (
              <p className={s.status}>Offline . Last Seen 3 hours ago</p>
            )}
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
