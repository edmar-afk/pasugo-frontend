import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./routes/Welcome";
import Login from "./routes/Login";
import Register from "./routes/Register";
import AdminHome from "./routes/admin/AdminHome";
import Chat from "./routes/Chat";
import ClientInfo from "./routes/admin/ClientInfo";
import Home from "./routes/customers/Home";
import Products from "./routes/admin/Products";
import DeliveryMap from "./routes/customers/DeliveryMap";
import CustomerDeliveries from "./routes/customers/CustomerDeliveries";
import RiderLists from "./routes/owner/RiderLists";
import Orders from "./routes/owner/Orders";
import Transportation from "./routes/customers/Transportation";
import RiderHome from "./routes/rider-courier/RiderHome";
import TransportationServices from "./routes/admin/TransportationServices";
import RiderTransport from "./routes/rider-courier/RiderTransport";
import CourierHome from "./routes/rider-courier/CourierHome";
import Deliveries from "./routes/admin/Deliveries";
import Transaction from "./routes/admin/Transaction";
import Room from "./routes/Room";
function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-deliveries" element={<Deliveries />} />
        <Route path="/client-lists" element={<ClientInfo />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/transport-services"
          element={<TransportationServices />}
        />
        <Route path="/admin-transactions" element={<Transaction />} />

        <Route path="/customer-home" element={<Home />} />
        <Route
          path="/deliver-map/:userid/:productid"
          element={<DeliveryMap />}
        />
        <Route path="/customer-deliveries" element={<CustomerDeliveries />} />
        <Route path="/customer-transportation" element={<Transportation />} />

        <Route path="/chats" element={<Chat />} />
        <Route path="/room/:currentUserId/:userId" element={<Room />} />

        <Route path="/rider-lists" element={<RiderLists />} />
        <Route path="/owner-orders" element={<Orders />} />

        <Route path="/rider-home" element={<RiderHome />} />
        <Route path="/rider-transports" element={<RiderTransport />} />

        <Route path="/courier-home" element={<CourierHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
