import { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
import toast from "react-hot-toast";
import api from "../api/ApiInstance.js"; // Import the configured Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data } = await api.get("/user/"); 
        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // If it fails, the user is just not logged in (Unauthorized)
        toast.error(`Please log in to continue ${error.response?.data?.message || ""}`);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  // 3. Centralized Auth Actions
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/login", { email, password });
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success("Welcome back!");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.get("/logout");
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(`Logout failed ${error.response?.data?.message || ""}`);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await api.post("/register", userData);
      toast.success(data.message || "Registration successful!");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      login, 
      logout, 
      register,
      setUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom Hook for cleaner usage in components
export const useAuth = () => useContext(AuthContext);