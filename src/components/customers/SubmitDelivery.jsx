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
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    api
      .get(`/api/product-details/${productid}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [productid]);

  const isLocationAvailable = Array.isArray(location) && location.length === 2;

  const handleSubmit = () => {
    if (!isLocationAvailable) return;

    setLoading(true);

    api
      .post(`/api/deliveries/submit/${userid}/${productid}/`, {
        location: `Lat: ${location[0]}, Lng: ${location[1]}`,
      })
      .then((res) => {
        setAlert({
          show: true,
          message: "Delivery request sent successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        console.error("Error sending delivery request:", err);
        setAlert({
          show: true,
          message: "Failed to send delivery request.",
          type: "error",
        });
      })
      .finally(() => setLoading(false));
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
            Price: ₱{product ? product.price : "Loading..."} (
            {product ? product.type : "Loading..."})
          </p>

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
