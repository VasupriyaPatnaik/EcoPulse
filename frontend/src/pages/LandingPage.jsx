import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Application } from "@splinetool/runtime"; // Using runtime instead of react-spline
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [voicePlayed, setVoicePlayed] = useState(false);
  const [ecoFact, setEcoFact] = useState("");
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const statsRef = useRef(null);
  const canvasRef = useRef(null);
  const splineCanvasRef = useRef(null);
  const splineInstance = useRef(null);

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

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-emerald-900 text-white min-h-screen">
      {/* Interactive Particle Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      <Navbar />

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
            >
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW0xN2R2a3F5b3l5b2V6dGJ0dWJ6eHZ1b2R4eWZ4cXJ4d3N1eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKsQ8UQ1h4LhG1i/giphy.gif"
                alt="Eco mascot"
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}
        </div>

        {/* Rest of your content remains exactly the same */}
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
            <motion.a
              href="/dashboard"
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
            </motion.a>

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
        className="relative z-10 py-20 bg-gradient-to-br from-emerald-900/80 to-teal-900/80"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { value: "1M+", label: "Eco-Actions Logged", icon: "🌍" },
            { value: "250K+", label: "Active Users", icon: "👥" },
            { value: "5K+ Tons", label: "CO₂ Reduced", icon: "🌱" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-8 bg-black/20 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-emerald-400 transition-colors duration-300"
            >
              <div className="text-6xl mb-2">{stat.icon}</div>
              <div className="text-5xl font-bold text-emerald-300 mb-2">
                {stat.value}
              </div>
              <div className="text-xl text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-50 w-80 bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-emerald-400/30"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white font-bold flex justify-between items-center">
              <span>EcoBot Assistant</span>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="p-4 h-60 overflow-y-auto">
              <div className="bg-gray-700/50 rounded-lg p-3 mb-3 text-sm">
                Hi! I'm EcoBot. Ask me anything about sustainability!
              </div>
              <input
                type="text"
                placeholder="Ask an eco-question..."
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setEcoFact(
                      "Did you know? Recycling one aluminum can saves enough energy to run a TV for 3 hours!"
                    );
                  }
                }}
              />
              {ecoFact && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-900/30 rounded-lg p-3 mt-3 text-sm border border-emerald-400/20"
                >
                  {ecoFact}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
