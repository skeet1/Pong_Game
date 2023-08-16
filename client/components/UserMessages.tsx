import { ChangeEvent, FC, useState } from "react";
import { BiWinkSmile } from "react-icons/bi";
import SendIcon from "../app/assets/send.png";
import { StaticImageData } from "next/image";
import ChatBoxHeader from "./ChatBoxHeader";
import SenderMessage from "./SenderMessage";
import skeet from "../app/assets/man-avatar-1632965.jpg";
import io from "socket.io-client";
import RecieverMessage from "./RecieverMessage";
interface MessageProp {
  senderAvatar: StaticImageData;
  recieverAvatar: StaticImageData;
}
// const socket = io("http://localhost:5000");

const UserMessages: FC<MessageProp> = ({ senderAvatar, recieverAvatar }) => {
  const [message, setMessage] = useState("");

  function handleOnEnter(text: string) {
    console.log("enter", text);
  }

  const Style = {
    position: "absolute",
    bottom: "0",
    left: "0",
    resize: "none",
    boxSizing: "border-box",
    height: "auto",
    width: "550px",
    border: "1px solid #14003D",
    borderRadius: "7px",
    background: "#2C2C2C",
    margin: "4% 5%",
    overflow: "hidden",
  };

  // const handleSubmitMessage = () => {
  //   socket.emit("message", { data: message });
  // };

  // socket.on("message", (data: any) => {
  //   handleMessage(data);
  // });

  const handleMessage = (data: any) => {
    // messag
  };

  const textSaver = (e: ChangeEvent) => {
    console.log("im heree");

    setMessage(e.target.value);
    console.log(message);
  };

  return (
    <>
      <ChatBoxHeader
        username="rigor"
        status="in match"
        senderAvatar={senderAvatar}
      />
      <div className="message-box">
        <div className="message-holder">
          <SenderMessage image={senderAvatar} text="hello Rigor" />
          <RecieverMessage
            image={recieverAvatar}
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum omnis adipisci aperiam voluptatibus aliquid placeat libero maxime velit modi tempore nihil nobis fugit officia facere exercitationem, distinctio fugiat vero?"
          />
          <RecieverMessage
            image={recieverAvatar}
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum omnis adipisci aperiam voluptatibus aliquid placeat libero maxime velit modi tempore nihil nobis fugit officia facere exercitationem, distinctio fugiat vero?"
          />
          <RecieverMessage
            image={recieverAvatar}
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum omnis adipisci aperiam voluptatibus aliquid placeat libero maxime velit modi tempore nihil nobis fugit officia facere exercitationem, distinctio fugiat vero?"
          />
          <SenderMessage image={senderAvatar} text="hello Rigor" />
          <RecieverMessage
            image={recieverAvatar}
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum omnis adipisci aperiam voluptatibus aliquid placeat libero maxime velit modi tempore nihil nobis fugit officia facere exercitationem, distinctio fugiat vero?"
          />
          <RecieverMessage
            image={recieverAvatar}
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum omnis adipisci aperiam voluptatibus aliquid placeat libero maxime velit modi tempore nihil nobis fugit officia facere exercitationem, distinctio fugiat vero?"
          />
          <RecieverMessage
            image={recieverAvatar}
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum omnis adipisci aperiam voluptatibus aliquid placeat libero maxime velit modi tempore nihil nobis fugit officia facere exercitationem, distinctio fugiat vero?"
          />
          <SenderMessage image={senderAvatar} text="hello Rigor" />
          <SenderMessage image={senderAvatar} text="hello Rigor" />
          <SenderMessage image={senderAvatar} text="hello Rigor" />
          <SenderMessage image={senderAvatar} text="hello Rigor" />
          <RecieverMessage
            image={recieverAvatar}
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laborum omnis adipisci aperiam voluptatibus aliquid placeat libero maxime velit modi tempore nihil nobis fugit officia facere exercitationem, distinctio fugiat vero?"
          />
        </div>
        <div className="form-container">
          <input
            type="text"
            placeholder="type you message... "
            onChange={(e) => textSaver(e)}
          />
          <button
            className="send-conatainer"
            type="submit"
            onClick={() => console.log("text is =>" + message)}
          >
            <img src={SendIcon.src} alt="Send" />
          </button>
        </div>
      </div>
    </>
  );
};

export default UserMessages;
