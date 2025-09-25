import React, { useState } from "react";
import Header from "../../components/Header";
import TransportationCard from "../../components/customers/TransportationCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RequestTransportationModal from "../../components/modals/RequestTransportationModal";

function Transportation() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header />
      <div className="mt-24">
        <div
          onClick={handleOpen}
          className="text-4xl fixed bottom-8 left-1/2 -translate-x-1/2 transform cursor-pointer bg-orange-500 rounded-full py-1 px-3"
        >
          +
        </div>

        <TransportationCard />

        <RequestTransportationModal open={open} handleClose={handleClose} />
      </div>
    </>
  );
}

export default Transportation;
