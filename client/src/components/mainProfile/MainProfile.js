import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { ConversationContext } from "../../context/ConversationContext";
import {
  clearState,
  getProfile,
  profileSelector,
} from "../../redux/ProfileSlice";
import s from "./MainProfile.module.css";
const MainProfile = ({ history }) => {
  const { user } = useContext(AuthContext);
  const { profile, isSuccess, isError, errorMessage, isFetching } =
    useSelector(profileSelector);
  const { currentProfile } = useContext(ConversationContext);

  const dispatch = useDispatch();
  const [data, setDate] = useState();
  const { id } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile(user._id || id));
    }
  }, [history, user]);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
    }
    if (isSuccess) {
      dispatch(clearState());
    }
    setDate(profile);
    if (
      currentProfile &&
      Object.keys(currentProfile).length !== 0 &&
      currentProfile.constructor === Object
    )
      setDate(currentProfile);
  }, [isError, isSuccess, dispatch]);

  return (
    <div className={s.container}>
      <div className={s.profile}>
        <div className={s.imgContainer}>
          {data && <img src={data.image} alt="emma" className={s.img} />}
          <div className={s.imgDot} />
        </div>
        <div className={s.Profile_info}>
          {data && (
            <>
              <p className={s.Profile_info__title}>
                {data.firstName} {data.lastName}
              </p>
              <p className={s.Profile_info__city}>
                {data.city}, {data.country}
              </p>
              <p className={s.Profile_info__desc}>
                How people to build website and apps + grow awareness in social
                media.
              </p>
            </>
          )}
          <div className={s.iconContainer}>
            <IconContext.Provider
              value={{
                className: `${s.icon} ${s.fb}`,
              }}
            >
              <FaFacebookF size={20} />
            </IconContext.Provider>
            <IconContext.Provider
              value={{ className: `${s.icon} ${s.twitter}` }}
            >
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
        {data && (
          <div className={s.contact}>
            <p>
              Phone:<span>{data.phone}</span>
            </p>
            <p>
              Email:<span>{user.email}</span>
            </p>
            <p>
              DOB:<span>{data.dob}</span>
            </p>
          </div>
        )}
        <div className={s.line} />
        <div className={s.mediaContainer}>
          <p>Media</p>
          <div className={s.mediaImage}>
            {data &&
              data?.gallery.map((i, e) => (
                <img keys={e} src={i} alt="emma watson" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
