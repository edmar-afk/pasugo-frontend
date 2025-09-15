import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./routes/Welcome";
import Login from "./routes/Login";
import Register from "./routes/Register";
import AdminHome from "./routes/admin/AdminHome";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
