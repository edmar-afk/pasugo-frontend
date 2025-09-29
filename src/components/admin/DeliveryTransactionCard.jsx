import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
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

function DeliveryTransactionCard() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await api.get("/api/deliveries/arrived/");
        setDeliveries(response.data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    };
    fetchDeliveries();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-2">
      <div className="flow-root">
        <ul className="-mb-8">
          {deliveries.length > 0 ? (
            deliveries.map((delivery, index) => (
              <li key={delivery.id}>
                <div className="relative pb-8">
                  {index !== deliveries.length - 1 && (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div>
                      <div className="relative px-1">
                        <div className="h-8 w-8 bg-orange-500 rounded-full ring-8 ring-white flex items-center justify-center">
                         <DeliveryDiningIcon fontSize="small"/>
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-0">
                      <div className="text-md text-gray-500">
                        <div className="mb-2">
                          <span className="font-medium text-gray-900 mr-2 text-lg">
                            {delivery.customer.first_name}
                          </span>

                          <span className="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                            <div className="absolute flex-shrink-0 flex items-center justify-center">
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-green-500"
                                aria-hidden="true"
                              ></span>
                            </div>
                            <div className="ml-3.5 font-sm text-gray-900">
                              {delivery.status}
                            </div>
                          </span>
                        </div>
                        <span className="whitespace-nowrap text-sm">
                          {new Date(
                            delivery.delivery_issued
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          -{" "}
                          {new Date(delivery.delivery_issued)
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
                            Ordered a <b>{delivery.products.name}</b>{" "}
                            {formatTimeAgo(delivery.delivery_issued)}
                          </p>
                          <p className="text-sm mt-1">
                            {" "}
                            Price: ₱
                            <b className="ml-1">{Number(
                              delivery.products.price
                            ).toLocaleString()}</b>
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
              No arrived deliveries yet.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DeliveryTransactionCard;
