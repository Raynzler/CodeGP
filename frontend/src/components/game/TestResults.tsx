'use client';
import { motion } from 'framer-motion';
import { formatTime } from '@/lib/utils';
import { getDriverRank, driverRankings } from '@/lib/f1-rankings';


interface TestResultsProps {
  stats: any;
  onNewTest: () => void;
  onClose: () => void;
}

export default function TestResults({ stats, onNewTest, onClose }: TestResultsProps) {
  const completionPercentage = Math.round((stats.completedText / stats.totalText) * 100);
  console.log('WPM:', stats.wpm);
  const driverRank = getDriverRank(stats.wpm); 
  
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
          <h2 className="text-4xl font-bold mb-2">Race Complete! 🏁</h2>
          <p className="text-gray-400">
            {stats.mode === 'time' 
              ? `${stats.timeLimit} second race` 
              : 'Code completion race'}
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

        {/* Driver Ranking Section - NEW! */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="text-center mb-8 p-6 bg-gray-800 rounded-lg"
        >
          <p className="text-sm text-gray-400 mb-2">Your Driver Ranking</p>
          <div className={`text-3xl font-bold ${driverRank.color}`}>
            {driverRank.emoji} {driverRank.title}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {driverRank.minWPM === 110 
              ? "You're a legend! 🏆" 
              : `Reach ${driverRankings[driverRankings.findIndex(r => r.name === driverRank.name) + 1]?.minWPM || 110} WPM for next rank`}
          </p>
        </motion.div>

        {/* Progress Bar */}
        {stats.mode === 'time' && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <p className="text-sm text-gray-400 mb-2">Track Completion</p>
            <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="bg-gradient-to-r from-red-500 to-yellow-400 h-full rounded-full"
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
          transition={{ delay: 0.9 }}
          className="bg-gray-800 rounded-lg p-4 mb-8"
        >
          <h3 className="text-lg font-semibold mb-3">Race Statistics</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Characters</span>
              <span>{stats.completedText}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mistakes</span>
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
    onClick={() => {
      onNewTest(); // This should trigger pit stop and new snippet
    }}
    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
  >
    🏁 New Race
  </motion.button>

          <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => {
      onClose(); // Just close the results modal
    }}
    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
  >
    Back to Track
  </motion.button>
</div>
      </motion.div>
    </motion.div>
  );
}