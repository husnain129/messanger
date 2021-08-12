import React from "react";
import { IconContext } from "react-icons";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import s from "./Profile.module.css";
const Profile = () => {
  return (
    <div className={s.profile}>
      <div className={s.cross}>
        <IconContext.Provider value={{ color: "black" }}>
          <ImCross style={{ margin: "20px" }} />
        </IconContext.Provider>
      </div>
      <div className={s.imgContainer}>
        <img
          src="https://wallpaperaccess.com/full/275931.jpg"
          alt="emma"
          className={s.img}
        />
        <div className={s.imgDot} />
      </div>
      <div className={s.Profile_info}>
        <p className={s.Profile_info__title}>Tobias Williams</p>
        <p className={s.Profile_info__city}>Paris, Farance</p>
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
          Phone:<span>+92 308 701 1212</span>
        </p>
        <p>
          Email:<span>mlhlk1212@gmail.com</span>
        </p>
        <p>
          DOB:<span>17.09.1998</span>
        </p>
      </div>
      <div className={s.line} />
      <div className={s.mediaContainer}>
        <p>Media</p>
        <div className={s.mediaImage}>
          <img
            src="https://c4.wallpaperflare.com/wallpaper/498/446/357/emma-watson-tie-actress-hermione-granger-wallpaper-preview.jpg"
            alt="emma watson"
          />
          <img
            src="https://c4.wallpaperflare.com/wallpaper/970/674/568/emma-watson-actress-bracelets-necklace-wallpaper-preview.jpg"
            alt="emma watson"
          />
          <img
            src="https://c4.wallpaperflare.com/wallpaper/735/37/159/emma-watson-actress-women-celebrity-wallpaper-preview.jpg"
            alt="emma watson"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
