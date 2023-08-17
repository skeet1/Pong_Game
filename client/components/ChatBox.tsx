"use client";
import Rigor from "../app/assets//Rigor.png";
import Skeet from "../app/assets/man-avatar-1632965.jpg";
import SendIcon from "../app/assets/send.png";
import "../app/chat/styles/Chat.scss";
import InputEmoji from "emoji-picker-react";
import MessageBox from "./MessageBox";
import { ChangeEvent, useState } from "react";
import { BiWinkSmile } from "react-icons/bi";
import UserMessages from "./UserMessages";

const ChatBox = ({ user }: any) => {
  return (
    <div className="chatbox-container">
      {user === "" ? (
        <div className="No-message">
          <h1>Chose a convertation from the left or create a new chat</h1>
        </div>
      ) : (
        <UserMessages senderAvatar={Skeet} recieverAvatar={Rigor} />
      )}
    </div>
  );
};

export default ChatBox;
