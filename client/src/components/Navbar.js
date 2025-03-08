import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  FaSun,
  FaMoon,
  FaUtensils,
  FaSignOutAlt,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className={`flex items-center space-x-2 text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <FaUtensils className="text-orange-500" />
            <span>Recipe App</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/add"
                  className={`add-recipe-btn flex items-center space-x-2`}
                >
                  <span>Add Recipe</span>
                  <FaUtensils className="text-lg" />
                </Link>

                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    isDarkMode
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  } transform hover:scale-105 hover:shadow-lg`}
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>

                <Link
                  to="/signup"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200`}
                >
                  <FaUserPlus />
                  <span>Sign Up</span>
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className={`theme-toggle-btn ${
                isDarkMode ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
