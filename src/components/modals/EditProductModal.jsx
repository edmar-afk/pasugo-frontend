import { useEffect, useState } from "react";
import { Modal, Box, Button, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import api from "../../assets/api";

function EditProductModal({ productId, onProductUpdated }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    quantity: 0,
    picture: null,
  });
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (open && productId) {
      api.get(`/api/edit-product/${productId}/`).then((res) => {
        setFormData({
          name: res.data.name || "",
          price: res.data.price || "",
          type: res.data.type || "",
          quantity: res.data.quantity ?? 0,
          picture: null,
        });
      });
    }
  }, [open, productId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      if (files && files[0]) {
        const ext = files[0].name.split(".").pop().toLowerCase();
        if (!["jpg", "jpeg", "png"].includes(ext)) {
          setFileError("Only JPG, JPEG, and PNG files are allowed.");
          setFormData((prev) => ({ ...prev, picture: null }));
          return;
        }
        setFileError("");
        setFormData((prev) => ({ ...prev, picture: files[0] }));
      }
    } else if (name === "quantity") {
      setFormData((prev) => ({
        ...prev,
        quantity: Math.max(0, Number(value)),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const adjustQuantity = (delta) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(0, prev.quantity + delta),
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("type", formData.type);
    data.append("quantity", formData.quantity);
    if (formData.picture) data.append("picture", formData.picture);

    await api.patch(`/api/edit-product/${productId}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setOpen(false);
    onProductUpdated && onProductUpdated();
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
        <Box className="bg-gray-100 p-6 rounded-xl shadow-xl max-w-md mx-auto mt-20 text-gray-800">
          <p className="mb-4 text-gray-700 font-semibold">Edit Product</p>

          <label className="block mb-2 text-gray-600">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 bg-gray-50 p-2 w-full rounded mb-3"
          />

          <label className="block mb-2 text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 bg-gray-50 p-2 w-full rounded mb-3"
          />

          <label className="block mb-2 text-gray-600">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border border-gray-300 bg-gray-50 p-2 w-full rounded mb-3"
          >
            <option value="">Select type</option>
            <option value="Softdrinks">Softdrinks</option>
            <option value="Food">Food</option>
            <option value="Snacks">Snacks</option>
          </select>

          <label className="block mb-2 text-gray-600">Quantity</label>
          <div className="flex items-center gap-2 mb-3">
            <IconButton onClick={() => adjustQuantity(-1)}>
              <ChevronLeftIcon />
            </IconButton>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border border-gray-300 bg-gray-50 p-2 w-24 text-center rounded"
            />
            <IconButton onClick={() => adjustQuantity(1)}>
              <ChevronRightIcon />
            </IconButton>
          </div>

          <label className="block mb-2 text-gray-600">Picture</label>
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            className="mb-2"
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
              disabled={!!fileError}
              variant="contained"
              sx={{ backgroundColor: "#4b5563" }}
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
