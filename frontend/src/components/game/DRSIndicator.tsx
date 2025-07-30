// src/components/game/DRSIndicator.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface DRSIndicatorProps {
  isEnabled: boolean;
  accuracy: number;
}

export default function DRSIndicator({ isEnabled, accuracy }: DRSIndicatorProps) {
  return (
    <AnimatePresence>
      {isEnabled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40"
        >
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            {/* DRS Activated Badge */}
            <div className="bg-green-500 text-black px-6 py-3 rounded-lg font-bold text-lg shadow-lg">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  ⚡
                </motion.div>
                <span>DRS ACTIVATED</span>
                <span className="text-sm">{accuracy}%</span>
              </div>
            </div>
            
            {/* Speed lines effect */}
            <motion.div
              className="absolute inset-0 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-green-400 blur-xl" />
            </motion.div>
          </motion.div>
          
          {/* Info text */}
          <p className="text-center text-green-400 text-sm mt-2">
            High accuracy boost active!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}