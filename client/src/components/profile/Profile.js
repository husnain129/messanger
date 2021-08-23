import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ConversationContext } from "../../context/ConversationContext";
import { StyleContext } from "../../context/StyleContext";
import s from "./Profile.module.css";
const Profile = ({ history }) => {
  const { currentConversation, setCurrentProfile } =
    useContext(ConversationContext);
  const { messagesWidth } = useContext(StyleContext);
  const [dis, setDis] = useState("none");

  useEffect(() => {
    messagesWidth
      ? setDis("none")
      : setTimeout(() => {
          setDis("flex");
        }, 300);
  }, [messagesWidth]);

  useEffect(() => {
    setDis("flex");
  }, [history]);

  return (
    <div
      className={s.profile}
      style={{
        width: messagesWidth && "0%",
        display: dis,
      }}
    >
      <div className={s.imgContainer}>
        <img src={currentConversation?.image} alt="emma" className={s.img} />
        <div className={s.imgDot} />
      </div>
      <div className={s.Profile_info}>
        <Link
          to="/"
          className={s.Profile_info__title}
          onClick={() => setCurrentProfile(currentConversation)}
        >
          <p>
            {currentConversation?.firstName} {currentConversation?.lastName}
          </p>
        </Link>
        <p className={s.Profile_info__city}>
          {currentConversation?.city}, {currentConversation?.country}
        </p>
        <p className={s.Profile_info__desc}>
          How people to build website and apps + grow awareness in social media.
        </p>
        <div className={s.iconContainer}>
          <IconContext.Provider
            value={{
              className: `${s.icon} ${s.fb}`,
            }}
          >
            <FaFacebookF size={20} />
          </IconContext.Provider>
          <IconContext.Provider value={{ className: `${s.icon} ${s.twitter}` }}>
            <AiOutlineTwitter size={20} />
          </IconContext.Provider>
          <IconContext.Provider
            value={{ className: `${s.icon} ${s.instagram}` }}
          >
            <AiFillInstagram size={20} />
          </IconContext.Provider>
        </div>
      </div>
      <div className={s.line} />
      <div className={s.contact}>
        <p>
          Phone:<span>{currentConversation?.phone}</span>
        </p>
        <p>
          Email:<span>mlhlk1212@gmail.com</span>
        </p>
        <p>
          DOB:<span>{currentConversation?.dob}</span>
        </p>
      </div>
      <div className={s.line} />
      <div className={s.mediaContainer}>
        <p>Media</p>
        <div className={s.mediaImage}>
          {currentConversation?.gallery?.map((image, i) => (
            <img key={i} src={image} alt="emma watson" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
