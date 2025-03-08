import axios from "axios";

export const API_BASE_URL = "http://localhost:5001/api";

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  ME: `${API_BASE_URL}/auth/me`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
};

// Recipe endpoints
export const RECIPE_ENDPOINTS = {
  LIST: `${API_BASE_URL}/recipes`,
  DETAIL: (id) => `${API_BASE_URL}/recipes/${id}`,
  CREATE: `${API_BASE_URL}/recipes`,
  UPDATE: (id) => `${API_BASE_URL}/recipes/${id}`,
  DELETE: (id) => `${API_BASE_URL}/recipes/${id}`,
};

// Create axios instance with default config
export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
