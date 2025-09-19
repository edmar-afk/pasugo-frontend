import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditProductModal from "./modals/EditProductModal";
import DeletePopup from "./DeletePopup";
import api from "../assets/api";

function formatRelativeTime(date) {
  const now = new Date();
  const posted = new Date(date);
  const diffMs = now - posted;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `just now`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;

  const remainingHours = hours % 24;
  if (remainingHours === 0) return `${days}d ago`;
  return `${days}d ${remainingHours}h ago`;
}

function ProductsCard({
  id,
  name,
  picture,
  date_posted,
  status,
  price,
  type,
  onProductUpdated,
}) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/api/delete-product/${id}/`);
      setShowDeletePopup(false);
      if (onProductUpdated) onProductUpdated();
    } catch (error) {
      console.error("Delete failed:", error);
      setShowDeletePopup(false);
    }
  };

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg flex flex-col">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={picture || "https://via.placeholder.com/500x300?text=No+Image"}
            alt={name}
          />
          {status && (
            <div
              className={`text-xs absolute top-0 right-0 px-4 py-2 mt-3 mr-3 rounded ${
                status === "Sold out"
                  ? "bg-red-600 text-white"
                  : "bg-indigo-600 text-white"
              }`}
            >
              {status}
            </div>
          )}
        </div>

        <div className="px-6 pt-4 mb-auto">
          <h2 className="font-medium text-lg text-indigo-600">{name}</h2>
        </div>

        <div className="px-6 pb-3 bg-gray-100">
          <div className="flex flex-row items-center justify-between mt-2">
            <span className="py-1 text-xs text-gray-900 flex flex-row items-center">
              <AccessTimeIcon fontSize="small" />
              <span className="ml-1 mt-0.5">
                {formatRelativeTime(date_posted)}
              </span>
            </span>
            {price && (
              <p className="text-gray-700 font-semibold">
                ₱{price}{" "}
                <span className="text-sm text-gray-500">Per Serve</span>
              </p>
            )}
          </div>
          <div className="flex flex-row justify-between mt-2 items-center">
            <p className="text-gray-500">{type}</p>
            <div className="flex flex-row gap-2 items-center">
              <button
                className="text-red-600 text-sm hover:underline"
                onClick={() => setShowDeletePopup(true)}
              >
                Delete
              </button>
              <span className="text-gray-400">|</span>
              <EditProductModal
                productId={id}
                onProductUpdated={onProductUpdated}
              />
            </div>
          </div>
        </div>
      </div>

      {showDeletePopup && (
        <DeletePopup
          message={`Delete "${name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
    </>
  );
}

export default ProductsCard;
