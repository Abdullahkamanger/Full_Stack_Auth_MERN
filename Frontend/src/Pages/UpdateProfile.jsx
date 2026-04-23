import { useState } from "react";
import { useAuth } from "../Context/UserContext.jsx";
import { User, Mail, Lock, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/ApiInstance.js";
import Layout from "../Components/Layout.jsx";
import Input from "../Components/Input.jsx";
import Button from "../Components/Button.jsx";
import toast from "react-hot-toast";
import AnimatedPage from "../Components/AnimatePage.jsx";

const UpdateProfilePage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/update", formData); // Ensure route matches backend
      setUser(data.user);
      toast.success("Profile updated!");
    } catch (error) {
      setIsError(true);
      // Optional: Reset shake after it plays so it can play again on next error
      setTimeout(() => setIsError(false), 500);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage isError={isError}>
      <Layout>
        <div className="flex items-center gap-4 mb-6">
          <Link to="/profile" className="text-gray-400 hover:text-white transition">
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-2xl font-bold">Update Profile</h2>
        </div>

        <form onSubmit={handleUpdate}>
          <Input Icon={User} type="text" placeholder="Full Name" value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
          
          <Input Icon={Mail} type="email" placeholder="Email Address" value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})} />

          <div className="border-t border-gray-700 my-6 pt-6">
            <p className="text-xs text-gray-500 mb-4 uppercase">Change Password (Optional)</p>
            <Input Icon={Lock} type="password" placeholder="New Password" value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <Input Icon={Lock} type="password" placeholder="Confirm New Password" value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          </div>

          <Button type="submit" loading={loading}>
            <Save className="inline-block mr-2 w-5 h-5" /> Save Changes
          </Button>
        </form>
      </Layout>
    </AnimatedPage>
  );
};

export default UpdateProfilePage;