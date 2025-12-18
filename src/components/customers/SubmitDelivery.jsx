import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../assets/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlertPopup from "../AlertPopup";

function SubmitDelivery({ requestLocation, location }) {
  const { userid, productid } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [remainingQty, setRemainingQty] = useState(0);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    api
      .get(`/api/product-details/${productid}/`)
      .then((res) => {
        setProduct(res.data);
        setQuantity(1);
        setRemainingQty(res.data.quantity);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [productid]);

  const isLocationAvailable = Array.isArray(location) && location.length === 2;

  const handleQuantityChange = (value) => {
    if (!product) return;
    let newQty = Number(value);
    if (newQty > product.quantity) newQty = product.quantity;
    if (newQty < 1) newQty = 1;
    setQuantity(newQty);
    setRemainingQty(product.quantity - newQty);
  };

  const handleSubmit = async () => {
    if (!isLocationAvailable || !product) return;
    setLoading(true);

    try {
      await api.patch(`/api/products/${productid}/deduct-quantity/`, {
        quantity: quantity,
      });

      await api.post(`/api/deliveries/submit/${userid}/${productid}/`, {
        location: `Lat: ${location[0]}, Lng: ${location[1]}`,
        quantity: quantity,
        price: product.price * quantity,
      });

      setAlert({
        show: true,
        message: "Delivery request sent successfully!",
        type: "success",
      });

      const newQty = product.quantity - quantity;
      setProduct({ ...product, quantity: newQty });
      setQuantity(1);
      setRemainingQty(newQty);
    } catch (err) {
      console.error("Error submitting delivery:", err);
      setAlert({
        show: true,
        message:
          err.response?.data?.detail || "Failed to send delivery request.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
    if (alert.type === "success") {
      navigate("/customer-home");
    }
  };

  return (
    <>
      <div
        className="fixed bottom-0 p-4 z-[9999] w-full border-b-white"
        style={{ borderBottomWidth: "15px" }}
      >
        <div className="bg-orange-500 p-4 rounded-lg">
          <p className="text-center font-bold">Order Request</p>
          <p className="text-sm mt-4">
            Product name: {product ? product.name : "Loading..."}
          </p>
          <p className="text-sm mt-1">
            Price: ₱
            {product
              ? (product.price * quantity).toLocaleString()
              : "Loading..."}{" "}
            ({product ? product.type : "Loading..."})
          </p>

          {product && (
            <>
              <div className="flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row items-center gap-2 mt-1">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="bg-gray-800 px-2 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="text-center w-16 border rounded"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min={1}
                    max={product.quantity}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="bg-gray-800 px-2 rounded"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm mt-1">Remaining: {remainingQty}</p>
              </div>
            </>
          )}

          <div
            onClick={() =>
              setAlert({
                show: true,
                message: `Please pay ₱${
                  product ? (product.price * quantity).toLocaleString() : ""
                } upon delivery.`,
                type: "payment",
              })
            }
            className="text-xs mt-4 flex flex-row items-center justify-between border-t-2 pt-2 border-dashed border-orange-900 cursor-pointer active:scale-95"
          >
            <p>Payment Method</p>
            <p>Cash on Delivery(COD)</p>
          </div>

          <div className="flex flex-row mt-4 justify-center gap-2">
            <button
              onClick={requestLocation}
              className="bg-blue-600 text-white px-3 py-2 rounded-xl shadow-lg"
            >
              <LocationOnIcon />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isLocationAvailable || loading}
              className={`px-3 py-2 rounded-xl text-sm w-full shadow-lg font-light ${
                isLocationAvailable
                  ? "bg-blue-600 text-white"
                  : "bg-red-500 text-white cursor-not-allowed"
              }`}
            >
              {loading
                ? "Sending..."
                : isLocationAvailable
                ? "Send Delivery Request"
                : "Send your location first"}
            </button>
          </div>
        </div>
      </div>

      {alert.show && (
        <AlertPopup
          message={alert.message}
          type={alert.type}
          onClose={handleCloseAlert}
        />
      )}
    </>
  );
}

export default SubmitDelivery;
