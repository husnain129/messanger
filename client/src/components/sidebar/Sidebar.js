import React from "react";
import { IconContext } from "react-icons";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BsFillInboxFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { profileSelector } from "../../redux/ProfileSlice";
import s from "./Sidebar.module.css";
const Sidebar = () => {
  const { profile } = useSelector(profileSelector);
  return (
    <div className={s.sidebar}>
      <div className={s.container}>
        <div className={s.imgContainer}>
          {profile && <img src={profile?.image} alt="emma" className={s.img} />}
          <div className={s.imgDot} />
        </div>
        <div className={s.iconContainer}>
          <IconContext.Provider value={{ className: s.icons }}>
            <Link to="/">
              <AiFillHome size={27} />
            </Link>
          </IconContext.Provider>
          <IconContext.Provider
            value={{ className: s.icons }}
          ></IconContext.Provider>
          <IconContext.Provider value={{ className: s.icons }}>
            <Link to="messanger">
              <BsFillInboxFill size={27} />
            </Link>
          </IconContext.Provider>
          <IconContext.Provider value={{ className: s.icons }}>
            <Link to="/editProfile">
              <AiFillSetting size={27} />
            </Link>
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
