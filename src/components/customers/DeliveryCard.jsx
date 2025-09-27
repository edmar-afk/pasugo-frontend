import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import api from "../../assets/api";
import PaymentDeliveryModal from "../modals/PaymentDeliveryModal";

function DeliveryCard({ delivery, onStatusUpdated }) {
  const product = delivery.products;
  const hasConfirmation = delivery.rider && delivery.delivery_issued;
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus) => {
    try {
      setLoading(true);
      const response = await api.patch(
        `/api/deliveries/${delivery.id}/update-status/`,
        {
          status: newStatus,
        }
      );

      if (response.status === 200) {
        onStatusUpdated(response.data);
      }
    } catch (error) {
      console.error(`Failed to update status to ${newStatus}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const showCancelButton = delivery.status === "Pending";
  const showReceivedButton = delivery.status === "Ongoing";

  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Received":
        return "bg-green-100 text-green-800";
      case "Ongoing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section>
      <div className="mx-auto w-[95%]">
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="h-56 w-full">
              <a href="#">
                <img
                  className="mx-auto h-full object-cover"
                  src={product.picture ? product.picture : logo}
                  alt={product.name}
                />
              </a>
            </div>

            <div className="pt-6">
              {/* Status */}
              <div className="mb-4 flex items-center justify-between gap-4">
                <a
                  href="#"
                  className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
                >
                  {product.name}
                </a>
                <span
                  className={`me-2 rounded px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(
                    delivery.status
                  )}`}
                >
                  {delivery.status}
                </span>
              </div>

              {/* Rider */}
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TwoWheelerIcon fontSize="small" className="text-gray-600" />
                  <p className="text-xs font-medium text-gray-500 mt-0.5">
                    {hasConfirmation ? delivery.rider : "Not yet Confirmed"}
                  </p>
                </div>
                {delivery.status !== "Cancelled" && (
                  <PaymentDeliveryModal
                    deliveryId={delivery.id}
                    payment={delivery.payment}
                    onSuccess={onStatusUpdated}
                  />
                )}
              </div>

              {/* Type & Date */}
              <ul className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MenuBookIcon fontSize="small" className="text-gray-600" />
                  <p className="text-sm font-medium text-gray-500 mt-0.5">
                    {product.type || "N/A"}
                  </p>
                </div>
                <li className="flex items-center gap-2">
                  <EventAvailableIcon
                    fontSize="small"
                    className="text-gray-600"
                  />
                  <p className="text-sm font-medium text-gray-500 mt-0.5">
                    {hasConfirmation
                      ? delivery.delivery_issued
                      : "Not yet Confirmed"}
                  </p>
                </li>
              </ul>

              {/* Price & Action Button */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-sm font-extrabold leading-tight text-gray-900">
                  ₱ {Number(product.price).toLocaleString()}
                </p>

                {showCancelButton && (
                  <button
                    onClick={() => updateStatus("Cancelled")}
                    disabled={loading}
                    type="button"
                    className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50"
                  >
                    <CancelIcon className="mr-1 text-white" fontSize="small" />
                    {loading ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}

                {showReceivedButton && (
                  <button
                    onClick={() => updateStatus("Received")}
                    disabled={loading}
                    type="button"
                    className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-xs font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50"
                  >
                    <CheckCircleIcon
                      className="mr-1 text-white"
                      fontSize="small"
                    />
                    {loading ? "Updating..." : "Mark as Received"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeliveryCard;
