import { StaticImageData } from "next/image";
import { FC } from "react";

interface MessageProp {
  image: StaticImageData;
  text: string;
}

const SenderMessage: FC<MessageProp> = ({ image, text }) => {
  return (
    <div className="user-container-right">
      <img src={image.src} alt="image" />
      <div className="message-info-right">
        <p>{text}</p>
        <span>12:00</span>
      </div>
    </div>
  );
};

export default SenderMessage;
