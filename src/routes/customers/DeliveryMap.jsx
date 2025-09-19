import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function LocateButton({ setPosition }) {
  const map = useMap();

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        map.setView([latitude, longitude], 15);
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  return (
    <button
      onClick={handleLocate}
      className="absolute top-4 right-4 z-[1000] bg-blue-600 text-white px-3 py-2 rounded-xl shadow-lg"
    >
      Detect My Location
    </button>
  );
}

function DeliveryMap() {
  const [position, setPosition] = useState(null);

  return (
    <div className="relative w-full h-[500px]">
      <MapContainer
        center={[7.6437, 123.3413]} // Pob. Guipos coordinates
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full rounded-xl shadow-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[7.6437, 123.3413]} icon={defaultIcon}>
          <Popup>Pob. Guipos, Zamboanga del Sur</Popup>
        </Marker>
        {position && (
          <Marker position={position} icon={defaultIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        <LocateButton setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}

export default DeliveryMap;
