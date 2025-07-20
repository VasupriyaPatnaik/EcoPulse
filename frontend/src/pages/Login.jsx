import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        navigate("/dashboard"); // Redirect to dashboard after successful login
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-emerald-900 flex items-center justify-center p-4">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-center relative">
          {/* Back to Home Button */}
          <Link
            to="/"
            className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors flex items-center group"
          >
            <FiArrowLeft className="mr-1 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Home</span>
          </Link>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 mx-auto rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center"
          >
            <span className="text-3xl">🌱</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-white mt-4">Welcome Back</h1>
          <p className="text-emerald-100">Log in to your EcoPulse account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-900/50 text-red-200 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-500" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-gray-400"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-gray-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400 hover:text-emerald-400 transition-colors" />
                ) : (
                  <FiEye className="text-gray-400 hover:text-emerald-400 transition-colors" />
                )}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
              isLoading
                ? "bg-emerald-700 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            } text-white shadow-lg flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <FiUser className="text-lg" />
                Sign In
              </>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}