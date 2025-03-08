import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      toast.success("Logged in successfully");
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div
        className={`rounded-lg shadow-md p-6 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-6 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className={`font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full mt-1 p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              }`}
              required
            />
          </div>

          <div>
            <label
              className={`font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full mt-1 p-2 rounded border ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
              }`}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded font-semibold ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Login
          </button>
        </form>

        <p
          className={`mt-4 text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className={`font-semibold ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
