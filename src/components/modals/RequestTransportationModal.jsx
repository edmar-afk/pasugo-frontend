import React, { useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AddLocationIcon from "@mui/icons-material/AddLocation";
const defaultCenter = [7.8722, 123.2056];

const userMarkerIcon = new L.DivIcon({
  html: `
    <div class="flex flex-col items-center">
      <span class="bg-orange-500 text-white text-[10px] font-bold rounded px-2 py-0.5 mb-1 shadow">
        You
      </span>
      <img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" class="w-[25px] h-[41px]" />
    </div>
  `,
  className: "",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const destinationMarkerIcon = new L.DivIcon({
  html: `
    <div class="flex flex-col items-center">
      <span class="bg-white text-red-600 text-xs font-bold rounded px-2 py-0.5 mb-1 shadow">
        Destination
      </span>
      <img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" class="w-[25px] h-[41px]" />
    </div>
  `,
  className: "",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

import api from "../../assets/api";
function DestinationMarker({ setDestination }) {
  useMapEvents({
    click(e) {
      setDestination([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function MapUpdater({ currentLocation }) {
  const map = useMap();

  useEffect(() => {
    if (currentLocation) {
      map.flyTo(currentLocation, 15, { animate: true, duration: 1.5 });
    }
  }, [currentLocation, map]);

  return null;
}

export default function RequestTransportationModal({ open, handleClose }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [message, setMessage] = useState("");
  const [passenger, setPassenger] = useState("");
  const [warning, setWarning] = useState("");

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  };

  const handlePassengerChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPassenger(value);
      if (parseInt(value, 10) > 5) {
        setWarning("Passenger not allowed more than 5");
      } else {
        setWarning("");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));

      await api.post(`/api/transportation/${userData.id}/create/`, {
        current_location: currentLocation
          ? `${currentLocation[0]},${currentLocation[1]}`
          : null,
        destination: destination ? `${destination[0]},${destination[1]}` : null,
        message: message,
        passenger: passenger,
      });

      handleClose();
    } catch (error) {
      console.error("Error creating transportation request:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-lg mx-auto mt-14">
        <div className="h-64 mb-2 rounded-xl overflow-hidden">
          <MapContainer
            center={defaultCenter}
            zoom={13}
            attributionControl={false}
            zoomControl={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>, Earthstar Geographics'
            />
            <DestinationMarker setDestination={setDestination} />
            <MapUpdater currentLocation={currentLocation} />
            {currentLocation && (
              <Marker position={currentLocation} icon={userMarkerIcon} />
            )}
            {destination && (
              <Marker position={destination} icon={destinationMarkerIcon} />
            )}
          </MapContainer>
        </div>

        {destination && (
          <p
            className="text-red-600 text-xs mb-4 cursor-pointer hover:underline font-bold"
            onClick={() => setDestination(null)}
          >
            Remove Destination
          </p>
        )}

        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Request Transportation
        </h2>

        <label className="block mb-2 text-sm font-medium text-gray-800">
          Number of Passengers:
        </label>
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-2 text-black placeholder-gray-400"
          value={passenger}
          onChange={handlePassengerChange}
          placeholder="Enter number of passengers"
        />
        {warning && <p className="text-red-600 text-xs mb-2">{warning}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-800">
          Destination (Optional):
        </label>
        <p className="text-orange-600 text-xs mb-2">
          If you can’t find the destination, type the full address for the rider
          instead.
        </p>
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-4 text-black placeholder-gray-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a note for the rider"
        />

        <div className="flex flex-row gap-4 items-center">
          <button
            className="w-fit bg-blue-500 py-2 px-2 rounded-lg"
            onClick={locateUser}
          >
            <AddLocationIcon />
          </button>

          <button
            className={`w-full py-2 rounded-lg text-white ${
              currentLocation &&
              passenger &&
              !warning &&
              (message || destination)
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={
              !currentLocation ||
              !passenger ||
              warning ||
              (!message && !destination)
            }
          >
            Send Request
          </button>
        </div>
      </Box>
    </Modal>
  );
}
