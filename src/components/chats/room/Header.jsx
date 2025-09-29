import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import api from "../../../assets/api";
import logo from "../../../assets/images/logo.png";

function Header() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/profile/${userId}/`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [userId]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg p-4 flex items-center gap-3 shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full bg-gray-500 hover:bg-gray-300 transition"
      >
        <ArrowBackIosIcon fontSize="small" className="ml-1 -mr-1" />
      </button>

      <img
        alt="header avatar"
        src={
          profile?.profile_picture
            ? `${api.defaults.baseURL}${profile.profile_picture}`
            : logo
        }
        className="object-cover w-12 h-12 rounded-full"
      />

      <p className="font-semibold text-lg text-gray-800">
        {profile?.first_name || "User"}
      </p>
    </div>
  );
}

export default Header;
