import React, { useEffect, useState } from "react";
import TransportCard from "../../components/riders/TransportCard";
import api from "../../assets/api";
import Header from "../../components/Header";
function RiderHome() {
  const [transports, setTransports] = useState([]);
  //console.log(transports);
  useEffect(() => {
    api
      .get("/api/transports/")
      .then((res) => {
        setTransports(res.data);
      })
      .catch((err) => {
        console.error("Error fetching transports:", err);
      });
  }, []);

  return (
    <div className="mb-24">
      <Header />
      <div className="flex flex-row items-center justify-between px-4 mt-24 mb-4">
        <p className="text-gray-800 text-sm font-bold">
          Transportation Records
        </p>
        <p className="text-gray-800 text-right text-xs font-bold">
          Swipe Left/Right
        </p>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {transports.map((transport) => (
          <TransportCard key={transport.id} transport={transport} />
        ))}
      </div>
    </div>
  );
}

export default RiderHome;
