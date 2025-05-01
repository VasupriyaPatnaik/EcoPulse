import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900 flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center bg-gradient-to-br from-green-100 to-green-300">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold mb-4 text-green-800"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          EcoPulse
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl max-w-2xl text-gray-700 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Track your eco-friendly actions, reduce your carbon footprint, and earn rewards. 
          Make sustainable living fun, visual, and impactful!
        </motion.p>

        <motion.a
          href="/dashboard"
          className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-green-800 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.a>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white grid md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
        {[
          {
            icon: "🌱",
            title: "Log Green Actions",
            description: "Record your daily efforts like cycling, saving water, or using public transport."
          },
          {
            icon: "📊",
            title: "Visualize Impact",
            description: "Track your CO₂, energy, and water savings over time with engaging charts."
          },
          {
            icon: "🏆",
            title: "Earn Rewards",
            description: "Unlock badges, climb leaderboards, and participate in weekly sustainability challenges."
          }
        ].map((feature, idx) => (
          <div key={idx} className="shadow p-6 rounded-xl border bg-white hover:shadow-lg transition duration-200">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              {feature.icon} {feature.title}
            </h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
