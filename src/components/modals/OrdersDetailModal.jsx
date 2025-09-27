import { Modal, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../../assets/api";

export default function OrdersDetailModal({ open, onClose, order, onUpdated }) {
  const [users, setUsers] = useState([]);
  const [rider, setRider] = useState(order.rider || "");
  const [status, setStatus] = useState(order.status || "");

  useEffect(() => {
    api
      .get("/api/clients/") // endpoint that returns all profiles
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleUpdate = async () => {
    try {
      await api.patch(`/api/deliveries/${order.id}/update-status/`, {
        status,
        rider,
      });
      if (typeof onUpdated === "function") {
        onUpdated();
      }
      onClose();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const isDisabled = !rider || !status;

  let lat = null;
  let lng = null;
  if (order.location) {
    const matches = order.location.match(/-?\d+(\.\d+)?/g);
    if (matches && matches.length >= 2) {
      lat = parseFloat(matches[0]);
      lng = parseFloat(matches[1]);
    }
  }

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // filter users with role 'Courier'
  const couriers = users.filter((u) => u.role === "Courier");
  //console.log(couriers);
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Order Details</h2>

        <div className="space-y-4">
          {lat !== null && lng !== null ? (
            <div className="h-48 w-full rounded-lg overflow-hidden">
              <MapContainer
                center={[lat, lng]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                attributionControl={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[lat, lng]} icon={markerIcon} />
              </MapContainer>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No valid location available.
            </p>
          )}

          <div>
            <p className="text-sm font-medium text-gray-600">Assign Courier:</p>
            <select
              value={rider}
              onChange={(e) => setRider(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring focus:ring-indigo-300 focus:outline-none"
            >
              <option value="">Select Rider</option>
              {couriers.map((c) => (
                <option key={c.id} value={c.user.first_name}>
                  {c.user.first_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Status:</p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:ring focus:ring-indigo-300 focus:outline-none"
            >
              <option value="">Select Status</option>
              <option value="Arrived">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Product :</p>
            <p className="text-base font-semibold text-gray-800">
              {order.products?.name}{" "}
              <span className="text-xs text-orange-600">
                (₱{" "}
                {order.products?.price
                  ? Number(order.products.price).toLocaleString()
                  : "0"}
                )
              </span>
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Customer:</p>
            <p className="text-base text-gray-800">
              {order.customer.first_name}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isDisabled}
            className={`px-4 py-2 text-sm rounded-lg text-white ${
              isDisabled
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Update
          </button>
        </div>
      </Box>
    </Modal>
  );
}
