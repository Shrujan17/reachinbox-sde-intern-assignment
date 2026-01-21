import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

if (!API_BASE) {
  throw new Error("VITE_API_BASE is not defined");
}

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export default api;
