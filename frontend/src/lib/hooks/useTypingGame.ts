
import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, GameStats, Snippet, CharacterStatus } from '@/types/game.types';
import { 
  calculateWPM, 
  calculateCPM, 
  calculateAccuracy,
  isTestComplete
} from '@/lib/utils';


export function useTypingGame(snippet: Snippet) {
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    isActive: false,
    isComplete: false,
    startTime: null,
    endTime: null,
    currentIndex: 0,
  });
  
  // Track user input as string for simplicity
  const [userInput, setUserInput] = useState('');
  
  // Mobile detection and input ref
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0);

  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [pauseStartTime, setPauseStartTime] = useState<number | null>(null);
  
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);
  
  // Calculate elapsed time
  useEffect(() => {
  let interval: NodeJS.Timeout;
  
  if (gameState.isActive && gameState.startTime !== null && !isPaused) {
    interval = setInterval(() => {
      const totalElapsed = Date.now() - gameState.startTime! - pausedTime;
      setElapsedTime(totalElapsed);
    }, 100);
  }
  
  return () => clearInterval(interval);
}, [gameState.isActive, gameState.startTime, isPaused, pausedTime]);
  
  // Generate character statuses based on user input
  const characterStatuses: CharacterStatus[] = snippet.code.split('').map((char, index) => {
  if (index < userInput.length) {
    const isCorrect = userInput[index] === char;
    // Only log the first few characters and any mismatches
    if (index < 3 || !isCorrect) {
      console.log(`Index ${index}: Expected "${char}" (${char.charCodeAt(0)}), Got "${userInput[index]}" (${userInput[index]?.charCodeAt(0)}) = ${isCorrect}`);
    }
    
    return {
      char,
      status: isCorrect ? 'correct' : 'incorrect',
      index,
    };
  }
  return {
    char,
    status: 'untyped',
    index,
  };
});
  
  // Calculate errors
  const errors = characterStatuses.filter(c => c.status === 'incorrect').length;
  
  // Calculate stats
  const stats: GameStats = {
    wpm: calculateWPM(userInput.length, elapsedTime),
    cpm: calculateCPM(userInput.length, elapsedTime),
    accuracy: calculateAccuracy(userInput.length, errors),
    errors,
    time: Math.floor(elapsedTime / 1000),
    totalChars: userInput.length,
  };
  
  // Start game
  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isActive: true,
      startTime: Date.now(),
    }));
  }, []);
  
  // End game
  const endGame = useCallback(() => {
    if (gameState.isActive) {
      setGameState(prev => ({
        ...prev,
        isActive: false,
        isComplete: true,
        endTime: Date.now(),
      }));
      
      if (isMobile && mobileInputRef.current) {
        mobileInputRef.current.blur();
      }
    }
  }, [gameState.isActive, isMobile]);


  const togglePause = useCallback(() => {
  if (!gameState.isActive || gameState.isComplete) return;
  
  if (!isPaused) {
    setIsPaused(true);
    setPauseStartTime(Date.now());
  } else {
    if (pauseStartTime) {
      setPausedTime(prev => prev + (Date.now() - pauseStartTime));
    }
    setIsPaused(false);
    setPauseStartTime(null);
  }
}, [gameState.isActive, gameState.isComplete, isPaused, pauseStartTime]);

  // Helper function to find previous word boundary
  const findPrevWordBoundary = useCallback((text: string, pos: number): number => {
    let newPos = pos;
    // Skip current whitespace backwards
    while (newPos > 0 && /\s/.test(text[newPos - 1])) {
      newPos--;
    }
    // Skip word characters backwards
    while (newPos > 0 && !/\s/.test(text[newPos - 1])) {
      newPos--;
    }
    return newPos;
  }, []);

  // Helper function to find next word boundary
  const findNextWordBoundary = useCallback((text: string, pos: number): number => {
    let newPos = pos;
    // Skip current word forwards
    while (newPos < text.length && !/\s/.test(text[newPos])) {
      newPos++;
    }
    // Skip whitespace forwards
    while (newPos < text.length && /\s/.test(text[newPos])) {
      newPos++;
    }
    return newPos;
  }, []);

  // Handle keyboard input with all shortcuts
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
  if (isMobile) return;
  if (isPaused) return;
  if (document.querySelector('[data-auth-modal="true"]')) {
    return;
  }
  
  // Prevent space from scrolling the page
  if (e.key === ' ') {
    e.preventDefault();
  }
  
  // Check if we need to start the game AND type the character
  const shouldStartGame = !gameState.isActive && !gameState.isComplete && 
                         e.key.length === 1 && !e.ctrlKey && !e.metaKey;
  
  if (shouldStartGame) {
    startGame();
    // Don't return here! Continue to process the character
  } else if (!gameState.isActive || gameState.isComplete) {
    // Only return if game isn't starting
    return;
  }
  
  // Handle Ctrl/Cmd + Backspace (delete word)
  if (e.key === 'Backspace' && (e.ctrlKey || e.metaKey || e.shiftKey)) {
    e.preventDefault();
    const newPos = findPrevWordBoundary(userInput, userInput.length);
    setUserInput(userInput.slice(0, newPos));
    return;
  }
  
  // Handle Ctrl/Cmd + Arrow Keys (move by single character)
  if (e.key === 'ArrowLeft' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    if (userInput.length > 0) {
      setUserInput(prev => prev.slice(0, -1));
    }
    return;
  }

  // Ignore forward movement keys
  if (['ArrowRight', 'End', 'Delete'].includes(e.key)) {
    e.preventDefault();
    return;
  }
  
  // Handle Home key
  if (e.key === 'Home' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    setUserInput('');
    return;
  } else if (e.key === 'Home') {
    e.preventDefault();
    let lineStart = userInput.lastIndexOf('\n');
    if (lineStart === -1) lineStart = 0;
    else lineStart += 1;
    setUserInput(userInput.slice(0, lineStart));
    return;
  }
  
  // Prevent default for special keys
  if (['Backspace', 'Tab', 'Enter', 'Delete'].includes(e.key)) {
    e.preventDefault();
  }
  
  // Handle regular typing
  if (e.key === 'Backspace') {
    if (userInput.length > 0) {
      setUserInput(prev => prev.slice(0, -1));
    }
  } else if (e.key === 'Tab') {
    const nextChar = snippet.code[userInput.length];
    if (nextChar === '\t') {
      setUserInput(prev => prev + '\t');
    } else {
      let spaces = 0;
      for (let i = 0; i < 4 && userInput.length + i < snippet.code.length; i++) {
        if (snippet.code[userInput.length + i] === ' ') {
          spaces++;
        } else {
          break;
        }
      }
      if (spaces >= 2) {
        setUserInput(prev => prev + ' '.repeat(spaces));
      }
    }
  } else if (e.key === 'Enter') {
    const nextChar = snippet.code[userInput.length];
    if (nextChar === '\n') {
      setUserInput(prev => prev + '\n');
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    // Regular character - this includes the first '/'
    if (userInput.length < snippet.code.length) {
      setUserInput(prev => prev + e.key);
    }
  }
  
  // Check if complete
  if (userInput.length === snippet.code.length - 1) {
    setTimeout(endGame, 100);
  }
}, [userInput, snippet.code, gameState, isMobile, startGame, endGame, findPrevWordBoundary]);
  
  // Mobile input handler
  const handleMobileInput = useCallback((value: string) => {
    if (!gameState.isActive && value.length > 0) {
      startGame();
    }
    
    if (gameState.isComplete) return;
    
    setUserInput(value);
    
    // Check if complete
    if (value.length === snippet.code.length) {
      endGame();
    }
  }, [gameState, snippet.code, startGame, endGame]);
  
  // Add keyboard listener
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
    setGameState({
      isActive: false,
      isComplete: false,
      startTime: null,
      endTime: null,
      currentIndex: 0,
    });
    setElapsedTime(0);
    setIsPaused(false);
    setPausedTime(0);
    setPauseStartTime(null);

    
    if (mobileInputRef.current) {
      mobileInputRef.current.value = '';
    }
  }, []);
  
  return {
    userInput,
    gameState,
    stats,
    characterStatuses,
    cursorPosition: userInput.length,
    resetGame,
    endGame,
    isMobile,
    mobileInputRef,
    handleMobileInput,
    focusMobileInput,
    isPaused,
    togglePause,
  };
}