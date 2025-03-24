import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://formloginbackend.onrender.com",
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API error : ", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
