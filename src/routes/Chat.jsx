import Header from "../components/Header";
import ChatLists from "../components/chats/ChatLists";
function Chat() {
  return (
    <>
      <Header />
      <div className="mt-24 px-4">
        <p className="text-gray-800 font-bold text-2xl p-4">Messages</p>
        <ChatLists />
      </div>
    </>
  );
}

export default Chat;
