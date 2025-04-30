// src/pages/Dashboard.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Welcome Back, Eco Hero! 🌍</h1>

        {/* Stats Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "CO₂ Saved", value: "12.5 kg", color: "bg-green-100" },
            { label: "Water Saved", value: "89 L", color: "bg-blue-100" },
            { label: "Energy Saved", value: "6.3 kWh", color: "bg-yellow-100" }
          ].map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow ${item.color} text-center`}
            >
              <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Streaks + Points */}
        <section className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-bold text-green-700 mb-2">🔥 Weekly Streak</h2>
            <p>You’ve logged green actions for <strong>5</strong> consecutive days!</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-xl font-bold text-green-700 mb-2">⭐ Points</h2>
            <p>Total EcoPoints earned: <strong>320</strong></p>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-4">🏅 Badges</h2>
          <div className="flex gap-4 flex-wrap">
            {["Water Warrior", "Carbon Cutter", "Energy Saver"].map((badge, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border rounded-lg shadow text-center"
              >
                <p className="font-semibold">{badge}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section>
          <h2 className="text-xl font-bold text-green-700 mb-4">💪 Weekly Challenge</h2>
          <div className="p-6 bg-white rounded-xl shadow">
            <p>🚴 This week’s challenge: Avoid using your bike or car for 3 days!</p>
            <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
              Join Challenge
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
