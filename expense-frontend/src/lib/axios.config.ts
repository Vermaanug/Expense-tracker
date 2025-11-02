import axios from "axios";

const apiRequestGlobal = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    timeout: 10000,
  },
});

export default apiRequestGlobal;
