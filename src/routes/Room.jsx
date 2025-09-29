import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/chats/room/Header";
import Receiver from "../components/chats/room/Receiver";
import Sender from "../components/chats/room/Sender";
import Send from "../components/chats/room/Send";
import api from "../assets/api";

function Room() {
  const { currentUserId, userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [localUserId, setLocalUserId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setLocalUserId(parsed.id);
    }
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/api/chat/${currentUserId}/${userId}/`);
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleSend = async (content) => {
    try {
      const res = await api.post(`/api/chat/${currentUserId}/${userId}/`, {
        sender_id: localUserId,
        content,
      });
      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    if (localUserId) {
      fetchMessages();
    }
  }, [currentUserId, userId, localUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Header />
      <div className="mt-24 px-4 mb-20 overflow-y-auto h-[calc(100vh-160px)]">
        {messages.map((msg) =>
          String(msg.sender_id) === String(localUserId) ? (
            <Sender key={msg.id} message={msg} />
          ) : (
            <Receiver key={msg.id} message={msg} />
          )
        )}
        <div ref={bottomRef} />
      </div>
      <Send onSend={handleSend} />
    </>
  );
}

export default Room;
