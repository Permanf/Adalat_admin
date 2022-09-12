import axios from "axios";
import Cookie from "js-cookie";

const token = Cookie.get("admin_token");

// export const MAIN_URL = "http://95.85.124.22:1010";
// export const MAIN_URL = "http://http://95.85.124.22:18080";
// export const API_URL = `${MAIN_URL}/api`;
export const API_URL = "https://minjust.gov.tm/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = token ? `Bearer ${token}` : null;

  return config;
});

export default api;
