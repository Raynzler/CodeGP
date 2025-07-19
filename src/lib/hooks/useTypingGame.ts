/**
 * Custom hook for typing game logic
 * Handles multi-line code input with proper cursor movement
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
  
  // End game function (exposed for timer)
  const endGame = useCallback(() => {
    if (gameState.isActive) {
      setGameState(prev => ({
        ...prev,
        isActive: false,
        isComplete: true,
        endTime: Date.now(),
      }));
    }
  }, [gameState.isActive]);
  
  // Handle typing
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Handle Tab + Enter for restart
    if (e.key === 'Tab') {
      e.preventDefault();
      return;
    }
    
    // Prevent default for space, enter, and backspace to avoid scrolling
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Backspace') {
      e.preventDefault();
    }
    
    // Ignore special keys except the ones we handle
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    
    // Don't process if test is complete
    if (gameState.isComplete) return;
    
    // Handle backspace
    if (e.key === 'Backspace') {
      if (userInput.length > 0) {
        setUserInput(prev => prev.slice(0, -1));
        setCursorPosition(Math.max(0, userInput.length - 1));
      }
      return;
    }
    
    // Handle character input (including space and enter)
    if (e.key.length === 1 || e.key === 'Enter') {
      // Start game on first keypress if not active
      if (!gameState.isActive) {
        setGameState(prev => ({
          ...prev,
          isActive: true,
          startTime: Date.now(),
        }));
      }
      
      // Check what character we should be typing
      const expectedChar = snippet.code[userInput.length];
      
      // Handle Enter key
      if (e.key === 'Enter') {
        // Only add newline if the expected character is a newline
        if (expectedChar === '\n') {
          const newInput = userInput + '\n';
          setUserInput(newInput);
          setCursorPosition(newInput.length);
          
          // Check if test is complete
          if (isTestComplete(snippet.code, newInput)) {
            endGame();
          }
        }
        // If Enter is pressed but we're not expecting a newline, do nothing
        return;
      }
      
      // Handle regular characters (including space)
      if (userInput.length < snippet.code.length) {
        const newInput = userInput + e.key;
        setUserInput(newInput);
        setCursorPosition(newInput.length);
        
        // Check if test is complete
        if (isTestComplete(snippet.code, newInput)) {
          endGame();
        }
      }
    }
  }, [userInput, gameState, snippet.code, endGame]);
  
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
    endGame, // Export endGame function
  };
}