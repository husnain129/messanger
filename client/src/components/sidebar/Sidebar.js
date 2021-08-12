import React from "react";
import { IconContext } from "react-icons";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BsFillInboxFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";
import s from "./Sidebar.module.css";
const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <div className={s.container}>
        <div className={s.imgContainer}>
          <img
            src="https://wallpaperaccess.com/full/275931.jpg"
            alt="emma"
            className={s.img}
          />
          <div className={s.imgDot} />
        </div>
        <div className={s.iconContainer}>
          <IconContext.Provider value={{ className: s.icons }}>
            <AiFillHome size={27} />
          </IconContext.Provider>
          <IconContext.Provider
            value={{ className: s.icons }}
          ></IconContext.Provider>
          <IconContext.Provider value={{ className: s.icons }}>
            <BsFillInboxFill size={27} />
          </IconContext.Provider>
          <IconContext.Provider value={{ className: s.icons }}>
            <AiFillSetting size={27} />
          </IconContext.Provider>
        </div>
        <div className={s.switchContainer}>
          <IconContext.Provider value={{ className: s.icons }}>
            <IoSunny size={27} />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
