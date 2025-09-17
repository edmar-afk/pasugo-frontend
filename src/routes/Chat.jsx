import React from "react";
import Body from "../components/chats/Body";
import Receiver from "../components/chats/Receiver";
import Sender from "../components/chats/Sender";
import Header from "../components/chats/Header";
import Send from "../components/chats/Send";
function Chat() {
  return (
    <>
      <Header />
      <div className="mt-24 px-4">
        <Receiver />
        <Sender />
      </div>
      <Send/>
    </>
  );
}

export default Chat;
