// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Button = ({ children, onClick, loading, type = "button", className = "" }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type={type}
            onClick={onClick}
            className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-800 transition duration-200 disabled:opacity-50 ${className}`}
        >
            {loading ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
            ) : (
                children
            )}
        </motion.button>
    );
};

export default Button;