import React, { useState } from "react";
import { Modal, Box, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import api from "../../assets/api";

export default function EditRiderModal({
  open,
  onClose,
  rider,
  onStatusUpdated,
}) {
  const [selectedStatus, setSelectedStatus] = useState(
    rider.profile?.status || ""
  );

  const handleSubmit = async () => {
    try {
      const res = await api.patch(`/api/users/${rider.id}/update-status/`, {
        status: selectedStatus,
      });
      onStatusUpdated(res.data);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          maxWidth: 350,
          mx: "auto",
          mt: "10%",
        }}
      >
        <p className="text-lg font-bold mb-4 text-gray-800">
          Edit Rider Status
        </p>

        <RadioGroup
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="flex flex-col gap-2 text-gray-800"
        >
          {["Pending", "Confirmed", "Rejected"].map((status) => (
            <FormControlLabel
              key={status}
              value={status}
              control={
                <Radio
                  icon={
                    <span className="w-4 h-4 border border-gray-400 rounded-full" />
                  }
                  checkedIcon={<CheckCircleIcon className="text-blue-600" />}
                />
              }
              label={status}
              className="flex items-center gap-2"
            />
          ))}
        </RadioGroup>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="border border-gray-400 rounded px-3 py-1 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </Box>
    </Modal>
  );
}
