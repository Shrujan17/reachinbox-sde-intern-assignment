import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

if (!API_BASE) {
  throw new Error("VITE_API_BASE is not defined");
}

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // important for auth if needed
});

// Optional: attach JWT automatically if you store it
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
