// models/User.js
import mongoose from 'mongoose';

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
  // Achievements and badges
  badges: [{
    name: String,
    earned: { type: Boolean, default: false },
    earnedDate: { type: Date, default: null }
  }],
  // Challenge participation
  currentChallenge: {
    title: String,
    joined: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
    goal: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
