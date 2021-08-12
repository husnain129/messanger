import React from "react";
import { IconContext } from "react-icons";
import { FiMoreHorizontal } from "react-icons/fi";
import s from "./Header.module.css";
const Header = ({ active }) => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.header_left}>
          <div className={s.imgContainer}>
            <img
              src="https://wallpaperaccess.com/full/275931.jpg"
              alt="emma"
              className={s.img}
            />
            <div className={s.imgDot} />
          </div>
          <div className={s.userInfo}>
            <p className={s.title}>Tobias Williams</p>
            {active ? (
              <p className={s.status}>Online</p>
            ) : (
              <p className={s.status}>Offline . Last Seen 3 hours ago</p>
            )}
          </div>
        </div>
        <div className={s.header_right}>
          <IconContext.Provider value={{ className: s.icons }}>
            <FiMoreHorizontal size={26} />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Header;
