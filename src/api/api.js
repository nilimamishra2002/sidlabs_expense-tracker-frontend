import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV
      ? "http://localhost:5000/api"
      : "https://sidlabs-expense-tracker-backend.onrender.com/api"),
});

console.log(" API base URL:", API.defaults.baseURL);  // <-- ADD THIS LINE

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(" Sending token:", token ? token.slice(0, 30) + "..." : "undefined");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
