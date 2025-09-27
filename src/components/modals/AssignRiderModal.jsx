import React, { useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import api from "../../assets/api";

function AssignRiderModal({ id, role, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [rider, setRider] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      api
        .get(`/api/profiles/role/${role}/`)
        .then((res) => setUserList(res.data))
        .catch((err) => console.error(err));
    }
  }, [open, role]);

  const handleSubmit = async () => {
    try {
      await api.patch(`/api/transport/${id}/update/`, { rider });
      handleClose();
      if (onSuccess) onSuccess(); // ✅ refresh transports
    } catch (err) {
      console.error(err);
    }
  };

  const isDisabled = !rider;

  return (
    <>
      <p
        onClick={handleOpen}
        className="cursor-pointer text-blue-600 underline"
      >
        Assign {role}
      </p>

      <Modal open={open} onClose={handleClose}>
        <Box className="absolute top-1/2 left-1/2 w-[350px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Assign {role}
          </h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-800">
              Assign {role}
            </label>
            <select
              value={rider}
              onChange={(e) => setRider(e.target.value)}
              className="w-full border rounded p-2 text-sm bg-white text-gray-800"
            >
              <option value="">Choose {role}</option>
              {userList.map((user) => (
                <option key={user.username} value={user.first_name}>
                  {user.first_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              className="!normal-case"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={isDisabled}
              onClick={handleSubmit}
              className={`!normal-case ${
                isDisabled
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default AssignRiderModal;
