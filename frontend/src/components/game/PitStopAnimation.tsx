'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PitStopAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function PitStopAnimation({ isVisible, onComplete }: PitStopAnimationProps) {
  const [pitTime, setPitTime] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      setPitTime(0);
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setPitTime(elapsed);
        
        if (elapsed >= 2.0) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
        }
      }, 10);
      
      return () => clearInterval(interval);
    }
  }, [isVisible, onComplete]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative"
          >
            {/* Pit Stop Container */}
            <div className="bg-gray-900 p-12 rounded-2xl border-2 border-red-600">
              <motion.h2 
                className="text-5xl font-bold text-center mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                🔧 PIT STOP 🔧
              </motion.h2>
              
              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="text-8xl font-mono font-bold text-yellow-400">
                  {pitTime.toFixed(2)}s
                </div>
                <p className="text-gray-400 mt-2">Target: 2.30s</p>
              </div>
              
              {/* Tyre Change Animation */}
              {/* F1 Tyre Change Animation */}
<div className="flex justify-center gap-8 mb-6">
  {['FL', 'FR', 'RL', 'RR'].map((wheel, index) => (
    <motion.div
      key={wheel}
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.1,
      }}
    >
      {/* F1 Wheel */}
      <motion.div
        className="w-16 h-16 relative"
        animate={{ rotate: pitTime < 1.5 ? -360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Tire */}
        <div className="absolute inset-0 rounded-full bg-gray-800 border-4 border-gray-900">
          {/* Pirelli branding */}
          <div className="absolute inset-2 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-xs font-bold text-yellow-400">P</span>
          </div>
        </div>
        {/* Rim spokes */}
        <div className="absolute inset-4 rounded-full border-2 border-gray-600">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-600 -translate-y-1/2" />
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-600 -translate-x-1/2" />
        </div>
      </motion.div>
      {/* Wheel label */}
      <span className="text-xs text-gray-400 mt-1 block text-center">{wheel}</span>
    </motion.div>
  ))}
</div>
              
              {/* Crew Messages */}
              <motion.p 
                className="text-center text-gray-300"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {pitTime < 0.5 ? "Jack up!" : 
                 pitTime < 1.3 ? "Tyres off!" : 
                 pitTime < 1.8 ? "Tyres on!" : 
                 "GO GO GO!"}
              </motion.p>
            </div>
            
            {/* Red Bull Style Accent */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl blur opacity-25" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}