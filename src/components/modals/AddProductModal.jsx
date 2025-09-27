import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import api from "../../assets/api";
import AlertPopup from "../AlertPopup";
import AddIcon from "@mui/icons-material/Add";

function AddProductModal({ onProductAdded }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const [popup, setPopup] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setPrice("");
    setType("");
    setPicture(null);
    setPreview(null);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("type", type);
    if (picture) {
      formData.append("picture", picture);
    }

    try {
      await api.post("/api/post-products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      handleClose();
      setPopup({
        open: true,
        message: "Product added successfully!",
        type: "success",
      });

      if (onProductAdded) {
        onProductAdded(); // ✅ refresh product list
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setPopup({ open: true, message: "Failed to add product", type: "error" });
    }
  };

  return (
    <div>
      <p
        className="text-blue-800 cursor-pointer flex items-center"
        onClick={handleOpen}
      >
        <AddIcon /> Add Product
      </p>

      <Modal open={open} onClose={handleClose} sx={{zIndex:99999}}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,

          }}
        >
          <p className="text-gray-800 font-semibold">Add New Product</p>

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 bg-gray-50 text-gray-700 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 bg-gray-50 text-gray-700 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 bg-gray-50 text-gray-700 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">Select type</option>
            <option value="Softdrinks">Softdrinks</option>
            <option value="Food">Food</option>
            <option value="Snacks">Snacks</option>
          </select>

          <Button
            variant="outlined"
            component="label"
            color={picture ? "success" : "primary"}
          >
            {picture ? "Change Picture" : "Upload Picture"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handlePictureChange}
            />
          </Button>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg"
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "cover",
              }}
            />
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!name.trim() || !price.trim() || !type.trim()}
          >
            Submit
          </Button>

          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Modal>

      {popup.open && (
        <AlertPopup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ ...popup, open: false })}
        />
      )}
    </div>
  );
}

export default AddProductModal;
