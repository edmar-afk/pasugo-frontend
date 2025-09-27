import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { Drawer, IconButton } from "@mui/material";
import api from "../assets/api";
import { getUserInfoFromToken } from "../utils/auth";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import HailIcon from "@mui/icons-material/Hail";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
export default function Sidebar() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const adminMenuItems = [
    { label: "Home", path: "/admin-home", icon: <HomeIcon fontSize="small" /> },
    {
      label: "Clients",
      path: "/client-lists",
      icon: <PeopleIcon fontSize="small" />,
    },
    {
      label: "Transportation Services",
      path: "/transport-services",
      icon: <TwoWheelerIcon fontSize="small" />,
    },
    {
      label: "Deliveries",
      path: "/services",
      icon: <DeliveryDiningIcon fontSize="small" />,
    },
    {
      label: "Products",
      path: "/products",
      icon: <FastfoodIcon fontSize="small" />,
    },
    {
      label: "Payments",
      path: "/services",
      icon: <AccountBalanceWalletIcon fontSize="small" />,
    },
    {
      label: "Transaction Records",
      path: "/transactions",
      icon: <PointOfSaleIcon fontSize="small" />,
    },
  ];

  const ownerMenuItems = [
    {
      label: "Owner Home",
      path: "/admin-home",
      icon: <HomeIcon fontSize="small" />,
    },
    {
      label: "Orders",
      path: "/owner-orders",
      icon: <PendingActionsIcon fontSize="small" />,
    },
    {
      label: "Riders",
      path: "/rider-lists",
      icon: <PeopleIcon fontSize="small" />,
    },
  ];

  const riderMenuItems = [
    {
      label: "Rider Home",
      path: "/rider-home",
      icon: <HomeIcon fontSize="small" />,
    },
    {
      label: "Transport Passengers",
      path: "/rider-transports",
      icon: <TwoWheelerIcon fontSize="small" />,
    },
    {
      label: "Transactions",
      path: "/rider-transactions",
      icon: <AccountBalanceWalletIcon fontSize="small" />,
    },
  ];

  const courierMenuItems = [
    {
      label: "Courier Home",
      path: "/courier-home",
      icon: <HomeIcon fontSize="small" />,
    },
    {
      label: "My Deliveries",
      path: "/courier-deliveries",
      icon: <DeliveryDiningIcon fontSize="small" />,
    },
    {
      label: "Earnings",
      path: "/courier-earnings",
      icon: <AccountBalanceWalletIcon fontSize="small" />,
    },
  ];

  const customerMenuItems = [
    {
      label: "Home",
      path: "/customer-home",
      icon: <HomeIcon fontSize="small" />,
    },
    {
      label: "My Orders",
      path: "/customer-deliveries",
      icon: <DeliveryDiningIcon fontSize="small" />,
    },
    {
      label: "Transportation",
      path: "/customer-transportation",
      icon: <HailIcon fontSize="small" />,
    },
    {
      label: "Payments History",
      path: "/customer-payments",
      icon: <AccountBalanceWalletIcon fontSize="small" />,
    },
  ];

  const getMenuItems = () => {
    const role = userData?.role?.toLowerCase();
    if (role === "admin") return adminMenuItems;
    if (role === "owner") return ownerMenuItems;
    if (role === "rider") return riderMenuItems;
    if (role === "courier") return courierMenuItems;
    if (role === "customer") return customerMenuItems;
    return [];
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    if (token) {
      const decoded = getUserInfoFromToken(token);
      if (decoded?.id) {
        api
          .get(`/api/profile/${decoded.id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setUserData(res.data))
          .catch((err) => {
            console.error("Failed to fetch profile:", err);
            if (storedUserData) setUserData(JSON.parse(storedUserData));
          });
      }
    } else if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <aside>
      <div className="top-4 left-4 z-[999999]">
        <div
          onClick={() => setOpen(true)}
          className="bg-white rounded-full shadow-lg p-2"
        >
          <MenuIcon className="text-gray-700" fontSize="small" />
        </div>
      </div>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div className="w-64 h-full bg-white flex flex-col p-4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-semibold">Pasugo ni Boss Chok</p>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon className="text-gray-700" />
            </IconButton>
          </div>

          {getMenuItems().map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl p-3 text-left transition-colors ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}

          <div className="mt-auto pt-4 border-t border-gray-300 flex flex-row items-center">
            {userData?.profile_picture ? (
              <img
                src={`${BASE_URL}${userData.profile_picture}`}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <AccountCircleIcon fontSize="large" />
            )}
            <div className="flex flex-col items-start ml-2">
              <p className="text-gray-600 text-sm mt-1 truncate">
                {userData ? userData.first_name : "Loading..."}
              </p>
              <p className="text-gray-500 text-[10px]">
                {userData?.role || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </Drawer>
    </aside>
  );
}
