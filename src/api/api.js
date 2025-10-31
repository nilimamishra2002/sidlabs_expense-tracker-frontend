import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(" Sending token:", token ? token.slice(0, 30) + "..." : "undefined");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
