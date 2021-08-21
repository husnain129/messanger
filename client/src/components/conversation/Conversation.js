import axios from "axios";
import React, { useContext, useEffect } from "react";
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

  const getProfile = async (c) => {
    let friendId = c?.members.find((i) => i !== user._id);
    try {
      const { data } = await axios.get(
        `http://localhost:3300/api/v1/profile/${friendId}`
      );
      setCurrentMembers(c);
      setCurrentConversation(data.profile);
    } catch (error) {
      console.log("error = ", error);
    }
  };
  useEffect(() => {
    if (friends.length === 0) {
      console.log("asdlldjalsjdlaksjdljl");
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
  friends && console.log("friend = ", friends);

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
            <div onClick={() => getProfile(c.member)}>
              <Card conversation={c.data.profile} key={id} active={true} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Conversation;
