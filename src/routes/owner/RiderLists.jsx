import React from "react";
import RidersLists from "../../components/owner/RidersLists";
import Header from "../../components/Header";

function RiderLists() {
  return (
    <>
      <Header />
      <div className="mt-24">
        <RidersLists />
      </div>
    </>
  );
}

export default RiderLists;
