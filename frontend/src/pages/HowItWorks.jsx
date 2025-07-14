import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiActivity, FiList, FiAward, FiBarChart2, FiCheckCircle, FiLock } from "react-icons/fi";
import { useDashboard } from "../context/DashboardContext";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const HowItWorks = () => {
  const { triggerDashboardRefresh } = useDashboard();
  const { isAuthenticated, user } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityDetails, setActivityDetails] = useState({
    duration: "",
    notes: ""
  });
  const [calculatedImpact, setCalculatedImpact] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: "Transportation", icon: "🚗", color: "bg-blue-100 text-blue-600" },
    { name: "Food", icon: "🍎", color: "bg-green-100 text-green-600" },
    { name: "Energy", icon: "💡", color: "bg-yellow-100 text-yellow-600" },
    { name: "Shopping", icon: "🛍️", color: "bg-purple-100 text-purple-600" },
    { name: "Waste", icon: "🗑️", color: "bg-orange-100 text-orange-600" },
  ];

  const activities = {
    Transportation: [
      { name: "Walked instead of driving", points: 20 },
      { name: "Used public transport", points: 15 },
      { name: "Carpooled", points: 10 },
    ],
    Food: [
      { name: "Ate plant-based meal", points: 15 },
      { name: "Composted food waste", points: 10 },
      { name: "Used reusable container", points: 5 },
    ],
    Energy: [
      { name: "Turned off unused lights", points: 5 },
      { name: "Used energy-efficient appliance", points: 10 },
      { name: "Reduced AC/heating", points: 15 },
    ],
    Shopping: [
      { name: "Bought secondhand", points: 10 },
      { name: "Used reusable bag", points: 5 },
      { name: "Chose eco-friendly product", points: 15 },
    ],
    Waste: [
      { name: "Recycled properly", points: 10 },
      { name: "Reduced single-use plastics", points: 15 },
      { name: "Repurposed items", points: 10 },
    ],
  };

  const Step = ({ number, title, active, completed, onClick, locked = false }) => (
    <motion.div
      whileHover={!locked ? { scale: 1.05 } : {}}
      whileTap={!locked ? { scale: 0.95 } : {}}
      onClick={!locked ? onClick : undefined}
      className={`flex items-center p-4 rounded-xl ${
        locked 
          ? "bg-gray-100 cursor-not-allowed opacity-60" 
          : active 
            ? "bg-emerald-100 border-l-4 border-emerald-500 cursor-pointer" 
            : completed 
              ? "bg-gray-100 cursor-pointer" 
              : "bg-white cursor-pointer"
      } shadow-sm mb-4 transition-all`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
        locked
          ? "bg-gray-300 text-gray-500"
          : active 
            ? "bg-emerald-500 text-white" 
            : completed 
              ? "bg-gray-300 text-white" 
              : "bg-gray-200"
      }`}>
        {locked ? <FiLock className="text-sm" /> : completed ? <FiCheckCircle className="text-lg" /> : number}
      </div>
      <h3 className={`font-medium ${
        locked 
          ? "text-gray-400"
          : active 
            ? "text-emerald-700" 
            : "text-gray-700"
      }`}>{title}</h3>
      {locked && (
        <span className="ml-auto text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
          Login Required
        </span>
      )}
    </motion.div>
  );

  // Calculate environmental impact based on activity and details
  const calculateImpact = () => {
    if (!selectedActivity) return;

    setIsCalculating(true);
    
    // Add a small delay to show calculation process
    setTimeout(() => {
      // Base impact values per activity type
      const impactFactors = {
        Transportation: {
          "Walked instead of driving": { co2: 2.3, water: 15, energy: 0.8 },
          "Used public transport": { co2: 1.8, water: 12, energy: 0.6 },
          "Carpooled": { co2: 1.2, water: 8, energy: 0.4 }
        },
        Food: {
          "Ate plant-based meal": { co2: 3.2, water: 25, energy: 1.1 },
          "Composted food waste": { co2: 0.8, water: 5, energy: 0.3 },
          "Used reusable container": { co2: 0.5, water: 3, energy: 0.2 }
        },
        Energy: {
          "Turned off unused lights": { co2: 0.4, water: 2, energy: 0.5 },
          "Used energy-efficient appliance": { co2: 1.5, water: 8, energy: 2.2 },
          "Reduced AC/heating": { co2: 2.8, water: 12, energy: 3.5 }
        },
        Shopping: {
          "Bought secondhand": { co2: 1.9, water: 35, energy: 1.3 },
          "Used reusable bag": { co2: 0.3, water: 2, energy: 0.1 },
          "Chose eco-friendly product": { co2: 1.7, water: 18, energy: 0.9 }
        },
        Waste: {
          "Recycled properly": { co2: 1.1, water: 8, energy: 0.6 },
          "Reduced single-use plastics": { co2: 2.1, water: 22, energy: 1.2 },
          "Repurposed items": { co2: 1.4, water: 12, energy: 0.8 }
        }
      };

      // Get base impact for selected activity
      const baseImpact = impactFactors[selectedCategory]?.[selectedActivity.name] || 
                        { co2: 1.0, water: 10, energy: 0.5 };

      // Apply multiplier based on duration/frequency mentioned in details
      let multiplier = 1;
      if (activityDetails.duration) {
        const duration = activityDetails.duration.toLowerCase();
        if (duration.includes('hour') || duration.includes('hr')) {
          const hours = parseFloat(duration.match(/\d+/)?.[0] || 1);
          multiplier = Math.max(hours * 0.5, 1);
        } else if (duration.includes('day') || duration.includes('time')) {
          const days = parseFloat(duration.match(/\d+/)?.[0] || 1);
          multiplier = Math.max(days * 1.2, 1);
        } else if (duration.includes('mile') || duration.includes('km')) {
          const distance = parseFloat(duration.match(/\d+/)?.[0] || 1);
          multiplier = Math.max(distance * 0.3, 1);
        }
      }

      // Calculate final impact
      const impact = {
        co2: (baseImpact.co2 * multiplier).toFixed(1),
        water: Math.round(baseImpact.water * multiplier),
        energy: (baseImpact.energy * multiplier).toFixed(1),
        points: selectedActivity.points * Math.ceil(multiplier)
      };

      setCalculatedImpact(impact);
      setIsCalculating(false);
      setActiveStep(4);
    }, 1200); // Small delay to simulate calculation
  };

  // Reset form
  const resetForm = () => {
    setSelectedCategory(null);
    setSelectedActivity(null);
    setActivityDetails({ duration: "", notes: "" });
    setCalculatedImpact(null);
    setActiveStep(1);
  };

  // Navigate to dashboard and save activity
  const goToDashboard = async () => {
    if (calculatedImpact && selectedActivity) {
      try {
        const token = localStorage.getItem('token');
        
        const response = await api.post('/eco/activity', {
          name: selectedActivity.name,
          category: selectedCategory,
          points: calculatedImpact.points,
          impact: {
            co2: parseFloat(calculatedImpact.co2),
            water: parseInt(calculatedImpact.water),
            energy: parseFloat(calculatedImpact.energy)
          }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Activity saved successfully:', response.data);
        
        // Trigger dashboard refresh
        triggerDashboardRefresh();
        
        // Show success message
        alert(`Great! You earned ${calculatedImpact.points} EcoPoints! 🎉`);
        
      } catch (error) {
        console.error('Error saving activity:', error);
        alert('Failed to save activity. Please try again.');
        return; // Don't navigate if save failed
      }
    }
    
    navigate('/dashboard');
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-emerald-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            How <span className="text-emerald-200">EcoPulse</span> Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Track your eco-friendly actions and see your real environmental impact in just a few simple steps.
          </motion.p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Steps Navigation */}
            <div className="md:col-span-1">
              <Step 
                number={1} 
                title="Choose Category" 
                active={activeStep === 1} 
                completed={activeStep > 1}
                locked={!isAuthenticated}
                onClick={() => isAuthenticated && setActiveStep(1)}
              />
              <Step 
                number={2} 
                title="Select Activity" 
                active={activeStep === 2} 
                completed={activeStep > 2}
                locked={!isAuthenticated}
                onClick={() => isAuthenticated && selectedCategory && setActiveStep(2)}
              />
              <Step 
                number={3} 
                title="Log Details" 
                active={activeStep === 3} 
                completed={activeStep > 3}
                locked={!isAuthenticated}
                onClick={() => isAuthenticated && selectedCategory && setActiveStep(3)}
              />
              <Step 
                number={4} 
                title="See Impact" 
                active={activeStep === 4} 
                completed={false}
                locked={!isAuthenticated}
                onClick={() => isAuthenticated && selectedCategory && setActiveStep(4)}
              />
            </div>

            {/* Step Content */}
            <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-8">
              {/* Login Required Message */}
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16"
                >
                  <div className="p-4 bg-emerald-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <FiLock className="text-emerald-600 text-3xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    To track your eco-activities and see your environmental impact, please log in to your account or create a new one.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/login')}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-bold shadow-md hover:bg-emerald-700 transition-all"
                    >
                      Login to Your Account
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/register')}
                      className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-bold hover:bg-emerald-50 transition-all"
                    >
                      Create New Account
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-500 mt-6">
                    Ready to start your eco-journey? Create an account to track your environmental impact!
                  </p>
                </motion.div>
              )}

              {/* Authenticated User Content */}
              {isAuthenticated && (
                <>
                  {/* Welcome Message for Logged-in Users */}
                  <div className="mb-6 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                    <h3 className="font-semibold text-emerald-800 mb-1">
                      Welcome back, {user?.name || 'Eco-Warrior'}! 🌱
                    </h3>
                    <p className="text-emerald-700 text-sm">
                      Ready to log your eco-activities? Follow the steps below to track your environmental impact.
                    </p>
                  </div>

                  {/* Step 1: Choose Category */}
                  {activeStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-8">
                    <div className="p-3 bg-emerald-100 rounded-lg mr-4">
                      <FiList className="text-emerald-600 text-2xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Choose Activity Category</h2>
                  </div>
                  <p className="text-gray-600 mb-8">
                    Select the type of eco-friendly action you want to log. We'll calculate your environmental impact based on your selection.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map((category) => (
                      <motion.div
                        key={category.name}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (isAuthenticated) {
                            setSelectedCategory(category.name);
                            setActiveStep(2);
                          } else {
                            navigate('/login');
                          }
                        }}
                        className={`p-4 rounded-xl text-center cursor-pointer border-2 ${
                          selectedCategory === category.name 
                            ? "border-emerald-500 shadow-md" 
                            : "border-gray-200 hover:border-emerald-300"
                        } transition-all`}
                      >
                        <div className={`text-3xl mb-2 ${category.color}`}>{category.icon}</div>
                        <h3 className="font-medium">{category.name}</h3>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Select Activity */}
              {activeStep === 2 && selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-8">
                    <div className="p-3 bg-emerald-100 rounded-lg mr-4">
                      <FiActivity className="text-emerald-600 text-2xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Select Your Activity</h2>
                  </div>
                  <p className="text-gray-600 mb-8">
                    Choose the specific action you took. Each activity has different environmental benefits.
                  </p>
                  <div className="space-y-4">
                    {activities[selectedCategory].map((activity, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          if (isAuthenticated) {
                            setSelectedActivity(activity);
                            setActiveStep(3);
                          } else {
                            navigate('/login');
                          }
                        }}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedActivity?.name === activity.name
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:bg-emerald-50 hover:border-emerald-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{activity.name}</h3>
                          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                            +{activity.points} pts
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Log Details */}
              {activeStep === 3 && selectedActivity && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-8">
                    <div className="p-3 bg-emerald-100 rounded-lg mr-4">
                      <FiBarChart2 className="text-emerald-600 text-2xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Log Activity Details</h2>
                  </div>
                  <div className="mb-6 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                    <h3 className="font-semibold text-emerald-800 mb-1">Selected Activity:</h3>
                    <p className="text-emerald-700">{selectedActivity.name}</p>
                    <p className="text-sm text-emerald-600 mt-1">Base Points: +{selectedActivity.points} pts</p>
                  </div>
                  <p className="text-gray-600 mb-8">
                    Add specifics to calculate your exact environmental impact. The more details, the more accurate your impact calculation!
                  </p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Duration/Frequency</label>
                      <input
                        type="text"
                        value={activityDetails.duration}
                        onChange={(e) => setActivityDetails({...activityDetails, duration: e.target.value})}
                        placeholder="e.g., 30 minutes, 3 times, 5 miles, 2 hours"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Tip: Include numbers for better impact calculation (e.g., "2 hours", "5 miles", "3 days")
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">Additional Notes</label>
                      <textarea
                        value={activityDetails.notes}
                        onChange={(e) => setActivityDetails({...activityDetails, notes: e.target.value})}
                        placeholder="Any extra details about your activity..."
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      ></textarea>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        if (isAuthenticated) {
                          calculateImpact();
                        } else {
                          navigate('/login');
                        }
                      }}
                      disabled={isCalculating || !isAuthenticated}
                      className="w-full py-4 bg-emerald-600 text-white rounded-lg font-bold shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCalculating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Calculating...
                        </>
                      ) : (
                        <>
                          <FiBarChart2 className="text-xl" />
                          Calculate My Impact
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: See Impact */}
              {activeStep === 4 && calculatedImpact && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-8">
                    <div className="p-3 bg-emerald-100 rounded-lg mr-4">
                      <FiAward className="text-emerald-600 text-2xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Your Environmental Impact</h2>
                  </div>
                  <p className="text-gray-600 mb-8">
                    Here's how your action contributes to a healthier planet:
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-xl text-center">
                      <div className="text-4xl mb-3">🌱</div>
                      <h3 className="font-bold text-blue-700 mb-1">Carbon Saved</h3>
                      <p className="text-2xl font-bold">{calculatedImpact?.co2} kg CO₂</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Equivalent to charging {Math.round((calculatedImpact?.co2 || 1.2) * 125)} smartphones
                      </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl text-center">
                      <div className="text-4xl mb-3">💧</div>
                      <h3 className="font-bold text-green-700 mb-1">Water Saved</h3>
                      <p className="text-2xl font-bold">{calculatedImpact?.water} liters</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Equivalent to {Math.round((calculatedImpact?.water || 45) / 15)} shower sessions
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-xl text-center">
                      <div className="text-4xl mb-3">⚡</div>
                      <h3 className="font-bold text-yellow-700 mb-1">Energy Saved</h3>
                      <p className="text-2xl font-bold">{calculatedImpact?.energy} kWh</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Enough to power a laptop for {Math.round((calculatedImpact?.energy || 0.8) * 10)} hours
                      </p>
                    </div>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-xl">
                    <h3 className="font-bold text-emerald-800 mb-3">🏆 You earned {calculatedImpact?.points} EcoPoints!</h3>
                    <p className="text-gray-700 mb-4">
                      Great job! You're now {calculatedImpact?.points} points closer to your next badge. Keep up the good work!
                    </p>
                    <div className="flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={resetForm}
                        className="px-6 py-2 bg-white text-emerald-600 border border-emerald-600 rounded-lg font-medium hover:bg-emerald-100 transition-all"
                      >
                        Log Another Activity
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={goToDashboard}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all"
                      >
                        View Dashboard
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
              </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Track Your <span className="text-emerald-600">Eco-Actions</span>?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <div className="text-emerald-600 text-3xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3">Measure Your Impact</h3>
              <p className="text-gray-600">
                See exactly how much carbon, water, and energy you're saving with each action you take.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <div className="text-emerald-600 text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Earn Rewards</h3>
              <p className="text-gray-600">
                Unlock badges, level up, and join challenges as you build sustainable habits.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <div className="text-emerald-600 text-3xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">Join a Community</h3>
              <p className="text-gray-600">
                Connect with others who share your passion for sustainability and the planet.
              </p>
            </motion.div>
          </div>
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
            Ready to Start Your Eco-Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl mb-8"
          >
            Join thousands of eco-conscious individuals making a real difference.
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
              onClick={() => isAuthenticated ? navigate('/dashboard') : navigate('/login')}
              className="px-8 py-3 bg-white text-emerald-700 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started - It's Free"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:bg-opacity-10 transition-all"
            >
              See How It Works
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;