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
    const lastActivity = user.ecoStats.lastActivityDate;
    
    if (lastActivity) {
      const timeDiff = today.getTime() - lastActivity.getTime();
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
        lastActivityDate: null
      };
    }

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
