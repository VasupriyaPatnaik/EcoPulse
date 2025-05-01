import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const EcoMascot = () => {
  const [showMascot, setShowMascot] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowMascot(true);
      
      if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = "Hi friend! Ready to save the planet with me? ♡ 🌱";
        msg.rate = 0.8;
        msg.pitch = 1.4;
        window.speechSynthesis.speak(msg);
      }
    }, 800);

    const hideTimer = setTimeout(() => setShowMascot(false), 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {showMascot && (
        <motion.div
          initial={{ x: "150%" }}
          animate={{ 
            x: 0,
            transition: { 
              type: "spring", 
              damping: 7,
              stiffness: 100,
              mass: 0.3
            }
          }}
          exit={{ 
            x: "150%",
            transition: { 
              ease: "backIn",
              duration: 0.7 
            }
          }}
          className="fixed right-0 bottom-20 z-[999] flex items-end"
        >
          <div className="relative">
            {/* Speech Bubble */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1,
                transition: { 
                  delay: 0.4,
                  type: "spring",
                  stiffness: 400,
                  damping: 8
                }
              }}
              className="bg-white/95 text-gray-800 px-5 py-3 rounded-2xl shadow-lg mb-3 mr-28 max-w-xs"
            >
              <p className="font-bold text-emerald-600">Hi friend!</p>
              <p className="text-sm">Ready to save the planet with me? ♡🌱</p>
              <div className="absolute -right-3 bottom-3 w-4 h-4 bg-white/95 transform rotate-45"></div>
            </motion.div>

            {/* Front-Facing Cute Earth */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Main body */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="w-24 h-24 rounded-full bg-gradient-to-b from-blue-400 to-emerald-400 shadow-xl flex flex-col items-center justify-center relative overflow-hidden"
              >
                {/* Eyes */}
                <div className="flex space-x-6 mb-1">
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="w-4 h-4 bg-white rounded-full relative"
                  >
                    <div className="absolute w-2 h-2 bg-black rounded-full top-1 left-1"></div>
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-1 h-1 bg-white rounded-full top-0 left-0"
                    />
                  </motion.div>
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 0.3
                    }}
                    className="w-4 h-4 bg-white rounded-full relative"
                  >
                    <div className="absolute w-2 h-2 bg-black rounded-full top-1 left-1"></div>
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute w-1 h-1 bg-white rounded-full top-0 left-0"
                    />
                  </motion.div>
                </div>

                {/* Blushing cheeks */}
                <div className="flex justify-center space-x-8 -mt-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-3 h-2 bg-pink-300/70 rounded-full blur-sm"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="w-3 h-2 bg-pink-300/70 rounded-full blur-sm"
                  />
                </div>

                {/* Mouth */}
                <motion.div
                  animate={{
                    scaleY: [1, 0.8, 1],
                    borderRadius: ["50%", "40%", "50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="w-6 h-2 bg-pink-400 rounded-full mt-2"
                />

                {/* Leaf hair accessory */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-green-500 text-3xl"
                >
                  🌿
                </motion.div>
              </motion.div>

              {/* Waving arms (now positioned for front view) */}
              <motion.div
                className="absolute top-8 -left-4 w-5 h-8 bg-emerald-300 rounded-full origin-bottom"
                animate={{
                  rotate: [-20, 30, -20],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute top-8 -right-4 w-5 h-8 bg-emerald-300 rounded-full origin-bottom"
                animate={{
                  rotate: [20, -30, 20],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
            </motion.div>

            {/* Floating sparkles */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: 1
              }}
              className="absolute top-2 left-10 text-yellow-300 text-xl"
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EcoMascot;