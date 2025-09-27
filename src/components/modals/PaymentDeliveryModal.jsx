import React, { useState, useEffect  } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import api from "../../assets/api";

function PaymentDeliveryModal({ deliveryId, payment, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(!!payment);
  const [currentPayment, setCurrentPayment] = useState(payment || null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setCurrentPayment(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("payment", selectedFile);

    try {
      const response = await api.put(
        `/api/deliveries/${deliveryId}/payment/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSubmitted(true);
      setCurrentPayment(response.data.payment); // ✅ new server image

      if (onSuccess) {
        onSuccess(response.data); // ✅ tell parent delivery updated
      }

      // ✅ clear local state
      setSelectedFile(null);
      setPreview(null);

      // ✅ close modal so when reopened, new image shows
      setOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  useEffect(() => {
  if (payment) {
    setCurrentPayment(payment);
    setSubmitted(true);
  }
}, [payment]);

  return (
    <>
      {submitted ? (
        <p
          className="text-green-600 text-xs cursor-pointer"
          onClick={handleOpen}
        >
          Payment Submitted
        </p>
      ) : (
        <p
          className="text-blue-600 text-xs cursor-pointer"
          onClick={handleOpen}
        >
          Upload Payment
        </p>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            color: "gray",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ color: "gray" }}>
              {submitted ? "Payment Proof" : "Upload Payment"}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {(preview || currentPayment) && (
            <Box mt={2} textAlign="center">
              <Box
                sx={{
                  maxHeight: 250,
                  overflowY: "auto",
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  p: 1,
                }}
              >
                <img
                  src={preview || currentPayment}
                  alt="Payment Proof"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Box>
              {submitted && !preview && (
                <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
                  If something is wrong, upload a new image below.
                </Typography>
              )}
            </Box>
          )}

          <Box mt={2} textAlign="center">
            <input
              type="file"
              accept="image/*"
              id={`upload-input-${deliveryId}`}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor={`upload-input-${deliveryId}`}>
              <IconButton
                component="span"
                sx={{
                  border: "2px dashed gray",
                  borderRadius: 2,
                  p: 4,
                  color: "gray",
                }}
              >
                <UploadFileIcon fontSize="large" />
              </IconButton>
            </label>
            <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
              {submitted ? "Replace Payment" : "Click to upload an image"}
            </Typography>
          </Box>

          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!selectedFile}
            >
              {submitted ? "Update Payment" : "Submit"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default PaymentDeliveryModal;
