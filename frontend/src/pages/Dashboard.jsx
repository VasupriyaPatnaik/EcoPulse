import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiDroplet, FiZap, FiAward, FiCalendar, FiBarChart2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import api from "../utils/api";

export default function Dashboard() {
  const { user } = useAuth();
  const { refreshTrigger } = useDashboard();

  // Utility functions for streak calculation
  const getStartOfWeek = (date = new Date()) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; // Sunday is 0, so this gets the Sunday of the week
    return new Date(d.setDate(diff));
  };

  const getDayOfWeek = (date) => {
    return new Date(date).getDay(); // 0 = Sunday, 1 = Monday, etc.
  };

  const calculateWeeklyStreak = useCallback((activities) => {
    if (!activities || activities.length === 0) {
      return { streakDays: 0, weeklyActivityDays: [] };
    }

    // Get current week start (Sunday)
    const weekStart = getStartOfWeek();
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Saturday

    // Filter activities from this week and get unique days
    const thisWeekActivities = activities.filter(activity => {
      const activityDate = new Date(activity.timestamp);
      return activityDate >= weekStart && activityDate <= weekEnd;
    });

    // Get unique days when activities were logged
    const uniqueDays = [...new Set(
      thisWeekActivities.map(activity => 
        new Date(activity.timestamp).toDateString()
      )
    )];

    // Calculate consecutive days from start of week
    let streakDays = 0;
    const today = new Date();
    const currentDayOfWeek = today.getDay();

    // Check each day from Sunday to today
    for (let i = 0; i <= currentDayOfWeek; i++) {
      const checkDate = new Date(weekStart);
      checkDate.setDate(weekStart.getDate() + i);
      
      const hasActivity = uniqueDays.some(day => 
        new Date(day).toDateString() === checkDate.toDateString()
      );

      if (hasActivity) {
        streakDays++;
      } else {
        // If there's a gap, reset streak (but only count up to yesterday)
        // Don't break streak if today hasn't been completed yet
        if (checkDate.toDateString() !== today.toDateString()) {
          streakDays = 0;
        }
      }
    }

    return {
      streakDays,
      weeklyActivityDays: uniqueDays.map(day => getDayOfWeek(new Date(day)))
    };
  }, []); // Empty dependency array since it doesn't depend on any props or state
  
  // Dynamic state for real user data
  const [dashboardData, setDashboardData] = useState({
    ecoStats: {
      totalPoints: 0,
      co2Saved: 0,
      waterSaved: 0,
      energySaved: 0,
      activitiesLogged: 0,
      streakDays: 0,
      lastActivityDate: null,
      weeklyActivityDays: [] // Array of dates when activities were logged this week
    },
    recentActivities: [],
    badges: [],
    currentChallenge: {
      title: "🚴 Car-Free Commute",
      joined: false,
      progress: 0,
      goal: 3
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // State for stats with animation triggers
  const [stats, setStats] = useState([
    { label: "CO₂ Saved", value: 0, target: 0, unit: "kg", color: "bg-green-100", icon: <FiTrendingUp className="text-green-600" /> },
    { label: "Water Saved", value: 0, target: 0, unit: "L", color: "bg-blue-100", icon: <FiDroplet className="text-blue-600" /> },
    { label: "Energy Saved", value: 0, target: 0, unit: "kWh", color: "bg-yellow-100", icon: <FiZap className="text-yellow-600" /> }
  ]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/eco/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const responseData = response.data;
        
        // Calculate weekly streak from activities
        const streakData = calculateWeeklyStreak(responseData.recentActivities);
        
        // Update dashboard data with calculated streak
        const updatedData = {
          ...responseData,
          ecoStats: {
            ...responseData.ecoStats,
            streakDays: streakData.streakDays,
            weeklyActivityDays: streakData.weeklyActivityDays,
            lastActivityDate: responseData.recentActivities.length > 0 
              ? responseData.recentActivities[0].timestamp 
              : null
          }
        };
        
        setDashboardData(updatedData);
        
        // Update stats with real data
        const { ecoStats } = updatedData;
        setStats([
          { 
            label: "CO₂ Saved", 
            value: 0, 
            target: ecoStats.co2Saved, 
            unit: "kg", 
            color: "bg-green-100", 
            icon: <FiTrendingUp className="text-green-600" /> 
          },
          { 
            label: "Water Saved", 
            value: 0, 
            target: ecoStats.waterSaved, 
            unit: "L", 
            color: "bg-blue-100", 
            icon: <FiDroplet className="text-blue-600" /> 
          },
          { 
            label: "Energy Saved", 
            value: 0, 
            target: ecoStats.energySaved, 
            unit: "kWh", 
            color: "bg-yellow-100", 
            icon: <FiZap className="text-yellow-600" /> 
          }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
    
    // Add focus event listener to refresh data when user comes back to tab
    const handleFocus = () => {
      if (user && !isLoading) {
        fetchDashboardData();
      }
    };
    
    // Add visibility change listener to refresh data when user comes back to tab
    const handleVisibilityChange = () => {
      if (!document.hidden && user && !isLoading) {
        fetchDashboardData();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, isLoading, refreshTrigger, calculateWeeklyStreak]); // Add calculateWeeklyStreak to dependencies

  // Effect to check for date changes and update streak
  useEffect(() => {
    if (!user || isLoading) return;

    const checkDateChange = () => {
      const now = new Date();
      const lastCheck = localStorage.getItem('lastStreakCheck');
      const today = now.toDateString();

      // If it's a new day, recalculate the streak
      if (lastCheck !== today) {
        localStorage.setItem('lastStreakCheck', today);
        
        // Recalculate streak with current activities
        if (dashboardData.recentActivities.length > 0) {
          const streakData = calculateWeeklyStreak(dashboardData.recentActivities);
          
          setDashboardData(prev => ({
            ...prev,
            ecoStats: {
              ...prev.ecoStats,
              streakDays: streakData.streakDays,
              weeklyActivityDays: streakData.weeklyActivityDays
            }
          }));
        }
      }
    };

    // Check immediately
    checkDateChange();

    // Set up interval to check every minute for date changes
    const interval = setInterval(checkDateChange, 60000);

    // Also check when the page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkDateChange();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, isLoading, dashboardData.recentActivities, calculateWeeklyStreak]); // Add calculateWeeklyStreak to dependencies

  // Animated counter effect
  useEffect(() => {
    if (isLoading) return;
    
    const duration = 2000; // Animation duration in ms

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

    stats.forEach((stat, index) => increment(stat, index));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]); // Intentionally excluding stats to prevent infinite loop

  // Badges with unlock status - now using dynamic data
  const badges = dashboardData.badges;

  // Weekly challenge state - now using dynamic data
  const [challenge, setChallenge] = useState(dashboardData.currentChallenge);

  // Recent activities - now using dynamic data
  const activities = dashboardData.recentActivities;

  // Update challenge state when dashboardData changes
  useEffect(() => {
    setChallenge(dashboardData.currentChallenge);
  }, [dashboardData.currentChallenge]);

  // Join challenge function
  const joinChallenge = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put('/eco/challenge', {
        joined: true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Update challenge with the response from backend
      setChallenge(response.data.currentChallenge);
      
      // Also update the dashboard data
      setDashboardData(prev => ({
        ...prev,
        currentChallenge: response.data.currentChallenge
      }));
      
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
    } catch (error) {
      console.error('Error joining challenge:', error);
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
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
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
              <ProgressBar progress={item.value} total={Math.max(item.target, 1)} />
              <p className="text-sm mt-2 text-gray-600">
                {item.target > 0 ? `${((item.value / item.target) * 100).toFixed(0)}% of monthly goal` : 'Start logging activities!'}
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
              You've logged green actions for <strong>{dashboardData.ecoStats.streakDays}</strong> consecutive days!
            </p>
            <div className="flex mt-4">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    day <= dashboardData.ecoStats.streakDays ? "bg-green-500 text-white" : "bg-gray-200"
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
              Total earned: <strong>{dashboardData.ecoStats.totalPoints}</strong> points
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-yellow-500 h-4 rounded-full"
                style={{ width: `${Math.min((dashboardData.ecoStats.totalPoints / 500) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2 text-gray-600">
              {Math.min((dashboardData.ecoStats.totalPoints / 500) * 100, 100).toFixed(0)}% to next level (Eco Champion)
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
            <p className="mb-4">Avoid using your car for {Math.max(challenge.goal, 3)} days this week!</p>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Progress:</span>
                <span>
                  {challenge.progress}/{Math.max(challenge.goal, 3)} days
                </span>
              </div>
              <ProgressBar progress={challenge.progress} total={Math.max(challenge.goal, 3)} />
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
            {activities.length > 0 ? (
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
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-gray-500">
                          {activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : 'Recently'}
                        </p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        +{activity.points} pts
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p className="text-lg mb-2">No activities yet!</p>
                <p className="text-sm">Complete activities in "How It Works" to see them here.</p>
              </div>
            )}
            <div className="p-4 text-center border-t border-gray-200">
              <button className="text-green-600 hover:text-green-800 font-medium">
                View All Activities →
              </button>
            </div>
          </div>
        </section>
          </>
        )}
      </div>
    </div>
  );
}
