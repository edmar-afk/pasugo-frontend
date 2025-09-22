import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import DeliveryCard from "../../components/customers/DeliveryCard";
import api from "../../assets/api";

function CustomerDeliveries() {
  const [deliveries, setDeliveries] = useState([]);

  const fetchDeliveries = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData || !userData.id) {
        console.error("No user data found in localStorage");
        return;
      }

      const response = await api.get(`/api/deliveries/user/${userData.id}/`);
      setDeliveries(response.data);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleStatusUpdated = async () => {
    await fetchDeliveries(); // re-fetch fresh data from API
  };

  return (
    <>
      <Header />
      <div className="mt-24 space-y-3">
        <div className="flex flex-row items-center justify-between px-4 pb-4">
          <p className="text-gray-800 font-bold text-lg">My Deliveries</p>
          <div className="text-gray-800 flex flex-row items-center gap-2">
            <p className="text-xs text-blue-700">Delivered</p>
            <span className="text-gray-400">|</span>
            <p className="text-xs text-blue-700">Pending</p>
          </div>
        </div>
        {deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <DeliveryCard
              key={delivery.id}
              delivery={delivery}
              onStatusUpdated={handleStatusUpdated}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No deliveries found.
          </p>
        )}
      </div>
    </>
  );
}

export default CustomerDeliveries;
