import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import logo from "../../assets/images/logo.png";

function FoodCard({ product }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
      }
    }
  }, []);

  const handleOrderClick = () => {
    if (!userData) {
      alert("You must be logged in to order.");
      return;
    }
    navigate(`/deliver-map/${userData.id}/${product.id}`);
  };

  const imageSrc =
    product.picture && product.picture.trim() !== "" ? product.picture : logo;

  const quantity = Number(product.quantity) || 0;
  const isSoldOut = quantity <= 0;

  return (
    <div className="w-[200px] bg-white border border-gray-200 rounded-lg shadow-xl">
      <img
        className="rounded-t-lg w-full h-40 object-cover"
        src={imageSrc}
        alt={product.name}
      />

      <div className="px-2 pb-5 mt-4">
        <div className="flex flex-row items-center justify-between text-sm font-semibold tracking-tight text-orange-500">
          <p>{product.name}</p>
          <p className="text-gray-800 text-xs">
            {isSoldOut ? "0 Left" : `${quantity} Left`}
          </p>
        </div>

        <div className="flex flex-row items-center my-2 justify-between mb-4">
          <p className="text-xs text-gray-500 mt-1">{product.type}</p>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-sm ${
              isSoldOut
                ? "bg-red-500 text-white"
                : "bg-green-100 text-green-800"
            }`}
          >
            {isSoldOut ? "Sold out" : "Available"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-md font-bold text-gray-900">
            ₱{product.price}
          </span>
          <button
            onClick={handleOrderClick}
            className="text-blue-500 text-sm flex items-center gap-1 disabled:opacity-50"
            disabled={isSoldOut}
          >
            {isSoldOut ? (
              <p className="mt-0.5 text-xs text-red-600 font-bold">Unavailable</p>
            ) : (
              <>
                <AddIcon fontSize="small" />
                <p className="mt-0.5">Order</p>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
