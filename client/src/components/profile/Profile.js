import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ConversationContext } from "../../context/ConversationContext";
import { StyleContext } from "../../context/StyleContext";
import s from "./Profile.module.css";
const Profile = ({ history }) => {
  const { currentConversation, friends, checkOnlineUser, setCurrentProfile } =
    useContext(ConversationContext);
  const { messagesWidth } = useContext(StyleContext);
  const [dis, setDis] = useState("none");
  const [profile, setProfile] = useState(currentConversation);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    messagesWidth
      ? setDis("none")
      : setTimeout(() => {
          setDis("flex");
        }, 300);
  }, [messagesWidth]);

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
    <div
      className={s.profile}
      style={{
        width: messagesWidth && "0%",
        display: dis,
      }}
    >
      <div className={s.imgContainer}>
        <img src={profile?.image} alt="emma" className={s.img} />
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
      <div className={s.Profile_info}>
        <Link
          to="/"
          className={s.Profile_info__title}
          onClick={() => setCurrentProfile(currentConversation)}
        >
          <p>
            {profile?.firstName} {profile?.lastName}
          </p>
        </Link>
        <p className={s.Profile_info__city}>
          {profile?.city}, {profile?.country}
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
          Phone:<span>{profile?.phone}</span>
        </p>
        <p>
          Email:<span>mlhlk1212@gmail.com</span>
        </p>
        <p>
          DOB:<span>{profile?.dob}</span>
        </p>
      </div>
      <div className={s.line} />
      <div className={s.mediaContainer}>
        <p>Media</p>
        <div className={s.mediaImage}>
          {profile?.gallery?.map((image, i) => (
            <img key={i} src={image} alt="emma watson" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
