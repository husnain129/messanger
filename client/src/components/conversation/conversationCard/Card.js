import React from "react";
import s from "./Card.module.css";
const Card = ({ active }) => {
  const ss = {
    bg: "#2B2F4D",
    title: "#FBFDFF",
    text: "#bdbec4",
    status: "#81869c",
  };
  return (
    <div className={s.container}>
      <div className={s.card} style={{ backgroundColor: active && ss.bg }}>
        <div className={s.cardHeader}>
          <div className={s.titleContainer}>
            <div className={s.imgContainer}>
              <img
                src="https://wallpaperaccess.com/full/275931.jpg"
                alt="emma"
                className={s.img}
              />
              <div
                className={s.imgDot}
                style={{ borderColor: active && "#2B2F4D" }}
              />
            </div>
            <div className={s.userName}>
              <p className={s.title} style={{ color: active && ss.title }}>
                Emma Watson
              </p>
              <p className={s.status} style={{ color: active && ss.status }}>
                Online
              </p>
            </div>
          </div>
          <p className={s.time} style={{ color: active && ss.status }}>
            3h ago
          </p>
        </div>
        <div className={s.cardFooter}>
          <p className={s.msg} style={{ color: active && ss.text }}>
            Analysis of foreign experience, as it is commo...
          </p>
          <p className={s.totalMsg}>2</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
