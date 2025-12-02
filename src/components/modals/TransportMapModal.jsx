import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../../assets/api";

function TransportMapModal({ transportId }) {
  const [open, setOpen] = useState(false);
  const [transportation, setTransportation] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open && transportId) {
      api
        .get(`/api/transport-map/${transportId}/`)
        .then((res) => setTransportation(res.data))
        .catch((err) => console.error(err));
    }
  }, [open, transportId]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 600,
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: 2,
  };

  const labelIcon = (text, color) =>
    L.divIcon({
      className: "",
      html: `
        <div class="flex flex-col items-center">
          <span class="text-xs font-bold ${color} mb-1 bg-blue-500 text-white py-1 px-2 rounded-full">${text}</span>
          <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" class="w-6 h-6" />
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });

  const currentCoords = transportation?.current_location
    ? transportation.current_location.split(",").map(Number)
    : null;

  const destinationCoords = transportation?.destination
    ? transportation.destination.split(",").map(Number)
    : null;

  return (
    <>
      <p onClick={handleOpen} sx={{ mt: 2 }}>
        View Destination
      </p>

      <Modal open={open} onClose={handleClose} sx={{ zIndex: 99999 }}>
        <Box sx={style} className="relative">
          <button
            onClick={handleClose}
            className="absolute z-[9999] top-2 right-2 bg-red-500 text-white px-3 py-1.5 rounded-full font-bold shadow-md hover:bg-red-600 active:scale-95 transition"
          >
            ✕
          </button>

          {transportation ? (
            <MapContainer
              center={currentCoords || [0, 0]}
              zoom={16}
              style={{ height: "400px", width: "100%", borderRadius: "8px" }}
              attributionControl={false}
              zoomControl={false}
            >
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

              {currentCoords && (
                <Marker
                  position={currentCoords}
                  icon={labelIcon("You", "text-blue-600")}
                />
              )}

              {destinationCoords && (
                <Marker
                  position={destinationCoords}
                  icon={labelIcon("Destination", "text-red-600")}
                />
              )}
            </MapContainer>
          ) : (
            <p>Loading map...</p>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default TransportMapModal;
