import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Back from "../components/Back";
import api from "../assets/api";
import AlertPopup from "../components/AlertPopup";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ mobile_number: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/api/login/", {
        username: formData.mobile_number,
        password: formData.password,
      });

      const {
        access,
        refresh,
        username,
        email,
        first_name,
        last_name,
        is_staff,
        is_superuser,
      } = response.data;

      const userData = {
        access,
        refresh,
        username,
        email,
        first_name,
        last_name,
        is_staff,
        is_superuser,
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      setAlert({
        show: true,
        message: "Login successful!",
        type: "success",
      });

      setTimeout(() => {
        if (is_superuser && is_staff) {
          navigate("/admin-home");
        } else if (is_superuser && !is_staff) {
          navigate("/owner-home");
        } else if (is_staff) {
          navigate("/staff-home");
        } else {
          navigate("/home");
        }
      }, 1000);
    } catch (error) {
      setAlert({
        show: true,
        message: "Invalid mobile number or password!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {alert.show && (
        <AlertPopup
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <Back />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-24 w-auto" src={logo} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Login to your account
          </h2>
          <div className="flex flex-col items-center justify-center">
            <p className="mt-2 text-sm leading-5 text-orange-500">OR</p>
            <Link
              to="/register"
              className="font-medium mt-2 text-orange-500 hover:text-orange-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Create a New Account
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="mobile_number"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Mobile Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="mobile_number"
                    name="mobile_number"
                    placeholder="09xxxxxxxxx"
                    type="tel"
                    required
                    value={formData.mobile_number}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:shadow-outline-orange focus:border-orange-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:shadow-outline-orange focus:border-orange-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember"
                    type="checkbox"
                    value="1"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm leading-5 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                      loading
                        ? "bg-orange-300 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-500"
                    } focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out`}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
