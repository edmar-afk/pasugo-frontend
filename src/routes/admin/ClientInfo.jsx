import React from "react";
import ClientLists from "../../components/admin/ClientLists";
import Header from "../../components/Header";

function ClientInfo() {
  return (
    <>
      <Header />
      <div className="mt-24">
        <ClientLists />
      </div>
    </>
  );
}

export default ClientInfo;
