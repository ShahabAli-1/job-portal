import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // backend URL
  withCredentials: true, // Enable sending cookies with requests
});

export default axiosInstance;
