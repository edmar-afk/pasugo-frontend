import React, { useEffect, useState } from "react";
import DeliveryLists from "../../components/couriers/DeliveryLists";
import api from "../../assets/api";

function CourierHome() {
  const [deliveries, setDeliveries] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    api
      .get("/api/deliveries/")
      .then((res) => {
        setDeliveries(res.data);
      })
      .catch((err) => {
        console.error("Error fetching deliveries:", err);
      });
  }, []);

  const filteredDeliveries = deliveries.filter(
    (delivery) => delivery.rider === userData.first_name
  );

  return (
    <div className="mt-16 max-w-sm mx-auto">
      {filteredDeliveries.length > 0 ? (
        <ul className="overflow-hidden sm:rounded-md">
          {filteredDeliveries.map((delivery) => (
            <DeliveryLists key={delivery.id} delivery={delivery} />
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-600 font-medium p-6">
          <p>
            You don’t have any assigned deliveries yet. Please wait for the
            owner to assign customers to you.
          </p>
        </div>
      )}
    </div>
  );
}

export default CourierHome;
