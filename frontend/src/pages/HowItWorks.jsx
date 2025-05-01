import { motion } from "framer-motion";
import { useState } from "react";
import { FiActivity, FiList, FiAward, FiBarChart2, FiCheckCircle } from "react-icons/fi";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const Step = ({ number, title, active, completed, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center cursor-pointer p-4 rounded-xl ${
        active ? "bg-emerald-100 border-l-4 border-emerald-500" : 
        completed ? "bg-gray-100" : "bg-white"
      } shadow-sm mb-4 transition-all`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
        active ? "bg-emerald-500 text-white" : 
        completed ? "bg-gray-300 text-white" : "bg-gray-200"
      }`}>
        {completed ? <FiCheckCircle className="text-lg" /> : number}
      </div>
      <h3 className={`font-medium ${
        active ? "text-emerald-700" : "text-gray-700"
      }`}>{title}</h3>
    </motion.div>
  );

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
                onClick={() => setActiveStep(1)}
              />
              <Step 
                number={2} 
                title="Select Activity" 
                active={activeStep === 2} 
                completed={activeStep > 2}
                onClick={() => selectedCategory && setActiveStep(2)}
              />
              <Step 
                number={3} 
                title="Log Details" 
                active={activeStep === 3} 
                completed={activeStep > 3}
                onClick={() => selectedCategory && setActiveStep(3)}
              />
              <Step 
                number={4} 
                title="See Impact" 
                active={activeStep === 4} 
                completed={false}
                onClick={() => selectedCategory && setActiveStep(4)}
              />
            </div>

            {/* Step Content */}
            <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-8">
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
                          setSelectedCategory(category.name);
                          setActiveStep(2);
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
                        onClick={() => setActiveStep(3)}
                        className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-all"
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
              {activeStep === 3 && (
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
                  <p className="text-gray-600 mb-8">
                    Add specifics to calculate your exact environmental impact.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Duration/Frequency</label>
                      <input
                        type="text"
                        placeholder="e.g., 30 minutes, 3 times, 5 miles"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Additional Notes</label>
                      <textarea
                        placeholder="Any extra details about your activity..."
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      ></textarea>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveStep(4)}
                      className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold shadow-md hover:bg-emerald-700 transition-all"
                    >
                      Calculate My Impact
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: See Impact */}
              {activeStep === 4 && (
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
                      <p className="text-2xl font-bold">1.2 kg CO₂</p>
                      <p className="text-sm text-gray-600 mt-2">Equivalent to charging 150 smartphones</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl text-center">
                      <div className="text-4xl mb-3">💧</div>
                      <h3 className="font-bold text-green-700 mb-1">Water Saved</h3>
                      <p className="text-2xl font-bold">45 liters</p>
                      <p className="text-sm text-gray-600 mt-2">Equivalent to 3 shower sessions</p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-xl text-center">
                      <div className="text-4xl mb-3">⚡</div>
                      <h3 className="font-bold text-yellow-700 mb-1">Energy Saved</h3>
                      <p className="text-2xl font-bold">0.8 kWh</p>
                      <p className="text-sm text-gray-600 mt-2">Enough to power a laptop for 8 hours</p>
                    </div>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-xl">
                    <h3 className="font-bold text-emerald-800 mb-3">🏆 You earned 15 EcoPoints!</h3>
                    <p className="text-gray-700 mb-4">
                      Great job! You're now 15 points closer to your next badge. Keep up the good work!
                    </p>
                    <div className="flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveStep(1)}
                        className="px-6 py-2 bg-white text-emerald-600 border border-emerald-600 rounded-lg font-medium hover:bg-emerald-100 transition-all"
                      >
                        Log Another
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all"
                      >
                        View Dashboard
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
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
              className="px-8 py-3 bg-white text-emerald-700 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Get Started - It's Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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