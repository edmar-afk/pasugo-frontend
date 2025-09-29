import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function ChatLists() {
  const [chatUsers, setChatUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData")); // your logged-in user
  const userId = userData?.id;

  useEffect(() => {
    if (userId) {
      api
        .get(`/api/chat/users/${userId}/`)
        .then((res) => setChatUsers(res.data))
        .catch((err) => console.error(err));
    }
  }, [userId]);

  return (
    <div className="divide-y divide-white/5">
      {chatUsers.map((user) => (
        <Link to={`/room/${userId}/${user.id}`} key={user.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              src={logo}
              alt={user.first_name}
              className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-800">
                {user.first_name}
              </p>
              <p className=" truncate text-xs/5 text-gray-400">
                {user.username}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-white">Chat User</p>
            <p className="mt-1 text-xs/5 text-gray-400">Active</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChatLists;
