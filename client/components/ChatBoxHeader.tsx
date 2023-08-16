import { StaticImageData } from "next/image";
import { FC } from "react";

interface chatBoxHeaderpProps {
    username: string
    status: string
    senderAvatar: StaticImageData
}


const ChatBoxHeader : FC<chatBoxHeaderpProps>= ({username , status, senderAvatar}) =>
{
    return (
        <div className="chatbox-wrapper">
        <div className="card-wrapper">
          <img
            src={senderAvatar?.src}
            alt="user"
            style={{
              width: "32.421px",
              height: "39.443px",
              borderRadius: "39.443px",
            }}
          />
          <div className="user-card">
            <h1>{username}r</h1>
            <h2>{status}</h2>
          </div>
        </div>
      </div>
    );
}

export default ChatBoxHeader;