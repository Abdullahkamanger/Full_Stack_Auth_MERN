import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UserContext.jsx";
import Input from "../Components/Input.jsx";
import Button from "../Components/Button.jsx";
import Layout from "../Components/Layout.jsx";

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) navigate("/login");
  };

  return (
    <Layout>
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
        >
          Create Account
        </motion.h2>
        <p className="text-gray-400 mt-2">Join our professional community</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input 
          Icon={User} type="text" placeholder="Full Name" 
          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <Input 
          Icon={Mail} type="email" placeholder="Email Address" 
          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <Input 
          Icon={Lock} type="password" placeholder="Password" 
          value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        <Input 
          Icon={Lock} type="password" placeholder="Confirm Password" 
          value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
          required 
        />
        
        <Button type="submit" loading={loading}>
          Sign Up <ArrowRight className="inline-block ml-2 w-5 h-5" />
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default SignupPage;