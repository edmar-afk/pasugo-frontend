import React, { useState } from "react";
import { Modal, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../assets/api";

function ConfirmTransactionModal({ transportId }) {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPrice("");
    setFile(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("price", price);
    if (file) {
      formData.append("payment", file);
    }

    try {
      await api.patch(
        `/api/transportations/${transportId}/update-price-payment/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      handleClose();
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <p onClick={handleOpen} className="text-blue-500 text-sm font-bold">
        Confirm Transaction
      </p>

      <Modal open={open} onClose={handleClose}>
        <Box className="absolute top-1/2 left-1/2 w-[95%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Confirm Transaction</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 text-black rounded-md p-2 mt-1 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label
                htmlFor="uploadFile1"
                className="flex text-xs items-center bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2.5 outline-none rounded w-max cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 mr-2 fill-white"
                  viewBox="0 0 32 32"
                >
                  <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                  <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                </svg>
                <p className="mt-0.5">Upload Payment Proof</p>
                <input
                  type="file"
                  id="uploadFile1"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {preview && (
                <div className="relative mt-2">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <IconButton
                    size="small"
                    onClick={removeFile}
                    className="!absolute top-1 right-1 bg-white"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              className="!border-gray-400 !text-gray-600"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="!bg-blue-600"
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmTransactionModal;
