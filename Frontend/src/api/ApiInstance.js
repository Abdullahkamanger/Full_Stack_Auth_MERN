import axios from "axios";


// 1. Create the Axios Instance (Crucial for Cookies)
const api = axios.create({
  baseURL: "http://localhost:3000/api/auth", // Replace with your backend URL
  withCredentials: true, // This allows the "token" cookie to be sent
});

export default api;