import React, { useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import api from "../../assets/api";
import TransportMapModal from "../modals/TransportMapModal";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import ConfirmTransactionModal from "../modals/ConfirmTransactionModal";
import { Link } from "react-router-dom";

function TransportationCard() {
  const [transportations, setTransportations] = useState([]);
  const [riderIds, setRiderIds] = useState({}); // store riderId per item

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.id;

  useEffect(() => {
    if (userData?.id) {
      api
        .get(`/api/transportations/${userData.id}/`)
        .then((res) => {
          setTransportations(res.data);

          // fetch rider ids for each transport item
          res.data.forEach(async (item) => {
            if (item.rider) {
              try {
                const response = await api.get(`/api/chat-user/${item.rider}/`);
                if (response.data && response.data.length > 0) {
                  setRiderIds((prev) => ({
                    ...prev,
                    [item.id]: response.data[0].id,
                  }));
                }
              } catch (err) {
                console.error("Failed to fetch rider id:", err);
              }
            }
          });
        })
        .catch((err) => {
          console.error("Error fetching transportations:", err);
        });
    }
  }, [userData?.id]);

  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "border-orange-500 bg-orange-50";
      case "Rejected":
        return "border-red-500 bg-red-50";
      case "Arrived":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getTextClasses = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-500";
      case "Rejected":
        return "text-red-500";
      case "Arrived":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="flex flex-col p-2 mb-30">
      {transportations.map((item) => (
        <div
          key={item.id}
          className={`p-4 mb-4 border-2 rounded-lg shadow-md text-gray-800 ${getStatusClasses(
            item.status
          )}`}
        >
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold">Transport Request</p>
            <p className="font-bold text-xs">
              {item.price ? `₱ ${item.price}` : "Payment not yet issued"}
            </p>
          </div>

          <div className="flex flex-row items-center justify-between">
            {riderIds[item.id] ? (
              <Link
                to={`/room/${userId}/${riderIds[item.id]}`}
                className="py-3 text-sm flex items-center gap-1 text-blue-600 hover:underline"
              >
                <TwoWheelerIcon fontSize="small" className="text-gray-500" />
                {item.rider}
              </Link>
            ) : (
              <p className="py-3 text-sm flex items-center gap-1">
                <TwoWheelerIcon fontSize="small" className="text-gray-500" />
                {item.rider ? item.rider : "No Rider Yet"}
              </p>
            )}

            <div className="flex flex-row items-center text-xs text-blue-500 cursor-pointer">
              <span className="mt-1 ml-1">
                <TransportMapModal transportId={item.id} />
              </span>
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center border border-gray-400 w-fit py-0.5 px-2 text-xs rounded-xl bg-gray-200">
              <GroupIcon fontSize="small" className="text-gray-500" />
              <span className="mt-1 ml-1">
                {item.passenger} Passenger{item.passenger > 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <div
                className={`flex flex-row items-center text-xs font-bold ${getTextClasses(
                  item.status
                )}`}
              >
                <span className="ml-1">{item.status}</span>
              </div>
              <div className="text-xs flex flex-row items-center">
                {item.date_requested &&
                  new Date(item.date_requested).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
              </div>
            </div>
          </div>

          {item.status === "Arrived" && (
            <div className="mt-4">
              {item.price && (
                <p className="text-green-600 font-semibold text-xs">
                  Payment Submitted
                </p>
              )}
            </div>
          )}

          {item.status === "Pending" && item.price && (
            <div className="mt-4">
              <p className="text-yellow-600 font-semibold text-xs">
                Awaiting confirmation
              </p>
            </div>
          )}

          {!item.price && (
            <div className="mt-4">
              <ConfirmTransactionModal transportId={item.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TransportationCard;
