import React from "react";
import logo from "../assets/images/logo.png";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Links } from "react-router-dom";
import Sidebar from "./Sidebar";
function Header() {
  return (
    <div className="flex flex-row p-4 items-center justify-between">
      <div className="flex items-center">
        <img src={logo} className="w-12" alt="" />
        <p className="font-extrabold text-3xl ml-2 text-orange-200">Pasugo</p>
      </div>
      <div className="flex gap-3 flex-row items-center">
        <Sidebar/>
        <Link to={'/chats'} className="bg-gray-100 p-2 rounded-full text-gray-800 shadow-lg">
          <MessageIcon fontSize="small" />
        </Link>
        <Link to={'/logout'} className="bg-gray-100 p-2 rounded-full text-red-700 shadow-lg">
          <LogoutIcon fontSize="small" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
