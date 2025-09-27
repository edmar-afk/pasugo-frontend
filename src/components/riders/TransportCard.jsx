import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import Map from "./Map";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignRiderModal from "../modals/AssignRiderModal";
import ViewConfirmPaymentModal from "../modals/ViewConfirmPaymentModal";

function formatTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  let diff = Math.floor((now - past) / 1000);

  const months = Math.floor(diff / (60 * 60 * 24 * 30));
  diff -= months * 60 * 60 * 24 * 30;
  const days = Math.floor(diff / (60 * 60 * 24));
  diff -= days * 60 * 60 * 24;
  const hours = Math.floor(diff / (60 * 60));
  diff -= hours * 60 * 60;
  const minutes = Math.floor(diff / 60);

  let result = "";
  if (months > 0) result += `${months}M `;
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0 && months === 0) result += `${minutes}m `;

  return result.trim() + " ago";
}

function TransportCard({ transport, onRefresh, isRider }) {
  const [customerProfile, setCustomerProfile] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get userData from localStorage
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);

      // Fetch full profile of logged-in user to also get role
      api
        .get(`/api/profile/${parsedUser.id}/`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err));
    }

    // Fetch transport customer profile separately
    if (transport.customer) {
      api
        .get(`/api/profile/${transport.customer}/`)
        .then((res) => setCustomerProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, [transport.customer]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Arrived":
        return "text-green-600";
      case "Pending":
        return "text-orange-500";
      case "Cancelled":
        return "text-red-600";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="w-[350px] h-[380px] flex-shrink-0 p-2">
      <div className="h-full flex flex-col justify-between hover:bg-gray-900 hover:text-white transition duration-300 rounded overflow-hidden shadow-md">
        <div className="pt-4 px-4 flex-1 flex flex-col">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center mb-3">
              {customerProfile && (
                <img
                  src={`${api.defaults.baseURL}${customerProfile.profile_picture}`}
                  className="rounded-full h-12 w-12 object-cover"
                  alt="profile"
                />
              )}
              <div className="flex flex-col items-start ml-2">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {customerProfile
                    ? customerProfile.first_name
                    : `Customer #${transport.customer}`}
                </p>
                <span className="text-xs text-gray-500">
                  Requested {formatTimeAgo(transport.date_requested)}
                </span>
              </div>
            </div>

            <span
              className={`text-xs font-bold ${getStatusColor(
                transport.status
              )}`}
            >
              {transport.status}
            </span>
          </div>

          <div className="flex flex-row items-center justify-between mb-2">
            {isRider ? (
              <div className="text-green-600 text-xs font-semibold flex flex-row items-center justify-between w-full">
                <ViewConfirmPaymentModal
                  transportId={transport.id}
                  onRefresh={onRefresh}
                />
                <p className="text-gray-800 font-extrabold">
                  ₱ {Number(transport.price).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-xs font-light">
                Rider: {transport.rider ? transport.rider : "No Rider Assigned"}
              </p>
            )}

            {userData?.role === "Admin" &&
              transport.status !== "Arrived" &&
              transport.status !== "Cancelled" && (
                <div className="text-xs text-blue-500 font-bold flex flex-row items-center justify-end">
                  <AssignmentIcon fontSize="small" />
                  <p className="mt-0.5">
                    <AssignRiderModal
                      id={transport.id}
                      role={"Rider"}
                      onSuccess={onRefresh}
                    />
                    {/* ✅ call refresh after save */}
                  </p>
                </div>
              )}
          </div>

          <Map
            currentLocation={transport.current_location}
            destination={transport.destination}
          />
        </div>

        <p className="text-gray-800 px-4 mb-3 text-xs font-light italic">
          {transport.message && transport.message.trim() !== ""
            ? transport.message
            : "No extra address"}
        </p>

        <div className="flex flex-row items-center justify-between px-2 py-2 border-t text-gray-800 text-xs">
          <p className="text-xs">
            <LocationOnIcon fontSize="small" className="text-red-500" />
            Destination
          </p>
          <p className="text-xs">
            <LocationOnIcon fontSize="small" className="text-blue-500" />{" "}
            Customer's Location
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransportCard;
