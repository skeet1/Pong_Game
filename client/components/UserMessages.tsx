import { ChangeEvent, FC, useEffect, useState, useContext, FormEvent } from "react";
import { BiWinkSmile } from "react-icons/bi";
import SendIcon from "../app/assets/send.png";
import { StaticImageData } from "next/image";
import ChatBoxHeader from "./ChatBoxHeader";
import SenderMessage from "./SenderMessage";
import skeet from "../app/assets/man-avatar-1632965.jpg";
import io, { Socket } from "socket.io-client";
import RecieverMessage from "./RecieverMessage";
interface MessageProp {
  senderAvatar: StaticImageData;
  recieverAvatar: StaticImageData;
  socket: Socket;
}
// const socket = io("http://localhost:5000");

const UserMessages: FC<MessageProp> = ({ senderAvatar, recieverAvatar, socket}) => {
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState<any>([]);
  const [Mounted, setMounted] = useState(false);

  const subscribeMessage = (msg: any) => {
    setMessages((prev: any) => [...prev, msg]); // Append the new message
  };

  function handleOnEnter(text: string) {
    console.log("enter", text);
  }

  const handleSubmitNewMessage = (e: SubmitEvent | FormEvent) => {
    e.preventDefault();
    console.log("in submit");

    socket.emit("message", { data: message });
  };

  useEffect(() => {
    socket?.on("message", (data: any) => {
      subscribeMessage(data);
    });
  }, []);

  const textSaver = (e: ChangeEvent) => {
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
          {messages.map((msg: any, index: number) => (
            <SenderMessage key={index} image={senderAvatar} text={msg.data} />
          ))}
        </div>
        <form className="form-container" onSubmit={(e) => handleSubmitNewMessage(e)}>
          <input
            type="text"
            placeholder="type you message... "
            onChange={(e) => textSaver(e)
            }
          />
          <button
            className="send-conatainer"
            type="submit"
            onClick={(e) => handleSubmitNewMessage(e)}
          >
            <img src={SendIcon.src} alt="Send" />
          </button>
        </form>
      </div>
    </>
  );
};

export default UserMessages;
