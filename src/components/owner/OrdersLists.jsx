import { useEffect, useState } from "react";
import api from "../../assets/api";
import OrdersDetailModal from "../modals/OrdersDetailModal";
import DeletePopup from "../../components/DeletePopup";

export default function OrdersLists() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/deliveries/");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const handleOpenDeletePopup = (order) => {
    setOrderToDelete(order);
    setIsDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setOrderToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!orderToDelete) return;
    try {
      await api.delete(`/api/deliveries/${orderToDelete.id}/delete/`);
      handleCloseDeletePopup();
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <>
      <ul role="list" className="divide-y divide-white/5 px-4 mt-4">
        {orders.map((order) => (
          <li key={order.id} className="flex justify-between gap-x-6 py-3">
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={order.products?.picture || "logo.png"}
                className="size-12 flex-none rounded-full object-cover"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {order.products?.name || "No Product"}
                </p>
                <p className="mt-1 truncate text-xs text-gray-400">
                  Order by: {order.customer.first_name || "Unknown"}
                </p>
                <p className="mt-1 truncate text-xs text-gray-400">
                  Rider: {order.rider || "Not yet assigned"}
                </p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-end">
              <div className="flex flex-row items-center">
                <p
                  className="text-xs text-green-600 cursor-pointer hover:underline"
                  onClick={() => handleOpenModal(order)}
                >
                  {order.status}
                </p>

                {(order.status === "Delivered" ||
                  order.status === "Cancelled") && (
                  <>
                    <span className="text-gray-500 mx-2">|</span>
                    <p
                      className="text-red-600 text-xs cursor-pointer hover:underline"
                      onClick={() => handleOpenDeletePopup(order)}
                    >
                      Delete
                    </p>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <OrdersDetailModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onUpdated={fetchOrders}
          order={selectedOrder}
        />
      )}

      {isDeletePopupOpen && (
        <DeletePopup
          message={`Are you sure you want to delete "${orderToDelete?.products?.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeletePopup}
        />
      )}
    </>
  );
}
