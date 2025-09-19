import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function DeliveryMap() {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const watchIdRef = useRef(null);

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported by your device");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setPosition([latitude, longitude]);
        setAccuracy(accuracy);
      },
      (err) => {
        console.error("Geolocation error:", err);
        if (err.code === err.PERMISSION_DENIED) {
          alert(
            "Permission denied. Please enable location access in browser/OS settings."
          );
        } else {
          alert("Unable to retrieve your location. Try again.");
        }
      },
      { enableHighAccuracy: true }
    );

    if (watchIdRef.current === null) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          setPosition([latitude, longitude]);
          setAccuracy(accuracy);
        },
        (err) => console.error("WatchPosition error:", err),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500px]">
      <MapContainer
        center={position ?? [7.6437, 123.3413]}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full rounded-xl shadow-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[7.6437, 123.3413]} icon={DefaultIcon}>
          <Popup>Pob. Guipos, Zamboanga del Sur</Popup>
        </Marker>

        {position && (
          <>
            <Marker position={position} icon={DefaultIcon}>
              <Popup>
                You are here
                <br />
                Lat: {position[0].toFixed(6)} <br />
                Lng: {position[1].toFixed(6)}
              </Popup>
            </Marker>
            {accuracy && <Circle center={position} radius={accuracy} />}
          </>
        )}
      </MapContainer>

      <button
        onClick={requestLocation}
        className="absolute top-4 right-4 z-[1000] bg-blue-600 text-white px-3 py-2 rounded-xl shadow-lg"
      >
        Detect My Locationsss
      </button>
    </div>
  );
}

export default DeliveryMap;
