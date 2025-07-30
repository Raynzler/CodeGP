'use client';
import { motion } from 'framer-motion';
import { CharacterStatus } from '@/types/game.types';
import { GAME_CONFIG } from '@/lib/constants';

interface CodeDisplayProps {
  characterStatuses: CharacterStatus[];
  cursorPosition: number;
  isActive: boolean;
}

export default function CodeDisplay({ 
  characterStatuses, 
  cursorPosition,
  isActive 
}: CodeDisplayProps) {
  const totalLength = characterStatuses.length;
  const sectorSize = Math.floor(totalLength / 3);
  
  const getCurrentSector = (position: number) => {
    if (position < sectorSize) return 1;
    if (position < sectorSize * 2) return 2;
    return 3;
  };
  
  const currentSector = getCurrentSector(cursorPosition);
  
  const getSectorProgress = () => {
    const sectorStart = (currentSector - 1) * sectorSize;
    const positionInSector = cursorPosition - sectorStart;
    return Math.round((positionInSector / sectorSize) * 100);
  };
  
  return (
    <div className="relative">
      <div className="flex gap-1 mb-2">
        <div className={`flex-1 h-1 rounded ${currentSector >= 1 ? 'bg-purple-600' : 'bg-gray-700'}`} />
        <div className={`flex-1 h-1 rounded ${currentSector >= 2 ? 'bg-purple-600' : 'bg-gray-700'}`} />
        <div className={`flex-1 h-1 rounded ${currentSector >= 3 ? 'bg-purple-600' : 'bg-gray-700'}`} />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Sector {currentSector}/3</span>
        <span>{getSectorProgress()}% of sector</span>
      </div>
      
      <div className="relative bg-gray-900 p-6 rounded-lg font-mono text-lg leading-relaxed overflow-auto max-h-96">
  <pre className="whitespace-pre">
    {characterStatuses.map((charStatus, index) => (
      <span key={index} className="relative">
        <span
          className={`
            ${charStatus.status === 'correct' ? 'text-green-400' : ''}
            ${charStatus.status === 'incorrect' ? 'bg-red-900/50 text-red-400' : ''}
            ${charStatus.status === 'untyped' ? 'text-gray-500' : ''}
          `}
        >
          {/* Use a fragment to ensure it's treated as text */}
          {charStatus.char}
        </span>
        
        {/* Cursor */}
        {index === cursorPosition - 1 && isActive && charStatus.char !== '\n' && (
          <motion.span
            className="absolute -right-[2px] top-0 bottom-0 w-[3px] bg-yellow-400"
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: GAME_CONFIG.CURSOR_BLINK_SPEED / 1000,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        )}
        
        {/* Cursor after newline */}
        {index === cursorPosition && isActive && 
         index > 0 && characterStatuses[index - 1].char === '\n' && (
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
        
        {/* Cursor at position 0 */}
        {index === 0 && cursorPosition === 0 && isActive && (
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
    
    {/* Cursor at end of text */}
    {cursorPosition === characterStatuses.length && isActive && (
      <motion.span
        className="inline-block w-[3px] h-[1.2em] bg-yellow-400 align-text-bottom"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: GAME_CONFIG.CURSOR_BLINK_SPEED / 1000,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    )}
  </pre>
</div>
    </div>
  );
}