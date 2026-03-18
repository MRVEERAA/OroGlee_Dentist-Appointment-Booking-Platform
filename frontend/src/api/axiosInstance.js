import axios from "axios";

const api = axios.create({
  baseURL: "https://oroglee-dentist-appointment-booking.onrender.com",
});

// Add Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
