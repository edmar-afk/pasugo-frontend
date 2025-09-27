import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import api from "../../assets/api";

function ViewConfirmPaymentModal({ transportId, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState(null);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (open && transportId) {
      api
        .get(`/api/transport/${transportId}/payment/`)
        .then((res) => {
          setPayment(res.data.payment);
          setStatus(res.data.status || "");
          setPrice(res.data.price || "");
        })
        .catch((err) => console.error(err));
    }
  }, [open, transportId]);

  const handleSave = () => {
    api
      .put(`/api/transport/${transportId}/payment/`, { status, price })
      .then((res) => {
        setStatus(res.data.status);
        setPrice(res.data.price);
        setOpen(false);
        if (onRefresh) onRefresh(); // ✅ refresh parent transport list
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <p
        onClick={() => setOpen(true)}
        className="text-blue-500 "
      >
        View Payment
      </p>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="w-[350px] max-h-[100vh] overflow-y-auto bg-white p-6 mx-auto mt-12 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Payment Confirmation
          </h2>

          {payment ? (
            <div className="mb-4 text-center">
              <img
                src={payment}
                alt="Payment"
                className="max-w-full rounded-lg"
              />
            </div>
          ) : (
            <p className="text-gray-500 mb-4">No payment uploaded.</p>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="">Select status</option>
              <option value="Arrived">Accepted</option>
              <option value="Declined">Rejected</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Enter price"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg bg-red-500 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ViewConfirmPaymentModal;
