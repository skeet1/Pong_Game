import { StaticImageData } from "next/image";
import { FC } from "react";

interface MessageProp {
  image: StaticImageData;
  text: string;
}

const RecieverMessage: FC<MessageProp> = ({ image, text }) => {
  return (
    <div className="user-container-left">
      <img src={image?.src} alt="image" />
      <div className="message-info-left">
        <p>{text}</p>
        <span>12:00</span>
      </div>
    </div>
  );
};

export default RecieverMessage;