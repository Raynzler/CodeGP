'use client';

import { motion } from 'framer-motion';
import { CharacterStatus } from '@/types/game.types';
import { GAME_CONFIG } from '@/lib/constants';

interface CodeDisplayProps {
  characterStatuses: CharacterStatus[];
  cursorPosition: number;
  isActive: boolean;
}

/**
 * Displays the code snippet with real-time typing feedback
 * Uses Framer Motion for smooth cursor animations
 */
export default function CodeDisplay({ 
  characterStatuses, 
  cursorPosition,
  isActive 
}: CodeDisplayProps) {
  return (
    <div className="relative bg-gray-900 p-6 rounded-lg font-mono text-lg leading-relaxed overflow-auto">
      <pre className="whitespace-pre-wrap">
        {characterStatuses.map((charStatus, index) => (
          <span key={index} className="relative">
            <span
              className={`
                ${charStatus.status === 'correct' ? 'text-green-400' : ''}
                ${charStatus.status === 'incorrect' ? 'bg-red-900/50 text-red-400' : ''}
                ${charStatus.status === 'untyped' ? 'text-gray-500' : ''}
              `}
            >
              {charStatus.char}
            </span>
            
            {/* Animated cursor */}
            {index === cursorPosition && isActive && (
              <motion.span
                className="absolute -left-[2px] top-0 bottom-0 w-[3px] bg-yellow-400"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: GAME_CONFIG.CURSOR_BLINK_SPEED / 1000,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            )}
          </span>
        ))}
      </pre>
    </div>
  );
}