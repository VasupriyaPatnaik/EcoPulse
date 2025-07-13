const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  // Password reset functionality
  resetPasswordOTP: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  // Eco-activity tracking
  ecoStats: {
    totalPoints: { type: Number, default: 0 },
    co2Saved: { type: Number, default: 0 }, // in kg
    waterSaved: { type: Number, default: 0 }, // in liters
    energySaved: { type: Number, default: 0 }, // in kWh
    activitiesLogged: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    lastActivityDate: { type: Date, default: null },
  },
  // Recent activities
  recentActivities: [{
    name: String,
    category: String,
    points: Number,
    impact: {
      co2: Number,
      water: Number,
      energy: Number
    },
    timestamp: { type: Date, default: Date.now }
  }],
  // Achievements/badges
  achievements: [{
    name: String,
    description: String,
    icon: String,
    earnedAt: { type: Date, default: Date.now }
  }],
}, {
  timestamps: true,
});

// Create indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ 'ecoStats.totalPoints': -1 });

module.exports = mongoose.model('User', userSchema);
