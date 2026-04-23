//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../Context/UserContext.jsx";
import { User, Mail, Calendar, Edit, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout.jsx";
import AnimatedPage from "../Components/AnimatePage.jsx";
import { useState } from "react";

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const [isError, setIsError] = useState(false);

    // Animation variants for staggered list items
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    const handleLogout = async () => {
        const result = await logout();
        if (!result.success) {
            setIsError(true);
            setTimeout(() => setIsError(false), 500);
        }
    };

    return (
        <AnimatedPage isError={isError}>
            <Layout>
            <div className="text-center mb-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center border-4 border-gray-700 shadow-xl mb-4"
                >
                    <User size={48} className="text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            </div>

            <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                <motion.div variants={item} className="bg-gray-900 bg-opacity-40 p-4 rounded-xl border border-gray-700 flex items-center gap-4">
                    <Mail className="text-blue-500" />
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Email Address</p>
                        <p className="text-gray-200">{user?.email}</p>
                    </div>
                </motion.div>

                <motion.div variants={item} className="bg-gray-900 bg-opacity-40 p-4 rounded-xl border border-gray-700 flex items-center gap-4">
                    <Calendar className="text-blue-500" />
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Joined On</p>
                        <p className="text-gray-200">{new Date(user?.createdAt).toLocaleDateString()}</p>
                    </div>
                </motion.div>
            </motion.div>

            <div className="mt-8 flex gap-4">
                <Link to="/update-profile" className="flex-1">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                        <Edit size={18} /> Edit Profile
                    </motion.button>
                </Link>
                <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 bg-red-500 bg-opacity-20 hover:bg-opacity-30 text-red-500 rounded-lg border border-red-500 flex items-center justify-center"
                >
                    <LogOut size={18} />
                </motion.button>
            </div>
        </Layout>
        </AnimatedPage>
    );
};

export default ProfilePage;