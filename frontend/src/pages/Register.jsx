import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import axios from "../utils/api";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful:", response.data);
      alert("Registration successful! Redirecting to login...");
      navigate("/login"); // Redirect after successful registration
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error response:", err.response?.data);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-teal-900 flex items-center justify-center p-3 sm:p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal-500/10"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
            }}
            animate={{
              x: [null, Math.random() * 100 - 50],
              y: [null, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-4 sm:p-6 text-center relative">
          {/* Back to Home Button */}
          <Link
            to="/"
            className="absolute top-3 sm:top-4 left-3 sm:left-4 text-white/80 hover:text-white transition-colors flex items-center group"
          >
            <FiArrowLeft className="mr-1 group-hover:-translate-x-1 transition-transform text-sm sm:text-base" />
            <span className="text-xs sm:text-sm">Home</span>
          </Link>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center"
          >
            <span className="text-2xl sm:text-3xl">🌍</span>
          </motion.div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-3 sm:mt-4">Join EcoPulse</h1>
          <p className="text-teal-100 text-sm">Create your sustainable journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
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
            transition={{ delay: 0.1 }}
          >
            <label className="block text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-500 text-sm sm:text-base" />
              </div>
              <input
                type="text"
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-500 text-sm sm:text-base" />
              </div>
              <input
                type="email"
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-gray-400 text-sm sm:text-base"
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
            <label className="block text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-500 text-sm sm:text-base" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEye className="text-gray-400 hover:text-emerald-400 text-sm sm:text-base" />
                ) : (
                  <FiEyeOff className="text-gray-400 hover:text-emerald-400 text-sm sm:text-base" />
                )}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1 sm:mt-2">
              Minimum 8 characters with at least one number
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-500 text-sm sm:text-base" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-gray-400 text-sm sm:text-base"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FiEye className="text-gray-400 hover:text-emerald-400 text-sm sm:text-base" />
                ) : (
                  <FiEyeOff className="text-gray-400 hover:text-emerald-400 text-sm sm:text-base" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center"
          >
            <input
              type="checkbox"
              id="terms"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 bg-gray-700 rounded border-gray-600 focus:ring-emerald-500"
              required
            />
            <label htmlFor="terms" className="ml-2 text-xs sm:text-sm text-gray-300">
              I agree to the{" "}
              <Link to="/terms" className="text-emerald-400 hover:underline">
                Terms & Conditions
              </Link>
            </label>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all text-sm sm:text-base ${
              isLoading
                ? "bg-teal-700 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
            } text-white shadow-lg`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-400 hover:text-teal-300 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
