import React, { useState, useRef } from "react";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Back from "../components/Back";
import api from "../assets/api";
import AlertPopup from "../components/AlertPopup";
function Register() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ State for modal

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMobileChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value.startsWith("09")) {
      value = "09" + value.replace(/^0+/, "");
    }
    if (value.length > 11) return;
    setFormData({ ...formData, username: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;

    const data = new FormData();
    data.append("first_name", formData.full_name);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (profilePic) data.append("profile_picture", profilePic);

    try {
      await api.post("/api/register/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowSuccess(true); // ✅ Show alert
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please check your input.");
    }
  };

  const passwordsMatch =
    formData.password.length > 0 &&
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const validMobileNumber =
    formData.username.length === 11 && formData.username.startsWith("09");

  return (
    <>
      {showSuccess && (
        <AlertPopup
          message="Registration successful!"
          onClose={() => navigate("/login")}
        />
      )}
      <Back />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-24 w-auto" src={logo} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your account
          </h2>
          <div className="flex flex-col items-center">
            <p className="mt-2 text-center text-xs text-orange-500">OR</p>
            <Link
              to="/login"
              className="font-medium mt-2 text-orange-500 hover:text-orange-600"
            >
              Login to Your Account
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* ✅ FULL NAME FIELD */}
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring focus:ring-orange-200"
                />
              </div>

              <div className="mt-6">
                <label className="block text-xs font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleMobileChange}
                  placeholder="09123456789"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring focus:ring-orange-200"
                />
              </div>

              <div className="mt-6">
                <label className="block text-xs font-medium text-gray-700">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring focus:ring-orange-200"
                />
              </div>

              <div className="mt-6">
                <label className="block text-xs font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role || "Rider"}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring focus:ring-orange-200"
                >
                  <option value="Rider">Rider</option>
                  <option value="Courier">Courier</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleChooseFile}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-xs"
                >
                  Choose Profile Picture
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
                {preview && (
                  <div className="mt-4 border border-gray-600">
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-44 object-cover mx-auto border"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring focus:ring-orange-200"
                />
              </div>

              <div className="mt-6">
                <label className="block text-xs font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring focus:ring-orange-200"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={!passwordsMatch || !validMobileNumber}
                  className={`w-full flex justify-center py-2 px-4 rounded-md text-white ${
                    passwordsMatch && validMobileNumber
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-orange-200 cursor-not-allowed"
                  }`}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
