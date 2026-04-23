import axios from "axios";


// 1. Create the Axios Instance (Crucial for Cookies)
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
  withCredentials: true, // This allows the "token" cookie to be sent
});

export default api;