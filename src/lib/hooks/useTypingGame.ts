/**
 * Custom hook for typing game logic
 * Now with mobile support!
 */

import { useState, useCallback, useEffect, useRef } from 'react';
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
  
  // Mobile input ref
  const mobileInputRef = useRef<HTMLInputElement>(null);
  
  // Detect if mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);
  
  // Cursor position for display
  const [cursorPosition, setCursorPosition] = useState(0);
  
  // Calculate elapsed time
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Timer effect (same as before)
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
  
  // End game function
  const endGame = useCallback(() => {
    if (gameState.isActive) {
      setGameState(prev => ({
        ...prev,
        isActive: false,
        isComplete: true,
        endTime: Date.now(),
      }));
      
      // Blur mobile input to hide keyboard
      if (isMobile && mobileInputRef.current) {
        mobileInputRef.current.blur();
      }
    }
  }, [gameState.isActive, isMobile]);
  
  // Handle mobile input changes
  const handleMobileInput = useCallback((value: string) => {
    // Start game if not active
    if (!gameState.isActive && value.length > 0) {
      setGameState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
      }));
    }
    
    // Only allow typing if game is active and not complete
    if (gameState.isComplete) return;
    
    // Handle the input
    if (value.length <= snippet.code.length) {
      setUserInput(value);
      setCursorPosition(value.length);
      
      // Check if test is complete
      if (isTestComplete(snippet.code, value)) {
        endGame();
      }
    }
  }, [gameState, snippet.code, endGame]);
  
  // Handle typing (desktop)
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Skip if on mobile
    if (isMobile) return;
    
    // Rest of your existing handleKeyPress logic...
    // (keeping the same as before)
    
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Backspace') {
      e.preventDefault();
    }
    
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (gameState.isComplete) return;
    
    if (e.key === 'Backspace') {
      if (userInput.length > 0) {
        setUserInput(prev => prev.slice(0, -1));
        setCursorPosition(Math.max(0, userInput.length - 1));
      }
      return;
    }
    
    if (e.key.length === 1 || e.key === 'Enter') {
      if (!gameState.isActive) {
        setGameState(prev => ({
          ...prev,
          isActive: true,
          startTime: Date.now(),
        }));
      }
      
      const expectedChar = snippet.code[userInput.length];
      
      if (e.key === 'Enter') {
        if (expectedChar === '\n') {
          const newInput = userInput + '\n';
          setUserInput(newInput);
          setCursorPosition(newInput.length);
          
          if (isTestComplete(snippet.code, newInput)) {
            endGame();
          }
        }
        return;
      }
      
      if (userInput.length < snippet.code.length) {
        const newInput = userInput + e.key;
        setUserInput(newInput);
        setCursorPosition(newInput.length);
        
        if (isTestComplete(snippet.code, newInput)) {
          endGame();
        }
      }
    }
  }, [userInput, gameState, snippet.code, endGame, isMobile]);
  
  // Add keyboard listener (desktop only)
  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [handleKeyPress, isMobile]);
  
  // Focus mobile input
  const focusMobileInput = useCallback(() => {
    if (mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, []);
  
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
    
    // Clear mobile input
    if (mobileInputRef.current) {
      mobileInputRef.current.value = '';
    }
  }, []);
  
  return {
    userInput,
    gameState,
    stats,
    characterStatuses,
    cursorPosition,
    resetGame,
    endGame,
    isMobile,
    mobileInputRef,
    handleMobileInput,
    focusMobileInput,
  };
}