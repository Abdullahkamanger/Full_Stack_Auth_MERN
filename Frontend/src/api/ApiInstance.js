import axios from "axios";


// 1. Create the Axios Instance (Crucial for Cookies)
const api = axios.create({
  baseURL: "https://full-stack-auth-mern-backend.vercel.app/api/auth", // Replace with your backend URL
  withCredentials: true, // This allows the "token" cookie to be sent
});

export default api;