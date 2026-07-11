import axios from "axios";

const authService = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach JWT to every request
authService.interceptors.request.use(
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

export default authService;