import "../app/chat/styles/Chat.scss";


interface MsgNotificationProp {
  number: number;
}

const MsgNotification: React.FC<MsgNotificationProp> = ({ number }) => {
  const textStyle: React.CSSProperties = {
    color: "#FFF",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  };

  const InboxStyle: React.CSSProperties = {
    height: "19px",
    borderRadius: "100px",
    background: "#361E65",
    color: "#999",
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    textAlign: "center",
    padding: "5px 10px",
    width: "auto",
  };

  return (
    <div className="notification-wrapper">
      <div className="inbox-wrapper" style={textStyle}>
        <h1>Inbox</h1>
        <div className="notification" style={InboxStyle}>
          {number > 0 ? number + " New messages" : "No meessage"}
        </div>
      </div>
      <div
        className="input-search"
        style={{ padding: "0",  margin:"0 0 0"}}
      >
        <form>
          <input type="search" placeholder="Search." />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default MsgNotification;
