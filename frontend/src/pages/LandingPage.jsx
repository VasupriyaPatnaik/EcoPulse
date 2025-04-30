// src/pages/LandingPage.jsx
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-green-100 to-green-300">
        <motion.h1
          className="text-5xl font-bold mb-4 text-green-800"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          EcoPulse
        </motion.h1>
        <motion.p
          className="text-lg max-w-xl text-gray-700 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Track your eco-friendly actions, reduce your carbon footprint, and earn rewards. 
          Make sustainable living fun, visual, and impactful!
        </motion.p>
        <motion.a
          href="/dashboard"
          className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-green-800 transition"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.a>
      </section>

      <section className="py-16 px-6 bg-white grid md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
        <div className="shadow p-6 rounded-xl border">
          <h3 className="text-xl font-bold text-green-700 mb-2">🌱 Log Green Actions</h3>
          <p>Record your daily efforts like cycling, saving water, or using public transport.</p>
        </div>
        <div className="shadow p-6 rounded-xl border">
          <h3 className="text-xl font-bold text-green-700 mb-2">📊 Visualize Impact</h3>
          <p>Track your CO₂, energy, and water savings over time with engaging charts.</p>
        </div>
        <div className="shadow p-6 rounded-xl border">
          <h3 className="text-xl font-bold text-green-700 mb-2">🏆 Earn Rewards</h3>
          <p>Unlock badges, climb leaderboards, and participate in weekly sustainability challenges.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
