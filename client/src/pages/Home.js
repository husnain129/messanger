import React from "react";
import MainProfile from "../components/mainProfile/MainProfile";
import Sidebar from "../components/sidebar/Sidebar";
import s from "../Global.module.css";

const Home = () => {
  return (
    <div className={s.layout}>
      <Sidebar />
      <MainProfile />
    </div>
  );
};

export default Home;
