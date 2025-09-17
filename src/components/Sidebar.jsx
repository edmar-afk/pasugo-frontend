import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton } from "@mui/material";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      label: "Home",
      path: "/admin-home",
      icon: <HomeIcon fontSize="small" />,
    },
    {
      label: "Clients",
      path: "/clients",
      icon: <AccountBalanceWalletIcon fontSize="small" />,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <SettingsIcon fontSize="small" />,
    },
    {
      label: "Services",
      path: "/services",
      icon: <AccountCircleIcon fontSize="small" />,
    },
    {
      label: "Transaction Records",
      path: "/transactions",
      icon: <AccountCircleIcon fontSize="small" />,
    },
  ];

  return (
    <aside>
      <div className="top-4 left-4 z-50">
        <IconButton
          onClick={() => setOpen(true)}
          className="bg-gray-100 rounded-full shadow-lg"
        >
          <MenuIcon className="text-gray-700" fontSize="small" />
        </IconButton>
      </div>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div className="w-64 h-full bg-white flex flex-col p-4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-semibold">Pasugo ni Boss Chok</p>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon className="text-gray-700" />
            </IconButton>
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => (
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
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-gray-300 flex flex-row items-center">
            <AccountCircleIcon />
            <p className="text-gray-600 text-sm mt-1 ml-2 truncate">
              User Name
            </p>
          </div>
        </div>
      </Drawer>
    </aside>
  );
}
