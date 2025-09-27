import { useEffect, useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import api from "../../assets/api";

function EditProductModal({ productId, onProductUpdated }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    status: "Available",
    picture: null,
  });
  const [fileError, setFileError] = useState(""); // ✅ new state for error message

  useEffect(() => {
    if (open && productId) {
      api
        .get(`/api/edit-product/${productId}/`)
        .then((res) => {
          setFormData({
            name: res.data.name || "",
            price: res.data.price || "",
            type: res.data.type || "",
            status: res.data.status || "Available",
            picture: null,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [open, productId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      if (files && files[0]) {
        const file = files[0];
        const allowed = ["jpg", "jpeg", "png"];
        const ext = file.name.split(".").pop().toLowerCase();

        if (!allowed.includes(ext)) {
          setFileError("Only JPG, JPEG, and PNG files are allowed.");
          setFormData((prev) => ({ ...prev, picture: null }));
          return;
        }

        setFileError("");
        setFormData((prev) => ({ ...prev, picture: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("type", formData.type);
    data.append("status", formData.status);
    if (formData.picture) data.append("picture", formData.picture);

    try {
      await api.patch(`/api/edit-product/${productId}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOpen(false);
      if (onProductUpdated) onProductUpdated();
    } catch (error) {
      console.error("PATCH error:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <p
        className="text-blue-600 cursor-pointer hover:underline"
        onClick={() => setOpen(true)}
      >
        Edit
      </p>
      <Modal open={open} onClose={() => setOpen(false)} sx={{ zIndex: 99999 }}>
        <Box className="bg-gray-100 p-6 rounded-xl shadow-xl max-w-md mx-auto mt-20">
          <p className="mb-4 text-gray-700 font-semibold">Edit Product</p>

          <label className="block mb-2 text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 bg-gray-50 text-gray-700 p-2 w-full rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <label className="block mb-2 text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 bg-gray-50 text-gray-700 p-2 w-full rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <label className="block mb-2 text-gray-600">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border border-gray-300 bg-gray-50 text-gray-700 p-2 w-full rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="">Select type</option>
            <option value="Softdrinks">Softdrinks</option>
            <option value="Food">Food</option>
            <option value="Snacks">Snacks</option>
          </select>

          <label className="block mb-2 text-gray-600">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 bg-gray-50 text-gray-700 p-2 w-full rounded mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="Available">Available</option>
            <option value="Sold out">Sold out</option>
          </select>

          <label className="block mb-2 text-gray-600">Picture</label>
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            className="mb-2 text-gray-600"
          />
          {fileError && (
            <p className="text-red-500 text-sm mb-3">{fileError}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setOpen(false)}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!!fileError} // ✅ disable submit if invalid file
              variant="contained"
              sx={{
                backgroundColor: "#4b5563",
                "&:hover": { backgroundColor: "#374151" },
              }}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default EditProductModal;
