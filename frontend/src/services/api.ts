import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Parece que sua sessão expirou. Faça login novamente.");

      localStorage.removeItem("@cidade-ativa:auth_token");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
