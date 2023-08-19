"use client"
import HeaderContent from "@/components/HeaderContent";
import "./styles/Chat.scss";
import MsgNotification from "@/components/MsgNotification";
import Search from "@/components/Search";
import Message from "@/components/Message";
import ChatBox from "@/components/ChatBox";
import UserCardInfo from "@/components/UserCardInfo";
import io from "socket.io-client";
import { useCallback, useState } from "react";

const socket = io("http://localhost:5000");

const Chat = () => {

  const [slectedChat, setSelectedChat] = useState(false);
  
  const onClickCard = () =>
  {
    console.log("value is " + slectedChat);
    slectedChat === false ? setSelectedChat(true) : setSelectedChat(false);
  }
  return (
    <main>
      <div className="chat-text">Chat</div>
        <div className="container-holder">
          <div className="left-side">
            <div className="second-wrapper">
              <MsgNotification number={2} />
            </div>
            <div className="messages">
            <div className="message-wrapper" onClick={onClickCard}>
              <Message />
            </div>
            <div className="message-wrapper" onClick={onClickCard}>
              <Message />
            </div>
            <div className="message-wrapper" onClick={onClickCard}>
              <Message />
            </div>
            <div className="message-wrapper" onClick={onClickCard}>
              <Message />
            </div>
            <div className="message-wrapper" onClick={onClickCard}>
              <Message />
            </div>
            {/* message conponenty */}
            </div>
          </div>
          {slectedChat ? (<ChatBox user={"aaa"} userSocket={socket}/>) : (<ChatBox user={""} userSocket={socket}/>) }
          
      </div>
    </main>
  );
};

export default Chat;