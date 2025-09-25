import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const currentIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const destinationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function Map({ currentLocation, destination }) {
  if (!currentLocation) {
    return <div className="text-xs text-gray-500">No location available</div>;
  }

  const parseCoords = (coordString) => {
    const [lat, lng] = coordString
      .split(",")
      .map((val) => parseFloat(val.trim()));
    return { lat, lng };
  };

  const currentCoords = parseCoords(currentLocation);
  const destinationCoords = destination ? parseCoords(destination) : null;

  const center = destinationCoords
    ? [
        (currentCoords.lat + destinationCoords.lat) / 2,
        (currentCoords.lng + destinationCoords.lng) / 2,
      ]
    : [currentCoords.lat, currentCoords.lng];

  return (
    <div className="h-40 w-full rounded overflow-hidden">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

        <Marker
          position={[currentCoords.lat, currentCoords.lng]}
          icon={currentIcon}
        >
          <Popup>Current Location</Popup>
        </Marker>

        {destinationCoords && (
          <Marker
            position={[destinationCoords.lat, destinationCoords.lng]}
            icon={destinationIcon}
          >
            <Popup>Destination</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
