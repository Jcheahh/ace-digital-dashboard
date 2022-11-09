import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
});

http.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};
    if (status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default http;
