import HeaderContent from "@/components/HeaderContent";
import "./styles/Chat.scss";
import MsgNotification from "@/components/MsgNotification";
import Search from "@/components/Search";
import Message from "@/components/Message";
import ChatBox from "@/components/ChatBox";
import UserCardInfo from "@/components/UserCardInfo";

const Chat = () => {
  return (
    <main>
      {/* <HeaderContent Button="+ chat" /> */}
      <div className="chat-text">Chat</div>
        <div className="container-holder">
          <div className="left-side">
            <div className="second-wrapper">
              <MsgNotification number={2} />
            </div>
            <div className="messages">
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
          </div>
          <ChatBox user={null}/>
      </div>
    </main>
  );
};

export default Chat;