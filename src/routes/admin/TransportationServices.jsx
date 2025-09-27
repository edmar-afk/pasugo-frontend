import React, { useEffect, useState, useCallback } from "react";
import Header from "../../components/Header";
import TransportCard from "../../components/riders/TransportCard";
import api from "../../assets/api";

function TransportationServices() {
  const [transports, setTransports] = useState([]);
  const [filter, setFilter] = useState("Arrived");

  const fetchTransports = useCallback(() => {
    api
      .get("/api/transports/")
      .then((res) => setTransports(res.data))
      .catch((err) => console.error("Error fetching transports:", err));
  }, []);

  useEffect(() => {
    fetchTransports();
  }, [fetchTransports]);

  const filteredTransports = transports.filter((t) => t.status === filter);

  return (
    <>
      <Header />

      <div className="mt-24 flex flex-col items-center">
        {/* Filter tabs */}
        <div className="text-gray-800 font-bold text-xs flex flex-row items-center mb-3 gap-4">
          <button
            className={`${filter === "Arrived" ? "text-green-600 underline" : ""}`}
            onClick={() => setFilter("Arrived")}
          >
            Arrived
          </button>
          |
          <button
            className={`${filter === "Pending" ? "text-orange-500 underline" : ""}`}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>
          |
          <button
            className={`${filter === "Cancelled" ? "text-red-600 underline" : ""}`}
            onClick={() => setFilter("Cancelled")}
          >
            Cancelled
          </button>
        </div>

        {/* Filtered cards */}
        {filteredTransports.length > 0 ? (
          filteredTransports.map((transport) => (
            <TransportCard
              key={transport.id}
              transport={transport}
              onRefresh={fetchTransports}  // ✅ pass refresh down
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No transports found</p>
        )}
      </div>
    </>
  );
}

export default TransportationServices;
