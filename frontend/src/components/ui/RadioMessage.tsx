'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface RadioMessageProps {
  message: string | null;
  isVisible: boolean;
}

export default function RadioMessage({ message, isVisible }: RadioMessageProps) {
  return (
    <AnimatePresence>
      {isVisible && message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-black/90 border border-gray-800 p-4 rounded-lg max-w-xs"
        >
          <p className="text-xs text-gray-400 mb-1">📻 Team Radio</p>
          <p className="text-sm text-white">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}