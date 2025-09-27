import React, { useEffect, useState } from "react";
import DeliveryLists from "../../components/couriers/DeliveryLists";
import api from "../../assets/api";

function CourierHome() {
  const [deliveries, setDeliveries] = useState([]);

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

  return (
    <div>
      <ul className="overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
        {deliveries.map((delivery) => (
          <DeliveryLists key={delivery.id} delivery={delivery} />
        ))}
      </ul>
    </div>
  );
}

export default CourierHome;
