import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // backend URL if different
  withCredentials: true, // Enable sending cookies with requests
});

export default axiosInstance;
