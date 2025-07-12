import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiDroplet, FiZap, FiAward, FiCalendar, FiBarChart2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  // State for stats with animation triggers
  const [stats, setStats] = useState([
    { label: "CO₂ Saved", value: 0, target: 12.5, unit: "kg", color: "bg-green-100", icon: <FiTrendingUp className="text-green-600" /> },
    { label: "Water Saved", value: 0, target: 89, unit: "L", color: "bg-blue-100", icon: <FiDroplet className="text-blue-600" /> },
    { label: "Energy Saved", value: 0, target: 6.3, unit: "kWh", color: "bg-yellow-100", icon: <FiZap className="text-yellow-600" /> }
  ]);

  // Animated counter effect
  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const initialStats = [
      { label: "CO₂ Saved", value: 0, target: 12.5, unit: "kg", color: "bg-green-100", icon: <FiTrendingUp className="text-green-600" /> },
      { label: "Water Saved", value: 0, target: 89, unit: "L", color: "bg-blue-100", icon: <FiDroplet className="text-blue-600" /> },
      { label: "Energy Saved", value: 0, target: 6.3, unit: "kWh", color: "bg-yellow-100", icon: <FiZap className="text-yellow-600" /> }
    ];

    const increment = (stat, index) => {
      const start = Date.now();
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(stat.target * progress * 10) / 10;
        
        setStats(prev => prev.map((s, i) => 
          i === index ? { ...s, value: currentValue } : s
        ));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    initialStats.forEach((stat, index) => increment(stat, index));
  }, []); // Empty dependency array is correct here

  // Badges with unlock status
  const [badges] = useState([
    { name: "Water Warrior", earned: true, description: "Saved 50+ liters of water" },
    { name: "Carbon Cutter", earned: true, description: "Reduced CO₂ by 5+ kg" },
    { name: "Energy Saver", earned: true, description: "Saved 5+ kWh energy" },
    { name: "Eco Champion", earned: false, description: "Complete all weekly challenges" },
    { name: "Green Guru", earned: false, description: "30-day streak" }
  ]);

  // Weekly challenge state
  const [challenge, setChallenge] = useState({
    title: "🚴 Car-Free Commute",
    description: "Avoid using your car for 3 days this week!",
    progress: 1,
    goal: 3,
    joined: false
  });

  // Recent activities
  const [activities] = useState([
    { action: "Used reusable bottle", points: 10, time: "2h ago" },
    { action: "Recycled 3 items", points: 15, time: "Yesterday" },
    { action: "Walked to work", points: 20, time: "2 days ago" }
  ]);

  // Join challenge function
  const joinChallenge = () => {
    setChallenge(prev => ({ ...prev, joined: true }));
    // Trigger confetti effect
    if (typeof window !== 'undefined') {
      import("canvas-confetti").then(confetti => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    }
  };

  // Progress bar component
  const ProgressBar = ({ progress, total }) => {
    const percentage = Math.min((progress / total) * 100, 100);
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
          className="h-2.5 rounded-full bg-green-600"
        />
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Animated Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Welcome Back, {user?.name || 'Eco Hero'}! <span className="text-3xl">🌍</span>
          </h1>
          <p className="text-gray-600">Keep up the great work saving our planet!</p>
        </motion.div>

        {/* Stats Grid with Animated Counters */}
        <section className="grid md:grid-cols-3 gap-6 mb-10">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-xl shadow-lg ${item.color} text-center`}
            >
              <div className="flex justify-center mb-3 text-2xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
              <p className="text-3xl font-bold">
                {item.value.toFixed(1)}{item.unit}
              </p>
              <ProgressBar progress={item.value} total={item.target} />
              <p className="text-sm mt-2 text-gray-600">
                {((item.value / item.target) * 100).toFixed(0)}% of monthly goal
              </p>
            </motion.div>
          ))}
        </section>

        {/* Streaks and Points */}
        <section className="grid md:grid-cols-2 gap-6 mb-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-green-500"
          >
            <div className="flex items-center mb-3">
              <FiCalendar className="text-green-600 mr-2 text-xl" />
              <h2 className="text-xl font-bold text-green-700">🔥 Weekly Streak</h2>
            </div>
            <p className="mb-2">
              You've logged green actions for <strong>5</strong> consecutive days!
            </p>
            <div className="flex mt-4">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    day <= 5 ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-yellow-500"
          >
            <div className="flex items-center mb-3">
              <FiBarChart2 className="text-yellow-600 mr-2 text-xl" />
              <h2 className="text-xl font-bold text-yellow-700">⭐ EcoPoints</h2>
            </div>
            <p className="mb-4">
              Total earned: <strong>320</strong> points
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-yellow-500 h-4 rounded-full"
                style={{ width: "64%" }}
              ></div>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              64% to next level (Eco Champion)
            </p>
          </motion.div>
        </section>

        {/* Badges with Interactive Popups */}
        <section className="mb-10">
          <div className="flex items-center mb-4">
            <FiAward className="text-green-600 mr-2 text-xl" />
            <h2 className="text-xl font-bold text-green-700">🏅 Your Badges</h2>
          </div>
          <div className="flex gap-4 flex-wrap">
            {badges.map((badge, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 bg-white border rounded-lg shadow text-center w-40 ${
                  badge.earned ? "" : "opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">
                  {badge.earned ? "🏆" : "🔒"}
                </div>
                <p className="font-semibold">{badge.name}</p>
                {badge.earned && (
                  <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Weekly Challenge with Join Button */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
            <FiZap className="mr-2" /> 💪 Weekly Challenge
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-blue-500"
          >
            <h3 className="text-lg font-bold mb-2">{challenge.title}</h3>
            <p className="mb-4">{challenge.description}</p>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Progress:</span>
                <span>
                  {challenge.progress}/{challenge.goal} days
                </span>
              </div>
              <ProgressBar progress={challenge.progress} total={challenge.goal} />
            </div>
            {!challenge.joined ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={joinChallenge}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
              >
                Join Challenge
              </motion.button>
            ) : (
              <div className="flex items-center text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Challenge Accepted!</span>
              </div>
            )}
          </motion.div>
        </section>

        {/* Recent Activities */}
        <section>
          <h2 className="text-xl font-bold text-green-700 mb-4">📝 Recent Activities</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {activities.map((activity, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      +{activity.points} pts
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="p-4 text-center border-t border-gray-200">
              <button className="text-green-600 hover:text-green-800 font-medium">
                View All Activities →
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
