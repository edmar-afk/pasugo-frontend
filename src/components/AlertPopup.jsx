import React from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

function AlertPopup({ message, type = "success", onClose }) {
  const isError = type === "error";
  const isPayment = type === "payment";

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-xl text-center w-72 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        {!isPayment && (
          <>
            {isError ? (
              <SentimentDissatisfiedIcon
                className="text-red-600"
                fontSize="large"
              />
            ) : (
              <DoneAllIcon className="text-green-600" fontSize="large" />
            )}
          </>
        )}

        <p
          className={
            isPayment
              ? "text-base font-medium text-black"
              : `text-lg font-extrabold ${
                  isError ? "text-red-600" : "text-green-600"
                }`
          }
        >
          {message}
        </p>

        <p className="text-xs text-gray-500 mt-2">Click anywhere to continue</p>
      </div>
    </div>
  );
}

export default AlertPopup;
