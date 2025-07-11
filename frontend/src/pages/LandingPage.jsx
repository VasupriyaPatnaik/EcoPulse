import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Application } from "@splinetool/runtime";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EcoMascot from "../components/EcoMascot";
import { useAuth } from "../context/AuthContext";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [authError, setAuthError] = useState("");
  const [voicePlayed, setVoicePlayed] = useState(false);
  const [ecoFact, setEcoFact] = useState("");
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: "Hi! I'm EcoBot. Ask me anything about sustainability, recycling, or environmental tips! 🌱", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const statsRef = useRef(null);
  const canvasRef = useRef(null);
  const splineCanvasRef = useRef(null);
  const splineInstance = useRef(null);
  const authModalRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Handle click outside auth modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        authModalRef.current &&
        !authModalRef.current.contains(event.target)
      ) {
        setShowAuthModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Voice greeting
  const speak = (text) => {
    if ("speechSynthesis" in window && !voicePlayed) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
      setVoicePlayed(true);
    }
  };

  // Load Spline scene
  useEffect(() => {
    const loadSpline = async () => {
      try {
        if (!splineCanvasRef.current) return;

        splineInstance.current = new Application(splineCanvasRef.current);
        await splineInstance.current.load(
          "https://prod.spline.design/6Wq1Q7YGyM-bJ6f5/scene.splinecode",
          {
            credentials: "include",
            mode: "no-cors",
          }
        );
        setSplineLoaded(true);
        speak("Welcome to EcoPulse! Let's save the planet together!");
      } catch (error) {
        console.error("Spline loading error:", error);
        setSplineError(true);
      }
    };

    loadSpline();

    return () => {
      if (splineInstance.current) {
        splineInstance.current.dispose();
      }
    };
  }, []);

  // Animate stats counter
  useEffect(() => {
    const stats = statsRef.current?.children;
    if (!stats) return;

    gsap.from(stats, {
      duration: 1.5,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
      },
    });

    // Floating particles background
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const colors = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0"];

      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 5 + 1;
          this.speedX = Math.random() * 3 - 1.5;
          this.speedY = Math.random() * 3 - 1.5;
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.size > 0.2) this.size -= 0.05;
        }

        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length < 100 && Math.random() > 0.7) {
          particles.push(new Particle());
        }

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
          }
        }
        requestAnimationFrame(animateParticles);
      }
      animateParticles();
    }
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setAuthError("Email and password are required");
      return;
    }

    if (authMode === "signup" && !formData.name) {
      setAuthError("Name is required for signup");
      return;
    }

    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll just simulate a successful login
      console.log(`${authMode} attempt with:`, formData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo, just close the modal and show success
      setShowAuthModal(false);
      speak(
        authMode === "login"
          ? "Welcome back to EcoPulse!"
          : "Account created successfully! Welcome to EcoPulse!"
      );

      // Reset form
      setFormData({
        email: "",
        password: "",
        name: "",
      });
    } catch (error) {
      setAuthError(error.message || "Authentication failed. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleAuthMode = () => {
    setAuthMode((prev) => (prev === "login" ? "signup" : "login"));
    setAuthError("");
  };

  // Features data
  const features = [
    {
      icon: "🌱",
      title: "Smart Habit Tracker",
      description: "Log eco-actions with voice commands & AI suggestions.",
      color: "text-emerald-400",
    },
    {
      icon: "📊",
      title: "Real-Time Impact Dashboard",
      description: "3D visualizations of your carbon & water savings.",
      color: "text-blue-400",
    },
    {
      icon: "🏆",
      title: "Gamified Challenges",
      description: "Compete in global sustainability leaderboards.",
      color: "text-amber-400",
    },
  ];

  // Eco-friendly knowledge base
  const ecoKnowledgeBase = {
    recycling: [
      "Recycling one aluminum can saves enough energy to run a TV for 3 hours! ♻️",
      "Glass can be recycled endlessly without losing quality. It's 100% recyclable! 🥃",
      "Recycling one ton of paper saves 17 trees, 7,000 gallons of water, and 3.3 cubic yards of landfill space! 📄",
      "Plastic bottles can take up to 450 years to decompose, but recycling them saves 80% of the energy needed to make new ones! 🧴"
    ],
    energy: [
      "LED bulbs use 75% less energy than incandescent bulbs and last 25 times longer! 💡",
      "Unplugging devices when not in use can save up to 10% on your electricity bill! 🔌",
      "Solar panels can reduce your carbon footprint by 3-4 tons of CO2 per year! ☀️",
      "A programmable thermostat can save you up to 10% on heating and cooling costs! 🌡️"
    ],
    water: [
      "A dripping faucet can waste over 3,000 gallons of water per year! 💧",
      "Taking shorter showers can save up to 2,300 gallons of water per year! 🚿",
      "Collecting rainwater for plants can reduce your water bill by 40%! 🌧️",
      "Fixing leaks immediately can save thousands of gallons of water annually! 🔧"
    ],
    transportation: [
      "Biking instead of driving for short trips can reduce CO2 emissions by 2,400 pounds per year! 🚴",
      "Electric vehicles produce 60% fewer emissions than gas cars over their lifetime! 🚗⚡",
      "Using public transport can reduce your carbon footprint by 4,800 pounds of CO2 annually! 🚌",
      "Carpooling just 2 days a week can reduce your carbon footprint by 1,600 pounds per year! 👥"
    ],
    food: [
      "Composting food waste reduces methane emissions and creates nutrient-rich soil! 🍃",
      "Eating less meat just one day a week can save 1,900 pounds of CO2 annually! 🥗",
      "Buying local produce reduces transportation emissions by up to 95%! 🍎",
      "Growing your own herbs can reduce packaging waste and save money! 🌿"
    ],
    general: [
      "The average person produces 4.5 pounds of trash per day. Reduce, reuse, recycle! 🗑️",
      "Switching to reusable bags can prevent 1,000 plastic bags from entering landfills per year! 🛍️",
      "Digital receipts can save millions of trees from being cut down! 📱",
      "One mature tree can absorb 48 pounds of CO2 per year! 🌳"
    ]
  };

  // Random eco tips
  const randomEcoTips = [
    "💡 Tip: Use both sides of paper to reduce waste by 50%!",
    "🌱 Tip: Plant native species in your garden - they require less water and maintenance!",
    "🔋 Tip: Charge your devices during off-peak hours to reduce energy demand!",
    "🧽 Tip: Make your own cleaning products with vinegar and baking soda!",
    "☕ Tip: Bring your own cup to coffee shops - many offer discounts!",
    "🥤 Tip: Use a reusable water bottle to prevent 156 plastic bottles per year!",
    "🏠 Tip: Seal air leaks in your home to save up to 20% on heating costs!",
    "📦 Tip: Reuse cardboard boxes for storage or donate them to local businesses!"
  ];

  // Chatbot response logic
  const getChatbotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 I'm here to help you learn about sustainable living. What would you like to know about?";
    }
    
    // Check for thanks
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! 😊 Keep up the great work making our planet greener! 🌍";
    }
    
    // Topic-based responses
    if (message.includes('recycle') || message.includes('recycling')) {
      return ecoKnowledgeBase.recycling[Math.floor(Math.random() * ecoKnowledgeBase.recycling.length)];
    }
    
    if (message.includes('energy') || message.includes('electricity') || message.includes('power')) {
      return ecoKnowledgeBase.energy[Math.floor(Math.random() * ecoKnowledgeBase.energy.length)];
    }
    
    if (message.includes('water') || message.includes('shower') || message.includes('faucet')) {
      return ecoKnowledgeBase.water[Math.floor(Math.random() * ecoKnowledgeBase.water.length)];
    }
    
    if (message.includes('transport') || message.includes('car') || message.includes('bike') || message.includes('drive')) {
      return ecoKnowledgeBase.transportation[Math.floor(Math.random() * ecoKnowledgeBase.transportation.length)];
    }
    
    if (message.includes('food') || message.includes('eat') || message.includes('compost')) {
      return ecoKnowledgeBase.food[Math.floor(Math.random() * ecoKnowledgeBase.food.length)];
    }
    
    if (message.includes('tip') || message.includes('advice') || message.includes('help')) {
      return randomEcoTips[Math.floor(Math.random() * randomEcoTips.length)];
    }
    
    if (message.includes('climate') || message.includes('global warming') || message.includes('carbon')) {
      return "Climate change is real! 🌡️ Small actions like reducing energy use, recycling, and choosing sustainable products can make a big difference. Every action counts! 🌍";
    }
    
    if (message.includes('plastic') || message.includes('bottle')) {
      return "Plastic pollution is a huge problem! 🌊 Try using reusable alternatives like glass containers, metal straws, and cloth bags. Your choices matter! ♻️";
    }
    
    // Default responses for unknown queries
    const defaultResponses = [
      "That's a great question! 🤔 Here's what I know: " + ecoKnowledgeBase.general[Math.floor(Math.random() * ecoKnowledgeBase.general.length)],
      "I'm still learning about that topic! 🧠 But here's a helpful eco-tip: " + randomEcoTips[Math.floor(Math.random() * randomEcoTips.length)],
      "Interesting! 🌟 Let me share something related: " + ecoKnowledgeBase.general[Math.floor(Math.random() * ecoKnowledgeBase.general.length)],
      "Great question! 💚 While I think about that, here's an eco-fact: " + ecoKnowledgeBase.general[Math.floor(Math.random() * ecoKnowledgeBase.general.length)]
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Handle chat message submission
  const handleChatSubmit = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const userMessage = { text: userInput, sender: "user" };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Set typing indicator
    setIsTyping(true);
    
    // Clear input
    setUserInput("");
    
    // Generate bot response after a delay
    setTimeout(() => {
      const botResponse = getChatbotResponse(userInput);
      const botMessage = { text: botResponse, sender: "bot" };
      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-emerald-900 text-white min-h-screen">
      {/* Interactive Particle Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      <Navbar
        onLoginClick={() => {
          navigate("/login");
        }}
      />
      <EcoMascot />

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={authModalRef}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden border border-emerald-400/30 w-full max-w-md"
            >
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white text-center">
                <h2 className="text-2xl font-bold">
                  {authMode === "login" ? "Welcome Back" : "Join EcoPulse"}
                </h2>
                <p className="text-sm opacity-80 mt-1">
                  {authMode === "login"
                    ? "Log in to track your eco-impact"
                    : "Create an account to start your journey"}
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="p-6">
                {authMode === "signup" && (
                  <div className="mb-4">
                    <label
                      className="block text-gray-300 text-sm mb-2"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="Jane Doe"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label
                    className="block text-gray-300 text-sm mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label
                    className="block text-gray-300 text-sm mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder={
                      authMode === "login"
                        ? "••••••••"
                        : "At least 8 characters"
                    }
                  />
                </div>

                {authError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-lg text-sm"
                  >
                    {authError}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 mb-4"
                >
                  {authMode === "login" ? "Log In" : "Sign Up"}
                </button>

                <div className="text-center text-sm text-gray-400">
                  {authMode === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={toggleAuthMode}
                        className="text-emerald-400 hover:text-emerald-300 font-medium"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={toggleAuthMode}
                        className="text-emerald-400 hover:text-emerald-300 font-medium"
                      >
                        Log in
                      </button>
                    </>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* 3D Animated Mascot with fallback */}
        <div className="absolute right-5 lg:right-10 top-1/2 -translate-y-1/2 w-full max-w-xl h-[400px] lg:h-[600px]">
          {!splineError ? (
            <>
              <canvas
                ref={splineCanvasRef}
                className={`w-full h-full ${
                  splineLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{ transition: "opacity 0.5s ease-out" }}
              />
              {!splineLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center justify-center"
            ></motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 max-w-3xl mx-auto"
        >
          <motion.h1
            className="text-5xl sm:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <span className="text-white">Join the</span> EcoPulse{" "}
            <span className="text-emerald-300">Revolution</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl max-w-2xl mx-auto mb-8 leading-relaxed text-emerald-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Transform your eco-actions into{" "}
            <span className="font-semibold text-white">real impact</span> with
            our{" "}
            <span className="font-semibold text-emerald-300">
              AI-powered sustainability tracker
            </span>
            .
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <motion.button
              onClick={() => {
                if (isAuthenticated) {
                  navigate("/dashboard");
                } else {
                  navigate("/login");
                }
              }}
              className="relative px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg hover:shadow-emerald-400/30 transition-all duration-300 overflow-hidden group"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started <span className="text-xl">🚀</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>

            <motion.button
              onClick={() => setShowChatbot(true)}
              className="px-8 py-4 rounded-full font-bold text-white border-2 border-emerald-400 bg-black/20 hover:bg-emerald-900/50 backdrop-blur-sm transition-colors duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Ask EcoBot <span className="text-xl">🤖</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="block text-sm text-emerald-300">Scroll Down</span>
          <div className="mx-auto w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center p-1">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-emerald-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Why <span className="text-emerald-400">EcoPulse</span> Stands Out
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-b from-gray-800/50 to-gray-900/80 rounded-2xl p-8 border border-gray-700 hover:border-emerald-400 transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`text-5xl mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* Stats Section */}
<section 
  ref={statsRef}
  className="relative z-10 py-24 bg-gray-900 text-white"
>
  <div className="max-w-7xl mx-auto px-6">
    <motion.h2
      className="text-4xl font-bold text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      Our <span className="text-emerald-400">Collective Impact</span>
    </motion.h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { value: "1M+", label: "Eco-Actions Logged", icon: "🌍" },
        { value: "250K+", label: "Active Users", icon: "👥" },
        { value: "5K+ Tons", label: "CO₂ Reduced", icon: "🌱" },
      ].map((stat, idx) => (
        <motion.div
          key={idx}
          className="text-center p-8 bg-gray-800 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300 hover:scale-[1.03] shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl mb-4 text-emerald-400">{stat.icon}</div>
          <div className="text-5xl font-bold text-white mb-3">
            {stat.value}
          </div>
          <div className="text-xl text-gray-300 font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Floating Chatbot Button */}
      <AnimatePresence>
        {!showChatbot && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowChatbot(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform duration-200 border-2 border-emerald-400/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="animate-pulse">🤖</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-8 right-8 z-50 w-96 bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-emerald-400/30"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white font-bold flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <span className="block text-sm">EcoBot Assistant</span>
                  <span className="block text-xs text-emerald-200">Online • Ready to help</span>
                </div>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-white hover:text-gray-200 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 h-80 overflow-y-auto bg-gray-900 space-y-3" ref={chatMessagesRef}>
              {chatMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-700 text-gray-200 border border-gray-600'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-700 text-gray-200 border border-gray-600 max-w-xs px-4 py-2 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask about recycling, energy, water saving..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleChatSubmit();
                    }
                  }}
                />
                <button
                  onClick={handleChatSubmit}
                  disabled={!userInput.trim() || isTyping}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Send
                </button>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {['💡 Energy tips', '♻️ Recycling', '💧 Water saving', '🌱 Random tip'].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const topicMap = {
                        '💡 Energy tips': 'energy',
                        '♻️ Recycling': 'recycling',
                        '💧 Water saving': 'water',
                        '🌱 Random tip': 'tip'
                      };
                      setUserInput(topicMap[suggestion]);
                      setTimeout(() => handleChatSubmit(), 100);
                    }}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full text-xs transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
