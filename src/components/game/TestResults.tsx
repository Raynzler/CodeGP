'use client';

import { motion } from 'framer-motion';
import { formatTime } from '@/lib/utils';

interface TestResultsProps {
  stats: any;
  onNewTest: () => void;
  onClose: () => void;
}

export default function TestResults({ stats, onNewTest, onClose }: TestResultsProps) {
  const completionPercentage = Math.round((stats.completedText / stats.totalText) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-8"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Test Complete! 🎉</h2>
          <p className="text-gray-400">
            {stats.mode === 'time' 
              ? `${stats.timeLimit} second test` 
              : 'Code completion test'}
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-4 text-center"
          >
            <p className="text-sm text-gray-400 mb-1">WPM</p>
            <p className="text-3xl font-bold text-blue-400">{stats.wpm}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-4 text-center"
          >
            <p className="text-sm text-gray-400 mb-1">CPM</p>
            <p className="text-3xl font-bold text-purple-400">{stats.cpm}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-4 text-center"
          >
            <p className="text-sm text-gray-400 mb-1">Accuracy</p>
            <p className="text-3xl font-bold text-green-400">{stats.accuracy}%</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 rounded-lg p-4 text-center"
          >
            <p className="text-sm text-gray-400 mb-1">Time</p>
            <p className="text-3xl font-bold text-gray-300">{formatTime(stats.time)}</p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        {stats.mode === 'time' && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-sm text-gray-400 mb-2">Code Completion</p>
            <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
              />
            </div>
            <p className="text-right text-sm text-gray-400 mt-1">
              {completionPercentage}% completed
            </p>
          </motion.div>
        )}

        {/* Detailed Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800 rounded-lg p-4 mb-8"
        >
          <h3 className="text-lg font-semibold mb-3">Detailed Statistics</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Characters</span>
              <span>{stats.completedText}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Errors</span>
              <span className="text-red-400">{stats.errors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Error Rate</span>
              <span>{stats.completedText > 0 ? ((stats.errors / stats.completedText) * 100).toFixed(1) : 0}%</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewTest}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            New Test
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onClose();
              onNewTest(); // Also reset the test when going back
            }}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Back to Test
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}