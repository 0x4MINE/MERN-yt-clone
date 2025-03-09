import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mern-yt-clone.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
