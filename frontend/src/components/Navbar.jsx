import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.nav 
      className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm border-b border-green-100"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-700">
          EcoPulse
        </Link>
        <div className="flex gap-6">
          <Link to="/login" className="text-green-800 hover:text-green-600 transition-colors">
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-4 py-2 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}