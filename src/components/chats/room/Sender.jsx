import { useEffect, useState } from "react";
import api from "../../../assets/api";
import logo from "../../../assets/images/logo.png";

function formatTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years}y ${months % 12}m ${days % 30}d ago`;
  } else if (months > 0) {
    return `${months}m ${days % 30}d ago`;
  } else if (days > 0) {
    return `${days}d ${hours % 24}h ago`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m ago`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s ago`;
  } else {
    return `${seconds}s ago`;
  }
}

function Sender({ message }) {
  const [profile, setProfile] = useState(null);
  //console.log("profilepic of Sender", profile);
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      const fetchProfile = async () => {
        try {
          const res = await api.get(`/api/profile/${parsed.id}/`);
          setProfile(res.data);
        } catch (err) {
          console.error("Error fetching sender profile:", err);
        }
      };
      fetchProfile();
    }
  }, []);

  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="sender avatar"
            src={
              profile?.profile_picture
                ? `${api.defaults.baseURL}${profile.profile_picture}`
                : logo
            }
            className="object-cover"
          />
        </div>
      </div>
      <div className="chat-header text-gray-500">
        You •
        <time className="text-xs opacity-50 text-gray-500">
          {formatTimeAgo(message.timestamp)}
        </time>
      </div>
      <div className="chat-bubble bg-orange-700 break-words">
        {message.content}
      </div>
    </div>
  );
}

export default Sender;
