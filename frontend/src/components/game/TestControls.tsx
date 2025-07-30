'use client';
import { motion } from 'framer-motion';

interface TestControlsProps {
  onReset: () => void;
  onNewTrack: () => void;
  isComplete: boolean;
}

export default function TestControls({ onReset, onNewTrack, isComplete }: TestControlsProps) {
  return (
    <motion.div 
      className="flex justify-center gap-4 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <button
        onClick={onReset}
        className={`
          px-6 py-3 rounded-lg font-medium transition-all
          ${isComplete 
            ? 'bg-yellow-600 hover:bg-yellow-700 text-black' 
            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
          }
        `}
      >
        {isComplete ? '🔄 Retry Same Track' : '🛑 Pit Stop (Esc)'}
      </button>
      
      <button
        onClick={onNewTrack}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
      >
        🏁 New Track
      </button>
    </motion.div>
  );
}