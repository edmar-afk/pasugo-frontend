import React, { useState } from "react";
import DeliveryTransactionCard from "../../components/admin/DeliveryTransactionCard";
import TransportTransactionCard from "../../components/admin/TransportTransactionCard";
import Header from "../../components/Header";

function Transaction() {
  const [activeTab, setActiveTab] = useState("deliveries");

  return (
    <>
      <Header />
      <div className="mt-24">
        <div className="mb-6 p-4">
          <p className="text-gray-600 font-bold text-2xl">Transaction History</p>

          <div className="text-gray-800 flex flex-row items-center gap-2">
            <button
              className={`${
                activeTab === "deliveries" ? "font-bold text-blue-600" : ""
              }`}
              onClick={() => setActiveTab("deliveries")}
            >
              Deliveries
            </button>
            <span className="font-light text-gray-300">|</span>
            <button
              className={`${
                activeTab === "transports" ? "font-bold text-blue-600" : ""
              }`}
              onClick={() => setActiveTab("transports")}
            >
              Transports
            </button>
          </div>
        </div>

        {activeTab === "deliveries" && <DeliveryTransactionCard />}
        {activeTab === "transports" && <TransportTransactionCard />}
      </div>
    </>
  );
}

export default Transaction;
