import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import api from "../../assets/api";
import EditRiderModal from "../modals/EditRiderModal";
import DeletePopup from "../DeletePopup";

export default function RidersLists() {
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [deleteRider, setDeleteRider] = useState(null); // ✅ track rider to delete

  const fetchRiders = async () => {
    try {
      const res = await api.get("/api/riders/");
      setRiders(res.data);
    } catch (err) {
      console.error("Error fetching riders:", err);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  const handleStatusClick = (rider) => {
    setSelectedRider(rider);
  };

  const handleCloseModal = () => {
    setSelectedRider(null);
  };

  const handleStatusUpdate = () => {
    fetchRiders();
    handleCloseModal();
  };

  const handleDeleteClick = (rider) => {
    setDeleteRider(rider); // ✅ open popup for confirmation
  };

  const handleConfirmDelete = async () => {
    if (!deleteRider) return;
    try {
      await api.delete(`/api/users/${deleteRider.id}/delete/`);
      setDeleteRider(null);
      fetchRiders(); // ✅ refresh list after successful delete
    } catch (err) {
      console.error("Error deleting rider:", err);
      alert("Failed to delete rider.");
    }
  };

  const handleCancelDelete = () => {
    setDeleteRider(null);
  };

  const filteredRiders = riders.filter(
    (rider) => rider.profile?.role === "Customer"
  );

  return (
    <>
      <ul role="list" className="divide-y divide-white/5 px-4 mt-4">
        <p className="text-gray-800 font-bold mb-8 text-lg">
          Couriers/Riders Lists
        </p>

        {filteredRiders.length > 0 ? (
          filteredRiders.map((rider) => (
            <li key={rider.id} className="flex justify-between gap-x-6 py-3">
              <div className="flex min-w-0 gap-x-4">
                <img
                  alt=""
                  src={rider.profile?.profile_picture || logo}
                  className="size-12 flex-none rounded-full object-cover"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold text-gray-800">
                    {rider.first_name}
                  </p>
                  <p className="mt-1 truncate text-xs text-gray-400">
                    {rider.email}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <p className="text-sm text-gray-800">
                  {rider.profile?.role || "No Role"}
                </p>
                <div className="flex flex-row items-center">
                  <p
                    className="text-xs text-green-600 cursor-pointer hover:underline"
                    onClick={() => handleStatusClick(rider)}
                  >
                    {rider.profile?.status || "Unknown"}
                  </p>
                  <span className="text-gray-500 mx-2">|</span>
                  <p
                    className="text-red-600 text-xs cursor-pointer hover:underline"
                    onClick={() => handleDeleteClick(rider)}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No riders found.</p>
        )}
      </ul>

      {selectedRider && (
        <EditRiderModal
          open={!!selectedRider}
          rider={selectedRider}
          onClose={handleCloseModal}
          onStatusUpdated={handleStatusUpdate}
        />
      )}

      {deleteRider && (
        <DeletePopup
          message={`Delete ${deleteRider.first_name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}
