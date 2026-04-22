import { useState } from "react";
//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UserContext.jsx";
import Input from "../Components/Input.jsx";
import Button from "../Components/Button.jsx";
import Layout from "../Components/Layout.jsx";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) navigate("/profile");
  };

  return (
    <Layout>
       <div className="text-center mb-8">
        <motion.h2 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-white"
        >
          Welcome Back
        </motion.h2>
      </div>

      <form onSubmit={handleLogin}>
        <Input Icon={Mail} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input Icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <Button type="submit" loading={loading}>Login</Button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/signup" className="text-sm text-blue-400 hover:text-blue-300 transition">
          Don't have an account? Sign up
        </Link>
      </div>
    </Layout>
  );
};


export default LoginPage;