import React from "react";
import logo from "../../assets/images/logo.png";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CancelIcon from "@mui/icons-material/Cancel";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function DeliveryCard({ delivery }) {
  const product = delivery.products;
  const hasConfirmation = delivery.rider && delivery.delivery_issued;

  return (
    <section className="">
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
                </a>{" "}
                <span className="me-2 rounded bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                  {delivery.status}
                </span>
              </div>

              {/* Product Name */}

              {/* Rider */}
              <div className="mt-2 flex items-center gap-2">
                <TwoWheelerIcon fontSize="small" className="text-gray-600" />
                <p className="text-sm font-medium text-gray-500 mt-0.5">
                  {hasConfirmation ? delivery.rider : "Not yet Confirmed"}
                </p>
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

              {/* Price & Cancel Button */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-sm font-extrabold leading-tight text-gray-900">
                  ₱ {Number(product.price).toLocaleString()}
                </p>

                <button
                  type="button"
                  className="inline-flex items-center rounded-lg bg-orange-700 px-5 py-2.5 text-xs font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
                >
                  <CancelIcon className="mr-1 text-white" fontSize="small" />
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeliveryCard;
