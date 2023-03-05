import axios from "axios";

const productionUrl = "https://fyp-server-production.up.railway.app";
const developmentUrl = "http://localhost:5000";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? productionUrl : developmentUrl,
});

export default api;
