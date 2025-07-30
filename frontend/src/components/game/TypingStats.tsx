'use client';

import { motion } from 'framer-motion';
import { GameStats } from '@/types/game.types';

interface TypingStatsProps {
  stats: GameStats;
  isVisible: boolean;
}

/**
 * Format time in MM:SS format
 * Local implementation to avoid import issues
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Displays real-time typing statistics
 * Animates in when typing starts
 */
export default function TypingStats({ stats, isVisible }: TypingStatsProps) {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 p-4 rounded-lg"
    >
      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-400">WPM</p>
          <p className="text-2xl font-mono font-bold text-blue-400">
            {stats.wpm}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">CPM</p>
          <p className="text-2xl font-mono font-bold text-purple-400">
            {stats.cpm}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Accuracy</p>
          <p className="text-2xl font-mono font-bold text-green-400">
            {stats.accuracy}%
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Time</p>
          <p className="text-2xl font-mono font-bold text-gray-300">
            {formatTime(stats.time)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}