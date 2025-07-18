'use client';

import { motion } from 'framer-motion';

interface TestControlsProps {
  onReset: () => void;
  isComplete: boolean;
}

/**
 * Control buttons for the typing test
 */
export default function TestControls({ onReset, isComplete }: TestControlsProps) {
  return (
    <div className="flex justify-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isComplete ? 'Try Again' : 'Reset Test'}
      </motion.button>
    </div>
  );
}