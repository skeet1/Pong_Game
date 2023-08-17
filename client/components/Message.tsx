import { FC } from "react";
import avatar from "../app/assets/man-avatar-1632965.jpg";
import "../app/chat/styles/Chat.scss";
interface messagepProp {
  onClick: () => void;
}

const Message = () => {
  return (
    <>
      <div className="user-card">
        <div className="ellipse"></div>
        <img
          src={avatar.src}
          alt="Avatar"
          style={{
            width: "32.421px",
            height: "39.443px",
            borderRadius: "39.443px",
          }}
        />
        <div className="user-info">
          <h1>Skeet</h1>
          <h2>In match making</h2>
        </div>
        <div className="time-wrapper">
          <h3>5min</h3>
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet</p>
      <div className="rectangle"></div>
    </>
  );
};

export default Message;
