/**
 * Custom hook for typing game logic
 * Centralizes all game state and logic in one reusable hook
 */

import { useState, useCallback, useEffect } from 'react';
import { GameState, GameStats, Snippet } from '@/types/game.types';
import { 
  calculateWPM, 
  calculateCPM, 
  calculateAccuracy,
  countErrors,
  isTestComplete,
  getCharacterStatuses
} from '@/lib/utils';

export function useTypingGame(snippet: Snippet) {
  // Game state
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    isActive: false,
    isComplete: false,
    startTime: null,
    endTime: null,
  });
  
  // Cursor position for display
  const [cursorPosition, setCursorPosition] = useState(0);
  
  // Calculate elapsed time
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.isActive && gameState.startTime !== null) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - gameState.startTime!);
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [gameState.isActive, gameState.startTime]);
  
  // Calculate stats
  const stats: GameStats = {
    wpm: calculateWPM(userInput.length, elapsedTime),
    cpm: calculateCPM(userInput.length, elapsedTime),
    accuracy: calculateAccuracy(userInput.length, countErrors(snippet.code, userInput)),
    errors: countErrors(snippet.code, userInput),
    time: Math.floor(elapsedTime / 1000),
  };
  
  // Character statuses for display
  const characterStatuses = getCharacterStatuses(snippet.code, userInput);
  
  // Handle typing
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Ignore special keys
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    
    // Start game on first keypress
    if (!gameState.isActive && e.key.length === 1) {
      setGameState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
      }));
    }
    
    // Handle backspace
    if (e.key === 'Backspace') {
      setUserInput(prev => prev.slice(0, -1));
      setCursorPosition(prev => Math.max(0, prev - 1));
      return;
    }
    
    // Handle character input
    if (e.key.length === 1 && gameState.isActive && !gameState.isComplete) {
      const newInput = userInput + e.key;
      setUserInput(newInput);
      setCursorPosition(newInput.length);
      
      // Check if test is complete
      if (isTestComplete(snippet.code, newInput)) {
        setGameState(prev => ({
          ...prev,
          isActive: false,
          isComplete: true,
          endTime: Date.now(),
        }));
      }
    }
  }, [userInput, gameState, snippet.code]);
  
  // Add keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
  
  // Reset game
  const resetGame = useCallback(() => {
    setUserInput('');
    setCursorPosition(0);
    setElapsedTime(0);
    setGameState({
      isActive: false,
      isComplete: false,
      startTime: null,
      endTime: null,
    });
  }, []);
  
  return {
    userInput,
    gameState,
    stats,
    characterStatuses,
    cursorPosition,
    resetGame,
  };
}