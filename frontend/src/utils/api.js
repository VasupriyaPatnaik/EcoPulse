import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 change to backend URL if deployed
  withCredentials: true,
});

export default instance;
