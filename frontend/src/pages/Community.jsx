import { motion } from "framer-motion";
import { useState } from "react";
import { FiAward, FiUsers, FiTrendingUp, FiClock, FiCheckCircle } from "react-icons/fi";

const Community = () => {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [joinedChallenges, setJoinedChallenges] = useState(["Plastic-Free Week"]);

  // Leaderboard data
  const leaderboard = [
    { rank: 1, name: "EcoWarrior42", points: 1245, avatar: "🌍", progress: 100 },
    { rank: 2, name: "GreenThumb", points: 1120, avatar: "🌱", progress: 90 },
    { rank: 3, name: "SustainableSam", points: 980, avatar: "♻️", progress: 80 },
    { rank: 4, name: "ClimateCrusader", points: 875, avatar: "🔥", progress: 70 },
    { rank: 5, name: "RecycleQueen", points: 820, avatar: "🔄", progress: 65 },
    { rank: 6, name: "SolarSister", points: 790, avatar: "☀️", progress: 60 },
    { rank: 7, name: "EcoExplorer", points: 745, avatar: "🧭", progress: 55 },
    { rank: 8, name: "PlanetPal", points: 680, avatar: "🌎", progress: 50 },
  ];

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
                  </p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 flex items-center ${
                        index < 3 ? "bg-gradient-to-r from-emerald-50 to-teal-50" : ""
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        index === 0 ? "bg-yellow-100 text-yellow-600" :
                        index === 1 ? "bg-gray-200 text-gray-600" :
                        index === 2 ? "bg-orange-100 text-orange-600" :
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
                            <h3 className="font-medium">{user.name}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <FiAward className="mr-1" /> {user.points} EcoPoints
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
                              "bg-emerald-400"
                            }`}
                            style={{ width: `${user.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 text-right mt-1">
                          {user.progress}%
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
              </div>

              {/* Your Position */}
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <span className="bg-emerald-100 text-emerald-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">🌟</span>
                  Your Position
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">👋</span>
                    <div>
                      <h4 className="font-medium">EcoHero (You)</h4>
                      <p className="text-sm text-gray-600">Rank #42 with 645 points</p>
                    </div>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-400" 
                        style={{ width: "52%" }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right mt-1">
                      52% to next level
                    </div>
                  </div>
                </div>
              </div>
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
                          Join Challenge
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
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
                  <p className="text-gray-600">You haven't joined any challenges yet.</p>
                )}
              </div>
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