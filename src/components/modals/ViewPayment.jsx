import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ViewPayment({ paymentImg }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <p onClick={handleOpen} className="ml-2 text-blue-600 font-bold text-xs truncate">
        View Payment
      </p>

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
            borderRadius: 2,
            p: 2,
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <p className="text-orange-600 text-xl font-bold px-4">
              Payment Proof
            </p>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {paymentImg ? (
            <img
              src={paymentImg}
              alt="Payment Proof"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginTop: "8px",
              }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              No payment image available
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}
