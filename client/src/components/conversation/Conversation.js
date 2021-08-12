import React from "react";
import { IconContext } from "react-icons";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import s from "./Conversation.module.css";
import Card from "./conversationCard/Card";
const Conversation = () => {
  return (
    <div className={s.container}>
      <div className={s.searchContainer}>
        <div className={s.search}>
          <IconContext.Provider value={{ className: s.icons }}>
            <FiSearch />
          </IconContext.Provider>
          <input
            type="text"
            placeholder="Enter for search....."
            className={s.input}
          />
        </div>
      </div>
      <div className={s.listContainer}>
        <div className={s.list}>
          <div className={s.l_left}>
            <p style={{ color: "rgb(131, 121, 121)" }}>Sorted by</p>
            <p className={s.l_left__latest}>
              Latest First{" "}
              <IconContext.Provider value={{}}>
                <FiChevronDown />
              </IconContext.Provider>
            </p>
          </div>
          <div className={s.l_right}>
            <p style={{ color: "#fff" }}>Add New</p>
            <div className={s.l_right__plus}>
              <HiPlus />
            </div>
          </div>
        </div>
      </div>
      <div className={s.card}>
        <Card />
        <Card active={true} />
        <Card />
      </div>
    </div>
  );
};

export default Conversation;
