'use client';

import { motion } from 'framer-motion';

interface TimerOptionsProps {
  selectedMode: 'time' | 'code';
  selectedTime: number | null;
  onModeChange: (mode: 'time' | 'code') => void;
  onTimeChange: (time: number) => void;
  isGameActive: boolean;
}

export default function TimerOptions({
  selectedMode,
  selectedTime,
  onModeChange,
  onTimeChange,
  isGameActive,
}: TimerOptionsProps) {
  const timeOptions = [15, 30, 60];

  return (
    <div className="flex items-center justify-center gap-6 mb-6">
      {/* Mode Selection */}
      <div className="flex bg-gray-800 rounded-lg p-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModeChange('time')}
          disabled={isGameActive}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md transition-all
            ${selectedMode === 'time' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-400 hover:text-gray-200'
            }
            ${isGameActive ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <span>⏱️</span>
          <span>Time</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModeChange('code')}
          disabled={isGameActive}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md transition-all
            ${selectedMode === 'code' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-400 hover:text-gray-200'
            }
            ${isGameActive ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <span>📝</span>
          <span>Code</span>
        </motion.button>
      </div>

      {/* Time Options */}
      {selectedMode === 'time' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2"
        >
          {timeOptions.map((time) => (
            <motion.button
              key={time}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTimeChange(time)}
              disabled={isGameActive}
              className={`
                px-3 py-1 rounded-md text-sm font-medium transition-all
                ${selectedTime === time
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
                ${isGameActive ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {time}s
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}