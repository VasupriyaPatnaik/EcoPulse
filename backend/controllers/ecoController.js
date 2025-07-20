import User from '../models/User.js';

// Add eco activity
export const addEcoActivity = async (req, res) => {
  try {
    const { name, category, points, impact } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's eco stats
    user.ecoStats.totalPoints += points;
    user.ecoStats.co2Saved += impact.co2;
    user.ecoStats.waterSaved += impact.water;
    user.ecoStats.energySaved += impact.energy;
    user.ecoStats.activitiesLogged += 1;

    // Update streak
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
    const lastActivity = user.ecoStats.lastActivityDate;
    
    // Calculate overall daily streak
    if (lastActivity) {
      const lastActivityDate = new Date(lastActivity);
      lastActivityDate.setHours(0, 0, 0, 0);
      const timeDiff = today.getTime() - lastActivityDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      if (daysDiff === 1) {
        // Consecutive day
        user.ecoStats.streakDays += 1;
      } else if (daysDiff > 1) {
        // Streak broken
        user.ecoStats.streakDays = 1;
      }
      // Same day - no change to streak
    } else {
      // First activity
      user.ecoStats.streakDays = 1;
    }

    // Calculate weekly streak
    const weeklyStreakData = calculateWeeklyStreak(today, user.ecoStats);
    user.ecoStats.weeklyStreak = weeklyStreakData.weeklyStreak;
    user.ecoStats.currentWeekStart = weeklyStreakData.currentWeekStart;
    user.ecoStats.weeklyActivityDates = weeklyStreakData.weeklyActivityDates;

    user.ecoStats.lastActivityDate = today;

    // Add to recent activities (keep only last 10)
    user.recentActivities.unshift({
      name,
      category,
      points,
      impact,
      timestamp: today
    });

    if (user.recentActivities.length > 10) {
      user.recentActivities = user.recentActivities.slice(0, 10);
    }

    // Check for badge updates
    updateBadges(user);

    await user.save();

    res.json({
      message: 'Activity added successfully',
      ecoStats: user.ecoStats,
      recentActivities: user.recentActivities.slice(0, 5), // Return only 5 most recent
      badges: user.badges
    });
  } catch (error) {
    console.error('Error adding eco activity:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's eco dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize default data if not exists
    if (!user.ecoStats) {
      user.ecoStats = {
        totalPoints: 0,
        co2Saved: 0,
        waterSaved: 0,
        energySaved: 0,
        activitiesLogged: 0,
        streakDays: 0,
        weeklyStreak: 0,
        lastActivityDate: null,
        currentWeekStart: null,
        weeklyActivityDates: []
      };
    }

    // Update weekly streak based on current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weeklyStreakData = updateUserWeeklyStreak(user.ecoStats, today);
    user.ecoStats.weeklyStreak = weeklyStreakData.weeklyStreak;

    if (!user.badges || user.badges.length === 0) {
      user.badges = [
        { name: "Water Warrior", earned: false, description: "Saved 50+ liters of water" },
        { name: "Carbon Cutter", earned: false, description: "Reduced CO₂ by 5+ kg" },
        { name: "Energy Saver", earned: false, description: "Saved 5+ kWh energy" },
        { name: "Eco Champion", earned: false, description: "Logged 10+ activities" },
        { name: "Green Guru", earned: false, description: "7+ day streak" }
      ];
    }

    if (!user.currentChallenge) {
      user.currentChallenge = {
        title: "🚴 Car-Free Commute",
        joined: false,
        progress: 0,
        goal: 3
      };
    }

    updateBadges(user);
    await user.save();

    res.json({
      ecoStats: user.ecoStats,
      recentActivities: user.recentActivities?.slice(0, 5) || [],
      badges: user.badges,
      currentChallenge: user.currentChallenge
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update challenge progress
export const updateChallenge = async (req, res) => {
  try {
    const { joined, progress } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure challenge exists with correct structure
    if (!user.currentChallenge) {
      user.currentChallenge = {
        title: "🚴 Car-Free Commute",
        joined: false,
        progress: 0,
        goal: 3
      };
    }

    // Ensure goal is set correctly for existing users
    if (!user.currentChallenge.goal || user.currentChallenge.goal === 0) {
      user.currentChallenge.goal = 3;
    }

    if (joined !== undefined) {
      user.currentChallenge.joined = joined;
      // If joining for the first time, set progress to 1
      if (joined && user.currentChallenge.progress === 0) {
        user.currentChallenge.progress = 1;
      }
    }
    if (progress !== undefined) {
      user.currentChallenge.progress = progress;
    }

    await user.save();

    res.json({
      message: 'Challenge updated successfully',
      currentChallenge: user.currentChallenge
    });
  } catch (error) {
    console.error('Error updating challenge:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to update badges based on achievements
function updateBadges(user) {
  // Initialize badges if they don't exist
  if (!user.badges || user.badges.length === 0) {
    user.badges = [
      { name: "Water Warrior", earned: false, description: "Saved 50+ liters of water" },
      { name: "Carbon Cutter", earned: false, description: "Reduced CO₂ by 5+ kg" },
      { name: "Energy Saver", earned: false, description: "Saved 5+ kWh energy" },
      { name: "Eco Champion", earned: false, description: "Logged 10+ activities" },
      { name: "Green Guru", earned: false, description: "7+ day streak" }
    ];
  }
  
  const badges = user.badges;
  
  // Water Warrior: Saved 50+ liters
  const waterWarrior = badges.find(b => b.name === "Water Warrior");
  if (waterWarrior && !waterWarrior.earned && user.ecoStats.waterSaved >= 50) {
    waterWarrior.earned = true;
    waterWarrior.earnedDate = new Date();
  }

  // Carbon Cutter: Reduced CO₂ by 5+ kg
  const carbonCutter = badges.find(b => b.name === "Carbon Cutter");
  if (carbonCutter && !carbonCutter.earned && user.ecoStats.co2Saved >= 5) {
    carbonCutter.earned = true;
    carbonCutter.earnedDate = new Date();
  }

  // Energy Saver: Saved 5+ kWh
  const energySaver = badges.find(b => b.name === "Energy Saver");
  if (energySaver && !energySaver.earned && user.ecoStats.energySaved >= 5) {
    energySaver.earned = true;
    energySaver.earnedDate = new Date();
  }

  // Eco Champion: 10+ activities logged
  const ecoChampion = badges.find(b => b.name === "Eco Champion");
  if (ecoChampion && !ecoChampion.earned && user.ecoStats.activitiesLogged >= 10) {
    ecoChampion.earned = true;
    ecoChampion.earnedDate = new Date();
  }

  // Green Guru: 7+ day streak
  const greenGuru = badges.find(b => b.name === "Green Guru");
  if (greenGuru && !greenGuru.earned && user.ecoStats.streakDays >= 7) {
    greenGuru.earned = true;
    greenGuru.earnedDate = new Date();
  }

  user.badges = badges;
}

// Helper function to calculate weekly streak based on activity dates
function calculateWeeklyStreak(activityDate, ecoStats) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get start of current week (Sunday)
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day; // Sunday is 0
    d.setDate(diff);
    return d;
  };

  const currentWeekStart = getStartOfWeek(today);
  
  // If it's a new week, reset weekly tracking
  if (!ecoStats.currentWeekStart || 
      new Date(ecoStats.currentWeekStart).getTime() !== currentWeekStart.getTime()) {
    return {
      weeklyStreak: 1,
      currentWeekStart,
      weeklyActivityDates: [activityDate]
    };
  }

  // Check if activity is already logged for today
  const todayString = activityDate.toDateString();
  const existingDates = ecoStats.weeklyActivityDates || [];
  const alreadyLoggedToday = existingDates.some(date => 
    new Date(date).toDateString() === todayString
  );

  if (alreadyLoggedToday) {
    // Same day, no change to streak
    return {
      weeklyStreak: ecoStats.weeklyStreak,
      currentWeekStart: ecoStats.currentWeekStart,
      weeklyActivityDates: ecoStats.weeklyActivityDates
    };
  }

  // Add today to activity dates
  const updatedDates = [...existingDates, activityDate];
  
  // Calculate consecutive days from start of week
  let weeklyStreak = 0;
  const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Check each day from Sunday to today
  for (let i = 0; i <= currentDayOfWeek; i++) {
    const checkDate = new Date(currentWeekStart);
    checkDate.setDate(currentWeekStart.getDate() + i);
    
    const hasActivity = updatedDates.some(date => 
      new Date(date).toDateString() === checkDate.toDateString()
    );

    if (hasActivity) {
      weeklyStreak++;
    } else {
      // If there's a gap before today, reset streak
      if (checkDate.getTime() < today.getTime()) {
        weeklyStreak = 0;
      }
    }
  }

  return {
    weeklyStreak,
    currentWeekStart,
    weeklyActivityDates: updatedDates
  };
}

// Get leaderboard data
export const getLeaderboard = async (req, res) => {
  try {
    // Get all users with their eco stats, sorted by total points
    const users = await User.find({}, {
      name: 1,
      ecoStats: 1,
      recentActivities: 1
    }).sort({ 'ecoStats.totalPoints': -1 }).limit(50);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const realUsers = users.map((user, index) => {
      // Update weekly streak for each user based on current date
      const weeklyStreakData = updateUserWeeklyStreak(user.ecoStats, today);
      
      return {
        rank: index + 1,
        name: user.name,
        points: user.ecoStats.totalPoints || 0,
        weeklyStreak: weeklyStreakData.weeklyStreak,
        co2Saved: user.ecoStats.co2Saved || 0,
        waterSaved: user.ecoStats.waterSaved || 0,
        energySaved: user.ecoStats.energySaved || 0,
        activitiesLogged: user.ecoStats.activitiesLogged || 0,
        isCurrentUser: user._id.toString() === req.user._id.toString()
      };
    });

    // If we don't have enough real users, add mock users to fill the leaderboard
    let leaderboard = [...realUsers];
    
    if (leaderboard.length < 10) {
      const mockUsers = [
        { name: "EcoWarrior42", points: 1245, weeklyStreak: 7 },
        { name: "GreenThumb", points: 1120, weeklyStreak: 6 },
        { name: "SustainableSam", points: 980, weeklyStreak: 5 },
        { name: "ClimateCrusader", points: 875, weeklyStreak: 4 },
        { name: "RecycleQueen", points: 820, weeklyStreak: 7 },
        { name: "SolarSister", points: 790, weeklyStreak: 3 },
        { name: "EcoExplorer", points: 745, weeklyStreak: 2 },
        { name: "PlanetPal", points: 680, weeklyStreak: 1 },
        { name: "GreenGuru", points: 655, weeklyStreak: 4 },
        { name: "EcoNinja", points: 620, weeklyStreak: 3 },
        { name: "NatureLover", points: 590, weeklyStreak: 2 },
        { name: "TreeHugger", points: 565, weeklyStreak: 5 }
      ];

      // Add mock users that don't conflict with real users
      const realUserNames = new Set(realUsers.map(u => u.name));
      const filteredMockUsers = mockUsers.filter(mock => !realUserNames.has(mock.name));
      
      // Add mock users with points lower than the lowest real user
      const lowestRealUserPoints = realUsers.length > 0 ? Math.min(...realUsers.map(u => u.points)) : 1500;
      const adjustedMockUsers = filteredMockUsers.map((mock, index) => ({
        rank: realUsers.length + index + 1,
        name: mock.name,
        points: Math.max(mock.points, lowestRealUserPoints - 100 - (index * 50)),
        weeklyStreak: mock.weeklyStreak,
        co2Saved: mock.points / 10,
        waterSaved: mock.points / 5,
        energySaved: mock.points / 15,
        activitiesLogged: Math.floor(mock.points / 20),
        isCurrentUser: false
      }));

      leaderboard = [...realUsers, ...adjustedMockUsers];
    }

    // Re-sort the combined leaderboard and update ranks
    leaderboard.sort((a, b) => b.points - a.points);
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    res.json({
      leaderboard: leaderboard.slice(0, 20), // Return top 20
      totalUsers: leaderboard.length
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to update weekly streak based on current date
function updateUserWeeklyStreak(ecoStats, currentDate) {
  const today = new Date(currentDate);
  today.setHours(0, 0, 0, 0);
  
  // Get start of current week (Sunday)
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day;
    d.setDate(diff);
    return d;
  };

  const currentWeekStart = getStartOfWeek(today);
  
  // If no weekly tracking data or it's a new week, recalculate from recent activities
  if (!ecoStats.currentWeekStart || 
      new Date(ecoStats.currentWeekStart).getTime() !== currentWeekStart.getTime()) {
    
    // If we don't have weekly activity dates, return 0 streak
    if (!ecoStats.weeklyActivityDates || ecoStats.weeklyActivityDates.length === 0) {
      return { weeklyStreak: 0 };
    }

    // Filter activities from current week
    const thisWeekActivities = ecoStats.weeklyActivityDates.filter(date => {
      const activityDate = new Date(date);
      return activityDate >= currentWeekStart && activityDate <= today;
    });

    // Calculate consecutive days from start of week
    let weeklyStreak = 0;
    const currentDayOfWeek = today.getDay();

    for (let i = 0; i <= currentDayOfWeek; i++) {
      const checkDate = new Date(currentWeekStart);
      checkDate.setDate(currentWeekStart.getDate() + i);
      
      const hasActivity = thisWeekActivities.some(date => 
        new Date(date).toDateString() === checkDate.toDateString()
      );

      if (hasActivity) {
        weeklyStreak++;
      } else {
        if (checkDate.getTime() < today.getTime()) {
          weeklyStreak = 0;
        }
      }
    }

    return { weeklyStreak };
  }

  // Return existing weekly streak
  return { weeklyStreak: ecoStats.weeklyStreak || 0 };
}
