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
        <Route path="/client-lists" element={<ClientInfo />} />
        <Route path="/products" element={<Products />} />

        <Route path="/customer-home" element={<Home />} />
        <Route path="/deliver-map/:userid/:productid" element={<DeliveryMap/>} />
        <Route path="/customer-deliveries" element={<CustomerDeliveries />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
