// src/components/game/LandingAnimation.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LandingAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    // Check if user has seen animation before
    const hasSeenAnimation = localStorage.getItem('hasSeenF1Animation');
    
    if (hasSeenAnimation) {
      setIsVisible(false);
      return;
    }
    
    // Animation sequence
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Lights sequence
      setTimeout(() => setPhase(2), 2500),  // GO!
      setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem('hasSeenF1Animation', 'true');
      }, 3500),
    ];
    
    return () => timers.forEach(clearTimeout);
  }, []);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          {/* Starting Grid Lights */}
          {phase === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold text-red-600 mb-8">
                SyntaxRacer
              </h1>
              <div className="flex gap-4 justify-center">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-16 bg-gray-800 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
              </div>
              <p className="text-gray-400 mt-8">Get ready to race...</p>
            </motion.div>
          )}
          
          {/* Lights turning red */}
          {phase === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold text-red-600 mb-8">
                SyntaxRacer
              </h1>
              <div className="flex gap-4 justify-center">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-16 rounded-full"
                    initial={{ backgroundColor: '#1f2937' }}
                    animate={{ backgroundColor: '#dc2626' }}
                    transition={{ delay: i * 0.3 }}
                  />
                ))}
              </div>
              <motion.p 
                className="text-gray-400 mt-8"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Lights out in...
              </motion.p>
            </motion.div>
          )}
          
          {/* GO! */}
          {phase === 2 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <motion.h1 
                className="text-9xl font-bold text-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                GO!
              </motion.h1>
              <motion.p 
                className="text-2xl text-gray-300 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Start your engines! 🏎️
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}