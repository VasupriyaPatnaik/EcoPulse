import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ecoMascotAnimation from "../assets/animations/eco-mascot.json";

export default function LandingPage() {
  const mascotRef = useRef(null);
  const [showSpeech, setShowSpeech] = useState(false);
  const [voicePlayed, setVoicePlayed] = useState(false);
  const speechSynth = useRef(null);

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Initial delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Play mascot entry animation
      if (mascotRef.current) {
        mascotRef.current.playSegments([0, 50], true);
      }

      // Show speech bubble
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSpeech(true);

      // Voice greeting (delayed slightly after bubble appears)
      await new Promise(resolve => setTimeout(resolve, 300));
      playVoiceGreeting();
    };

    sequence();

    return () => {
      if (speechSynth.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playVoiceGreeting = () => {
    if ('speechSynthesis' in window && !voicePlayed) {
      speechSynth.current = new SpeechSynthesisUtterance();
      speechSynth.current.text = "Welcome to EcoPulse! Let's make our planet greener together!";
      speechSynth.current.rate = 0.9;
      speechSynth.current.pitch = 1.1;
      
      // Try to get a natural-sounding voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes("Google US English")) || 
                           voices.find(v => v.lang.includes("en-US"));
      
      if (preferredVoice) {
        speechSynth.current.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(speechSynth.current);
      setVoicePlayed(true);
    }
  };

  // Fallback for browsers requiring user interaction
  const handleUserInteraction = () => {
    if (!voicePlayed) {
      playVoiceGreeting();
    }
  };

  // Feature cards data
  const features = [
    {
      icon: "🌱",
      title: "Log Green Actions",
      description: "Track daily sustainable activities like biking, recycling, or reducing energy use.",
      color: "text-green-500"
    },
    {
      icon: "📊",
      title: "Visualize Impact",
      description: "Beautiful dashboards show your CO₂ reduction, water saved, and energy conserved.",
      color: "text-blue-500"
    },
    {
      icon: "🏆",
      title: "Earn Rewards",
      description: "Unlock achievements, join challenges, and compete in our eco-community.",
      color: "text-amber-500"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Active Eco-Warriors" },
    { value: "500K kg", label: "CO₂ Reduced" },
    { value: "2M+", label: "Sustainable Actions" }
  ];

  return (
    <div 
      className="bg-gradient-to-b from-green-50 to-white text-gray-900 flex flex-col min-h-screen overflow-x-hidden"
      onClick={handleUserInteraction}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        {/* Animated Mascot */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            damping: 12,
            stiffness: 100,
            delay: 0.7
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-64 md:w-80 lg:w-96 z-20 pointer-events-none"
        >
          <div className="relative">
            <Lottie
              lottieRef={mascotRef}
              animationData={ecoMascotAnimation}
              loop={false}
              autoplay={false}
              className="drop-shadow-lg"
            />
            
            {/* Speech Bubble */}
            {showSpeech && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="absolute -top-16 left-0 bg-white rounded-3xl px-4 py-2 shadow-lg border border-green-200 max-w-xs"
              >
                <div className="text-sm font-medium text-green-800">
                  Welcome to EcoPulse! <span className="animate-pulse">👋</span>
                </div>
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-green-200"></div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl sm:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-800"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            EcoPulse
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl max-w-3xl mx-auto text-gray-700 mb-8 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Transform your <span className="font-semibold text-green-700">eco-friendly actions</span> into measurable impact. 
            Join a community making sustainability <span className="font-semibold text-emerald-600">rewarding and fun</span>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="/dashboard"
              className="relative px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg hover:shadow-emerald-200/50 transition-all duration-300 overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Start Tracking →</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.a>

            <motion.a
              href="#features"
              className="px-8 py-4 rounded-full font-semibold text-emerald-800 border-2 border-emerald-200 bg-white/80 hover:bg-emerald-50 transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            How <span className="text-green-600">EcoPulse</span> Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:border-green-100 transition-all duration-300 hover:-translate-y-2"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  bounce: 0.4,
                  duration: 0.8,
                  delay: idx * 0.1
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={`text-4xl mb-4 ${feature.color}`}>{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="mt-6 h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}