import OrdersLists from "../../components/owner/OrdersLists";
import Header from "../../components/Header";
export default function Deliveries() {
  return (
    <>
      <Header />
      <div className="mt-24">
        <p className="text-gray-800 font-bold mb-8 text-lg px-4">
          {" "}
          Customers' Orders
        </p>
        <OrdersLists />
      </div>
    </>
  );
}
