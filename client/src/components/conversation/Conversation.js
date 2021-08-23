import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { AuthContext } from "../../context/AuthContext";
import { ConversationContext } from "../../context/ConversationContext";
import s from "./Conversation.module.css";
import Card from "./conversationCard/Card";
const Conversation = ({ conversation }) => {
  const { setCurrentConversation, setCurrentMembers, friends, setFriends } =
    useContext(ConversationContext);
  const { user } = useContext(AuthContext);
  const [select, setSelect] = useState(0);

  const getProfile = async (c) => {
    let friendId = c?.members.find((i) => i !== user._id);
    try {
      const { data } = await axios.get(
        `http://localhost:3300/api/v1/profile/${friendId}`
      );
      setCurrentMembers(c);
      return data;
    } catch (error) {
      console.log("error = ", error);
    }
  };
  useEffect(() => {
    if (friends.length === 0) {
      conversation.forEach((c) => {
        let friendId = c?.members.find((i) => i !== user._id);
        (async () => {
          const { data } = await axios.get(
            `http://localhost:3300/api/v1/profile/${friendId}`
          );
          setFriends((prev) => [...prev, { data, member: c }]);
        })();
      });
    }
    getProfile(conversation[0]);
  }, [conversation]);

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
        {friends &&
          friends.map((c, id) => (
            <div
              key={id}
              onClick={() => {
                getProfile(c.member);
                setSelect(friends.indexOf(c));
                setCurrentConversation(c.data.profile);
              }}
            >
              <Card
                key={id}
                id={id}
                select={select}
                conversation={c.data.profile}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Conversation;
