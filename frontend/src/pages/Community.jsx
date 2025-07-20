import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FiAward, FiUsers, FiTrendingUp, FiClock, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Community = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [joinedChallenges, setJoinedChallenges] = useState(["Plastic-Free Week"]);
  const [userDashboardData, setUserDashboardData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  // Weekly streak calculation utility functions (same as Dashboard)
  const getStartOfWeek = useCallback((date = new Date()) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; // Sunday is 0, so this gets the Sunday of the week
    return new Date(d.setDate(diff));
  }, []);

  const getDayOfWeek = useCallback((date) => {
    return new Date(date).getDay(); // 0 = Sunday, 1 = Monday, etc.
  }, []);

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
  }, [getStartOfWeek, getDayOfWeek]);

  // Fetch leaderboard data from backend
  const fetchLeaderboard = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const token = localStorage.getItem('token');
        const response = await api.get('/eco/leaderboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Leaderboard response:', response.data); // Debug log
        setLeaderboardData(response.data.leaderboard || []);
      } else {
        // For non-authenticated users, show static leaderboard
        const staticLeaderboard = [
          { rank: 1, name: "EcoWarrior42", points: 1245, avatar: "🌍", progress: 100, weeklyStreak: 7, isCurrentUser: false },
          { rank: 2, name: "GreenThumb", points: 1120, avatar: "🌱", progress: 90, weeklyStreak: 6, isCurrentUser: false },
          { rank: 3, name: "SustainableSam", points: 980, avatar: "♻️", progress: 80, weeklyStreak: 5, isCurrentUser: false },
          { rank: 4, name: "ClimateCrusader", points: 875, avatar: "🔥", progress: 70, weeklyStreak: 4, isCurrentUser: false },
          { rank: 5, name: "RecycleQueen", points: 820, avatar: "🔄", progress: 65, weeklyStreak: 7, isCurrentUser: false },
          { rank: 6, name: "SolarSister", points: 790, avatar: "☀️", progress: 60, weeklyStreak: 3, isCurrentUser: false },
          { rank: 7, name: "EcoExplorer", points: 745, avatar: "🧭", progress: 55, weeklyStreak: 2, isCurrentUser: false },
          { rank: 8, name: "PlanetPal", points: 680, avatar: "🌎", progress: 50, weeklyStreak: 1, isCurrentUser: false },
          { rank: 9, name: "GreenGuru", points: 655, avatar: "🌿", progress: 48, weeklyStreak: 4, isCurrentUser: false },
          { rank: 10, name: "EcoNinja", points: 620, avatar: "💚", progress: 45, weeklyStreak: 3, isCurrentUser: false },
          { rank: 11, name: "NatureLover", points: 590, avatar: "🍃", progress: 42, weeklyStreak: 2, isCurrentUser: false },
          { rank: 12, name: "TreeHugger", points: 565, avatar: "🌳", progress: 40, weeklyStreak: 5, isCurrentUser: false }
        ];
        setLeaderboardData(staticLeaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Fallback to static data if API fails
      const staticLeaderboard = [
        { rank: 1, name: "EcoWarrior42", points: 1245, avatar: "🌍", progress: 100, weeklyStreak: 7, isCurrentUser: false },
        { rank: 2, name: "GreenThumb", points: 1120, avatar: "🌱", progress: 90, weeklyStreak: 6, isCurrentUser: false },
        { rank: 3, name: "SustainableSam", points: 980, avatar: "♻️", progress: 80, weeklyStreak: 5, isCurrentUser: false },
        { rank: 4, name: "ClimateCrusader", points: 875, avatar: "🔥", progress: 70, weeklyStreak: 4, isCurrentUser: false },
        { rank: 5, name: "RecycleQueen", points: 820, avatar: "🔄", progress: 65, weeklyStreak: 7, isCurrentUser: false },
        { rank: 6, name: "SolarSister", points: 790, avatar: "☀️", progress: 60, weeklyStreak: 3, isCurrentUser: false },
        { rank: 7, name: "EcoExplorer", points: 745, avatar: "🧭", progress: 55, weeklyStreak: 2, isCurrentUser: false },
        { rank: 8, name: "PlanetPal", points: 680, avatar: "🌎", progress: 50, weeklyStreak: 1, isCurrentUser: false },
        { rank: 9, name: "GreenGuru", points: 655, avatar: "🌿", progress: 48, weeklyStreak: 4, isCurrentUser: false },
        { rank: 10, name: "EcoNinja", points: 620, avatar: "💚", progress: 45, weeklyStreak: 3, isCurrentUser: false },
        { rank: 11, name: "NatureLover", points: 590, avatar: "🍃", progress: 42, weeklyStreak: 2, isCurrentUser: false },
        { rank: 12, name: "TreeHugger", points: 565, avatar: "🌳", progress: 40, weeklyStreak: 5, isCurrentUser: false }
      ];
      setLeaderboardData(staticLeaderboard);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [isAuthenticated]);

  // Get leaderboard data (now using real data from backend)
  const getLeaderboardWithUser = () => {
    if (!leaderboardData.length) {
      return [];
    }

    // Add avatars and progress calculations to real data
    return leaderboardData.map(entry => ({
      ...entry,
      avatar: entry.isCurrentUser ? "👋" : getRandomAvatar(entry.rank),
      progress: leaderboardData.length > 0 ? 
        Math.min((entry.points / Math.max(leaderboardData[0]?.points || 1, 1)) * 100, 100) : 0
    }));
  };

  // Helper function to get random avatar for users
  const getRandomAvatar = (rank) => {
    const avatars = ["🌍", "🌱", "♻️", "🔥", "🔄", "☀️", "🧭", "🌎", "🌿", "💚", "🍃", "🌳", "🌺", "🦋", "🌊"];
    return avatars[(rank - 1) % avatars.length];
  };

  const leaderboard = getLeaderboardWithUser();
  const userRank = leaderboard.find(entry => entry.isCurrentUser);
  
  // Fetch user dashboard data and leaderboard
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        
        // Fetch dashboard data
        const dashboardResponse = await api.get('/eco/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Get the full data and use backend weekly streak if available
        const responseData = dashboardResponse.data;
        
        // Use backend weekly streak data if available, otherwise calculate frontend
        const updatedData = {
          ...responseData,
          ecoStats: {
            ...responseData.ecoStats,
            weeklyStreakDays: responseData.ecoStats.weeklyStreak !== undefined ? 
                             responseData.ecoStats.weeklyStreak : 
                             calculateWeeklyStreak(responseData.recentActivities || []).streakDays,
            weeklyActivityDays: calculateWeeklyStreak(responseData.recentActivities || []).weeklyActivityDays
          }
        };
        
        setUserDashboardData(updatedData);
      } catch (error) {
        console.error('Error fetching user dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Always fetch leaderboard data regardless of authentication
    fetchLeaderboard();
    
    // Only fetch user dashboard data if authenticated
    if (isAuthenticated) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, calculateWeeklyStreak, fetchLeaderboard, user?.name]); // Add user?.name to refresh when user data changes

  // Challenges data
  const challenges = [
    {
      id: 1,
      title: "Zero Waste Week",
      description: "Go completely waste-free for 7 days",
      participants: 842,
      duration: "7 days",
      reward: "150 pts + Zero Waste Hero badge",
      joined: joinedChallenges.includes("Zero Waste Week"),
      category: "waste"
    },
    {
      id: 2,
      title: "Plastic-Free Week",
      description: "Avoid all single-use plastics",
      participants: 1203,
      duration: "7 days",
      reward: "100 pts + Plastic-Free Champion badge",
      joined: true, // Already joined
      category: "waste"
    },
    {
      id: 3,
      title: "30-Day Bike Challenge",
      description: "Use only bike or walk for transportation",
      participants: 567,
      duration: "30 days",
      reward: "300 pts + Carbon Crusher badge",
      joined: joinedChallenges.includes("30-Day Bike Challenge"),
      category: "transport"
    },
    {
      id: 4,
      title: "Vegan Month",
      description: "Eat plant-based for 30 days",
      participants: 932,
      duration: "30 days",
      reward: "250 pts + Plant Power badge",
      joined: joinedChallenges.includes("Vegan Month"),
      category: "food"
    },
  ];

  const joinChallenge = (title) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    
    if (!joinedChallenges.includes(title)) {
      setJoinedChallenges([...joinedChallenges, title]);
    }
  };

  const CategoryPill = ({ category }) => {
    const colors = {
      waste: "bg-orange-100 text-orange-800",
      transport: "bg-blue-100 text-blue-800",
      food: "bg-green-100 text-green-800",
      energy: "bg-yellow-100 text-yellow-800"
    };
    
    const icons = {
      waste: "🗑️",
      transport: "🚲",
      food: "🍎",
      energy: "💡"
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[category]} flex items-center`}>
        {icons[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-emerald-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            EcoPulse <span className="text-emerald-200">Community</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Join thousands of eco-warriors making a difference together
          </motion.p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="pt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-6 py-3 font-medium text-lg flex items-center ${
                activeTab === "leaderboard"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiTrendingUp className="mr-2" /> Leaderboard
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`px-6 py-3 font-medium text-lg flex items-center ${
                activeTab === "challenges"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiAward className="mr-2" /> Challenges
            </button>
            <button
              onClick={() => setActiveTab("discussions")}
              className={`px-6 py-3 font-medium text-lg flex items-center ${
                activeTab === "discussions"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiUsers className="mr-2" /> Discussions
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Leaderboard Tab */}
          {activeTab === "leaderboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold flex items-center">
                    <FiTrendingUp className="text-emerald-600 mr-2" /> Global Leaderboard
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Top eco-champions making the biggest impact this month
                    {isAuthenticated && userRank && (
                      <span className="text-blue-600 font-medium ml-2">
                        • Your rank: #{userRank.rank} (🔥 {userRank.weeklyStreak} day weekly streak)
                      </span>
                    )}
                    {isAuthenticated && !userRank && userDashboardData && userDashboardData.ecoStats?.weeklyStreakDays > 0 && (
                      <span className="text-emerald-600 font-medium ml-2">
                        • Current weekly streak: 🔥 {userDashboardData.ecoStats.weeklyStreakDays} days
                      </span>
                    )}
                  </p>
                </div>
                  {leaderboardLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading leaderboard...</p>
                  </div>
                ) : (
                  <>
                    <div className="divide-y divide-gray-200">
                      {leaderboard.map((user, index) => (
                        <motion.div
                          key={user.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 flex items-center ${
                            index < 3 ? "bg-gradient-to-r from-emerald-50 to-teal-50" : ""
                          } ${user.isCurrentUser ? "bg-gradient-to-r from-blue-50 to-emerald-50 border-l-4 border-blue-500" : ""}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            index === 0 ? "bg-yellow-100 text-yellow-600" :
                            index === 1 ? "bg-gray-200 text-gray-600" :
                            index === 2 ? "bg-orange-100 text-orange-600" :
                            user.isCurrentUser ? "bg-blue-100 text-blue-600" :
                            "bg-gray-100 text-gray-500"
                          }`}>
                            {index <= 2 ? (
                              ["🥇", "🥈", "🥉"][index]
                            ) : (
                              user.rank
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{user.avatar}</span>
                              <div>
                                <h3 className={`font-medium ${user.isCurrentUser ? "text-blue-700" : ""}`}>
                                  {user.name} {user.isCurrentUser ? "(You)" : ""}
                                </h3>
                                <div className="flex items-center text-sm text-gray-500">
                                  <FiAward className="mr-1" /> {user.points} EcoPoints
                                  <span className="mx-2">•</span>
                                  <span className="flex items-center">
                                    🔥 {user.weeklyStreak || 0} day weekly streak
                                  </span>
                                  {user.isCurrentUser && !isLoading && (
                                    <span className="ml-2 text-blue-600 font-medium">• Live</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-24">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  index === 0 ? "bg-yellow-400" :
                                  index === 1 ? "bg-gray-400" :
                                  index === 2 ? "bg-orange-400" :
                                  user.isCurrentUser ? "bg-blue-400" :
                                  "bg-emerald-400"
                                }`}
                                style={{ width: `${user.progress}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 text-right mt-1">
                              {user.progress.toFixed(0)}%
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-gray-50 text-center">
                      <button className="text-emerald-600 font-medium hover:text-emerald-800">
                        View Full Leaderboard →
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Your Position - Only show when logged in */}
              {isAuthenticated ? (
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-emerald-100 text-emerald-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">🌟</span>
                    Your Position
                  </h3>
                  {(isLoading && isAuthenticated) ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                      <span className="ml-2 text-gray-600">Loading your stats...</span>
                    </div>
                  ) : userRank ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">👋</span>
                        <div>
                          <h4 className="font-medium">{user?.name || 'EcoHero'} (You)</h4>
                          <p className="text-sm text-gray-600">
                            Rank #{userRank.rank} with {userRank.points} points
                          </p>
                          <p className="text-sm text-emerald-600 font-medium">
                            🔥 {userRank.weeklyStreak || 0} day weekly streak
                          </p>
                          {userDashboardData && (
                            <p className="text-xs text-blue-600 mt-1">
                              Activities: {userDashboardData.ecoStats.activitiesLogged} • 
                              Last Activity: {userDashboardData.ecoStats.lastActivityDate ? 
                                new Date(userDashboardData.ecoStats.lastActivityDate).toLocaleDateString() : 'None yet'}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-24">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-400" 
                            style={{ width: `${userRank.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 text-right mt-1">
                          {(userRank.progress || 0).toFixed(0)}% to top
                        </div>
                      </div>
                    </div>
                  ) : userDashboardData && userDashboardData.ecoStats.totalPoints === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🌱</div>
                      <h4 className="font-semibold text-gray-800 mb-2">Ready to make an impact?</h4>
                      <p className="text-gray-600 mb-2">
                        You haven't earned any EcoPoints yet. Start logging activities to climb the leaderboard!
                      </p>
                      {userDashboardData.ecoStats?.weeklyStreakDays > 0 && (
                        <p className="text-sm text-emerald-600 font-medium mb-4">
                          🔥 Current weekly streak: {userDashboardData.ecoStats.weeklyStreakDays} days - Keep it up!
                        </p>
                      )}
                      <button 
                        onClick={() => window.location.href = '/how-it-works'}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Start Earning Points
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🌱</div>
                      <p className="text-gray-600 mb-2">Start your eco-journey!</p>
                      <p className="text-sm text-gray-500">
                        Complete activities in "How It Works" to earn points and climb the leaderboard.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-lg p-6 border border-emerald-200">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏆</div>
                    <h3 className="font-bold text-lg mb-2">Want to see your ranking?</h3>
                    <p className="text-gray-600 mb-4">
                      Join EcoPulse to track your progress, earn points, and compete with eco-warriors worldwide!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button 
                        onClick={() => window.location.href = '/register'}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Join Now - Free
                      </button>
                      <button 
                        onClick={() => window.location.href = '/login'}
                        className="px-6 py-2 border border-emerald-600 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Challenges Tab */}
          {activeTab === "challenges" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    whileHover={{ y: -5 }}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${
                      challenge.joined ? "border-emerald-500" : "border-gray-200"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold">{challenge.title}</h3>
                        <CategoryPill category={challenge.category} />
                      </div>
                      <p className="text-gray-600 mb-4">{challenge.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <FiUsers className="mr-1" /> {challenge.participants.toLocaleString()} participants • 
                        <FiClock className="ml-3 mr-1" /> {challenge.duration}
                      </div>
                      
                      <div className="bg-emerald-50 p-3 rounded-lg mb-4">
                        <p className="text-emerald-700 font-medium">
                          <FiAward className="inline mr-2" />
                          Reward: {challenge.reward}
                        </p>
                      </div>
                      
                      {challenge.joined ? (
                        <div className="flex items-center text-emerald-600">
                          <FiCheckCircle className="mr-2" /> Joined! Progress: 25%
                          <div className="ml-auto w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: "25%" }}></div>
                          </div>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => joinChallenge(challenge.title)}
                          className="w-full py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all"
                        >
                          {isAuthenticated ? "Join Challenge" : "Login to Join Challenge"}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Your Active Challenges - Only show when logged in */}
              {isAuthenticated ? (
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <span className="bg-emerald-100 text-emerald-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">🏆</span>
                    Your Active Challenges
                  </h3>
                  {joinedChallenges.length > 0 ? (
                    <div className="space-y-4">
                      {challenges
                        .filter(c => joinedChallenges.includes(c.title))
                        .map(challenge => (
                          <div key={challenge.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                            <div className="bg-emerald-100 text-emerald-800 p-2 rounded-lg mr-4">
                              {challenge.category === "waste" ? "🗑️" : 
                               challenge.category === "transport" ? "🚲" : "🍎"}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{challenge.title}</h4>
                              <p className="text-sm text-gray-600">Progress: 25%</p>
                            </div>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500" style={{ width: "25%" }}></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">🎯</div>
                      <p className="text-gray-600 mb-4">You haven't joined any challenges yet.</p>
                      <p className="text-sm text-gray-500">Join a challenge above to start tracking your progress!</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl shadow-lg p-6 border border-blue-200">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="font-bold text-lg mb-2">Ready to take on challenges?</h3>
                    <p className="text-gray-600 mb-4">
                      Sign up to join challenges, track your progress, and earn exclusive badges!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button 
                        onClick={() => window.location.href = '/register'}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Get Started
                      </button>
                      <button 
                        onClick={() => window.location.href = '/login'}
                        className="px-6 py-2 border border-emerald-600 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                      >
                        Already a member?
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Discussions Tab */}
          {activeTab === "discussions" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold flex items-center mb-6">
                <FiUsers className="text-emerald-600 mr-2" /> Community Discussions
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Popular Topics */}
                <div className="md:col-span-2">
                  <h3 className="font-bold text-lg mb-4">Popular Topics</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Best reusable products?", replies: 142, category: "shopping" },
                      { title: "How to reduce food waste?", replies: 89, category: "food" },
                      { title: "Bike commuting tips", replies: 76, category: "transport" },
                      { title: "Solar panel experiences", replies: 54, category: "energy" },
                    ].map((topic, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 cursor-pointer transition-all"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{topic.title}</h4>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            {topic.replies} replies
                          </span>
                        </div>
                        <div className="flex items-center mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            topic.category === "shopping" ? "bg-purple-100 text-purple-800" :
                            topic.category === "food" ? "bg-green-100 text-green-800" :
                            topic.category === "transport" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Community Highlights */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Community Highlights</h3>
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">🌱 New Members</h4>
                      <div className="flex space-x-2">
                        {["👩", "🧔", "👴", "👧"].map((emoji, i) => (
                          <span key={i} className="text-xl">{emoji}</span>
                        ))}
                        <span className="text-gray-600 text-sm">+42 this week</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">🏆 Recent Achievers</h4>
                      <div className="space-y-2">
                        {[
                          { name: "EcoNewbie", badge: "First Step" },
                          { name: "GreenThumb", badge: "Plant Hero" },
                          { name: "BikeRider", badge: "Carbon Saver" },
                        ].map((user, i) => (
                          <div key={i} className="flex items-center">
                            <span className="mr-2">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>
                            <span className="font-medium">{user.name}</span>
                            <span className="ml-auto bg-white text-xs px-2 py-1 rounded-full">
                              {user.badge}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">💡 Tip of the Day</h4>
                      <p className="text-sm">
                        "Switching to LED bulbs can save up to 80% energy compared to traditional bulbs!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Join Our Growing Community?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl mb-8"
          >
            Connect with eco-conscious people worldwide and amplify your impact
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-emerald-700 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Join Now - It's Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Browse Challenges
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Community;