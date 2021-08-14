import React from "react";
import MainProfile from "../components/mainProfile/MainProfile";
import s from "../Global.module.css";

const Home = () => {
  return (
    <div className={s.container}>
      <MainProfile />
    </div>
  );
};

export default Home;
