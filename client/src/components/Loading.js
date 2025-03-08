import React from "react";
import { useTheme } from "../context/ThemeContext";

function Loading() {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div
          className={`w-16 h-16 rounded-full ${
            isDarkMode
              ? "border-t-blue-500 border-r-blue-500"
              : "border-t-orange-500 border-r-orange-500"
          } border-4 border-gray-200 animate-spin`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-2xl ${
              isDarkMode ? "text-blue-500" : "text-orange-500"
            }`}
          >
            🍳
          </span>
        </div>
      </div>
      <div
        className={`ml-4 text-lg font-medium ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Loading...
      </div>
    </div>
  );
}

export default Loading;
