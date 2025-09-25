import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import Map from "./Map";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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

function TransportCard({ transport }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (transport.customer) {
      api
        .get(`/api/profile/${transport.customer}/`)
        .then((res) => setProfile(res.data))
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
    <div className="w-[300px] h-[350px] flex-shrink-0 p-2">
      <div className="h-full flex flex-col justify-between hover:bg-gray-900 hover:text-white transition duration-300 rounded overflow-hidden shadow-md">
        <div className="pt-4 px-4 flex-1 flex flex-col">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center">
              {profile && (
                <img
                  src={`${api.defaults.baseURL}${profile.profile_picture}`}
                  className="rounded-full h-8 w-8"
                  alt="profile"
                />
              )}
              <p className="text-sm font-semibold text-gray-800 ml-2 truncate">
                {profile ? profile.first_name : "Loading..."}
              </p>
            </div>

            <span
              className={`text-xs font-bold ${getStatusColor(
                transport.status
              )}`}
            >
              {transport.status}
            </span>
          </div>
          <span className="text-xs text-gray-500 my-4">
            Requested {formatTimeAgo(transport.date_requested)}
          </span>

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
          </p>{" "}
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
