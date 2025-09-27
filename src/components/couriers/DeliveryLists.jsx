import React from "react";

function DeliveryLists({ delivery }) {
  return (
    <li className="border-t first:border-0 border-gray-200">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-gray-800 font-semibold">{delivery.customer.first_name || "No message"}</p>{" "}
            <p className="text-xs leading-6 font-medium text-gray-500 italic">- Ordered {delivery.products?.name || "No Product"}</p>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {delivery.price || "No message"}
          </p>
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
            Edit
          </a>
        </div>
      </div>
    </li>
  );
}

export default DeliveryLists;
