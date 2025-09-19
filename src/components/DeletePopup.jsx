import React from "react";

function DeletePopup({ message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-xl text-center w-80 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-extrabold text-red-600">{message}</p>
        <p className="text-xs text-gray-500 mt-2">This action cannot be undone.</p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl shadow hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
