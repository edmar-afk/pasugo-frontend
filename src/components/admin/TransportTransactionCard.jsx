import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

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

  if (years > 0) return `${years}y ${months % 12}m ${days % 30}d ago`;
  if (months > 0) return `${months}m ${days % 30}d ago`;
  if (days > 0) return `${days}d ${hours % 24}h ago`;
  if (hours > 0) return `${hours}h ${minutes % 60}min ago`;
  if (minutes > 0) return `${minutes}min ago`;
  return `${seconds}s ago`;
}

function TransportTransactionCard() {
  const [transports, setTransports] = useState([]);
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await api.get("/api/transportations/arrived/");
        setTransports(response.data);

        // fetch profiles for each customer (user_id)
        response.data.forEach(async (t) => {
          if (t.customer && !profiles[t.customer]) {
            try {
              const profileRes = await api.get(`/api/profile/${t.customer}/`);
              setProfiles((prev) => ({
                ...prev,
                [t.customer]: profileRes.data,
              }));
            } catch (err) {
              console.error("Error fetching profile:", err);
            }
          }
        });
      } catch (error) {
        console.error("Error fetching transports:", error);
      }
    };
    fetchTransports();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-2">
      <div className="flow-root">
        <ul className="-mb-8">
          {transports.length > 0 ? (
            transports.map((transport, index) => (
              <li key={transport.id}>
                <div className="relative pb-8">
                  {index !== transports.length - 1 && (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div>
                      <div className="relative px-1">
                        <div className="h-8 w-8 bg-orange-500 rounded-full ring-8 ring-white flex items-center justify-center">
                          <DirectionsBikeIcon fontSize="small" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-0">
                      <div className="text-md text-gray-500">
                        <div className="mb-2">
                          <span className="font-medium text-gray-900 mr-2 text-lg">
                            {profiles[transport.customer]?.first_name || "Loading..."}
                          </span>

                          <span className="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                            <div className="absolute flex-shrink-0 flex items-center justify-center">
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-green-500"
                                aria-hidden="true"
                              ></span>
                            </div>
                            <div className="ml-3.5 font-sm text-gray-900">
                              {transport.status}
                            </div>
                          </span>
                        </div>
                        <span className="whitespace-nowrap text-sm">
                          {new Date(
                            transport.date_requested
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          -{" "}
                          {new Date(transport.date_requested)
                            .toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .toLowerCase()}
                        </span>
                      </div>
                      <div className="mt-2 text-gray-700">
                        <div>
                          <p className="text-sm">
                            Arrived at their destination{" "}
                            <b>{formatTimeAgo(transport.date_requested)}</b>
                          </p>
                          <p className="text-sm mt-1">
                            Price: ₱
                            <b className="ml-1">
                              {Number(transport.price).toLocaleString()}
                            </b>
                          </p>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">
              No arrived transports yet.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TransportTransactionCard;
