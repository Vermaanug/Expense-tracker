import axios from "axios";

const apiRequestGlobal = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    timeout: 10000,
  },
});

export default apiRequestGlobal;
