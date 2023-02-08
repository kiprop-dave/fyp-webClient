import axios from "axios";

const baseURL = "https://fyp-server-production.up.railway.app";

const api = axios.create({
  baseURL,
});

export default api;
