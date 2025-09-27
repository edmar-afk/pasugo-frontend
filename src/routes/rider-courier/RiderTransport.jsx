import React, { useEffect, useState } from "react";
import TransportCard from "../../components/riders/TransportCard";
import api from "../../assets/api";
import Header from "../../components/Header";

function RiderTransport() {
  const [transports, setTransports] = useState([]);
  const [filter, setFilter] = useState("Arrived"); // ✅ default filter
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const fetchTransports = () => {
    api
      .get("/api/transports/")
      .then((res) => {
        setTransports(res.data);
      })
      .catch((err) => {
        console.error("Error fetching transports:", err);
      });
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const filteredTransports = transports.filter((transport) => {
    const isRiderMatch = transport.rider === storedUserData?.first_name;
    const isStatusMatch = filter ? transport.status === filter : true;
    if (isRiderMatch && isStatusMatch) {
      //console.log("Filter rider matched with status:", transport.rider, transport.status);
    }
    return isRiderMatch && isStatusMatch;
  });

  return (
    <div className="mb-24">
      <Header />
      <div className="flex flex-col items-center justify-center pb-4 mt-24">
        {/* Filter tabs */}
        <div className="text-gray-800 font-bold text-xs flex flex-row items-center mb-3 gap-4">
          <button
            className={`${
              filter === "Arrived" ? "text-green-600 underline" : ""
            }`}
            onClick={() => setFilter("Arrived")}
          >
            Arrived
          </button>
          |
          <button
            className={`${
              filter === "Pending" ? "text-orange-500 underline" : ""
            }`}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>
          |
          <button
            className={`${
              filter === "Cancelled" ? "text-red-600 underline" : ""
            }`}
            onClick={() => setFilter("Cancelled")}
          >
            Cancelled
          </button>
        </div>

        {filteredTransports.map((transport) => (
          <TransportCard
            key={transport.id}
            transport={transport}
            isRider={true}
            onRefresh={fetchTransports}
          />
        ))}
      </div>
    </div>
  );
}

export default RiderTransport;
