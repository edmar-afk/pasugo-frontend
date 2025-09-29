import React, { useState } from "react";
import ViewPayment from "../modals/ViewPayment";
import OrdersDetailModal from "../modals/OrdersDetailModal";

function DeliveryLists({ delivery }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <li className="border-t first:border-0 border-gray-200">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-800 font-semibold">
              {delivery.customer.first_name}
            </p>
            <p className="text-xs leading-6 font-medium text-gray-500 italic">
              - Ordered {delivery.products?.name || "No Product"}
            </p>
          </div>

          <button
            onClick={handleOpen}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View Order
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">
            Status:{" "}
            <span
              className={
                delivery.status === "Active"
                  ? "text-green-600"
                  : delivery.status === "Inactive"
                  ? "text-red-600"
                  : "text-yellow-600"
              }
            >
              {delivery.status}
            </span>
          </p>

          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            <ViewPayment paymentImg={delivery.payment} />
          </a>
        </div>
      </div>

      {/* The Modal */}
      <OrdersDetailModal
        open={openModal}
        onClose={handleClose}
        order={delivery}
        onUpdated={() => {
          console.log("Delivery updated!");
          handleClose();
        }}
        isRider={true}
      />
    </li>
  );
}

export default DeliveryLists;
