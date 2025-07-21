'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from '@/types/game.types';
import { getRandomSnippet } from '@/data/snippets';
import { useTypingGame } from '@/lib/hooks/useTypingGame';
import { formatTime } from '@/lib/utils';
import CodeDisplay from '@/components/game/CodeDisplay';
import TypingStats from '@/components/game/TypingStats';
import TestControls from '@/components/game/TestControls';
import LanguageDropdown from '@/components/ui/LanguageDropdown';
import TimerOptions from '@/components/game/TimerOptions';
import TestResults from '@/components/game/TestResults';

export default function Home() {
  const [language, setLanguage] = useState<Language>('javascript');
  const [snippet, setSnippet] = useState<any>(null);
  const [testMode, setTestMode] = useState<'time' | 'code'>('code');
  const [timeLimit, setTimeLimit] = useState<number>(30);
  const [showResults, setShowResults] = useState(false);
  const [finalStats, setFinalStats] = useState<any>(null);
  
  // Timer state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize snippet on client side only
  useEffect(() => {
    setSnippet(getRandomSnippet(language));
  }, []);
  
  const {
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
    userInput,
  } = useTypingGame(snippet || { id: '', code: '', language: 'javascript', difficulty: 'easy' });
  
  // Timer countdown effect
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Start timer if in time mode and game is active
    if (testMode === 'time' && gameState.isActive && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            // Time's up!
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [testMode, gameState.isActive, secondsRemaining]);
  
  // Initialize timer when game starts
  useEffect(() => {
    if (gameState.isActive && testMode === 'time' && !timerStarted) {
      setSecondsRemaining(timeLimit);
      setTimerStarted(true);
    }
  }, [gameState.isActive, testMode, timeLimit, timerStarted]);
  
  // Handle when timer reaches 0 (only if timer was started)
  useEffect(() => {
    if (testMode === 'time' && gameState.isActive && secondsRemaining === 0 && timerStarted) {
      // End the game
      endGame();
      
      // Show results
      setFinalStats({
        ...stats,
        mode: 'time',
        timeLimit,
        completedText: characterStatuses.filter(c => c.status !== 'untyped').length,
        totalText: characterStatuses.length,
      });
      setShowResults(true);
    }
  }, [secondsRemaining, testMode, gameState.isActive, timerStarted, endGame, stats, characterStatuses, timeLimit]);
  
  // Handle new test
  const handleNewTest = useCallback(() => {
    setSnippet(getRandomSnippet(language));
    resetGame();
    setSecondsRemaining(timeLimit); // Set to timeLimit for display
    setTimerStarted(false); // Reset timer flag
    setShowResults(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [language, resetGame, timeLimit]);
  
  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        handleNewTest();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleNewTest();
      }
    };
    
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [handleNewTest]);
  
  // Handle test completion (code mode)
  useEffect(() => {
    if (gameState.isComplete && testMode === 'code') {
      setFinalStats({
        ...stats,
        mode: 'code',
        completedText: characterStatuses.length,
        totalText: characterStatuses.length,
      });
      setShowResults(true);
    }
  }, [gameState.isComplete, testMode, stats, characterStatuses]);
  
  // Handle language change
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setSnippet(getRandomSnippet(newLanguage));
    resetGame();
    setSecondsRemaining(timeLimit);
    setTimerStarted(false);
    setShowResults(false);
  };
  
  // Handle test mode change
  const handleModeChange = (mode: 'time' | 'code') => {
    setTestMode(mode);
    resetGame();
    setSecondsRemaining(mode === 'time' ? timeLimit : 0);
    setTimerStarted(false);
    setShowResults(false);
  };
  
  // Handle time limit change
  const handleTimeChange = (time: number) => {
    setTimeLimit(time);
    setSecondsRemaining(time);
    setTimerStarted(false);
    resetGame();
  };
  
  // Initialize timer display when switching to time mode
  useEffect(() => {
    if (testMode === 'time' && !gameState.isActive && !timerStarted) {
      setSecondsRemaining(timeLimit);
    }
  }, [testMode, timeLimit, gameState.isActive, timerStarted]);
  
  // Don't render until snippet is loaded
  if (!snippet) {
    return <div className="min-h-screen bg-gray-950" />;
  }
  
  // Show results screen
  if (showResults && finalStats) {
    return (
      <TestResults
        stats={finalStats}
        onNewTest={handleNewTest}
        onClose={() => setShowResults(false)}
      />
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header with Language Selector */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
                SyntaxRacer
              </span>
            </h1>
            <p className="text-gray-400">Race through code at full throttle 🏎️</p>
          </div>
          
          <LanguageDropdown
            selected={language}
            onChange={handleLanguageChange}
            disabled={gameState.isActive}
          />
        </header>
        
        {/* Timer Options */}
        <TimerOptions
          selectedMode={testMode}
          selectedTime={testMode === 'time' ? timeLimit : null}
          onModeChange={handleModeChange}
          onTimeChange={handleTimeChange}
          isGameActive={gameState.isActive}
        />
        
        {/* Timer Display - Shows countdown in time mode */}
        {testMode === 'time' && (
          <div className="text-center mb-4">
            <div className={`text-3xl font-mono font-bold ${
              secondsRemaining <= 10 && secondsRemaining > 0 && gameState.isActive 
                ? 'text-red-400 animate-pulse' 
                : 'text-blue-400'
            }`}>
              {formatTime(secondsRemaining)}
            </div>
          </div>
        )}
        
        {/* Code Display */}
        <div className="mb-6">
          <CodeDisplay
            characterStatuses={characterStatuses}
            cursorPosition={cursorPosition}
            isActive={gameState.isActive}
          />
        </div>
        
        {/* Mobile Input Support */}
        {isMobile && (
          <>
            <input
              ref={mobileInputRef}
              type="text"
              className="sr-only absolute -left-9999px"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              value={userInput}
              onChange={(e) => handleMobileInput(e.target.value)}
              onBlur={() => {
                // Keep focus during test
                if (gameState.isActive && !gameState.isComplete) {
                  setTimeout(focusMobileInput, 100);
                }
              }}
            />
            
            {!gameState.isActive && (
              <div className="text-center mb-4">
                <button
                  onClick={focusMobileInput}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium"
                >
                  📱 Tap to Start Typing
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Stats */}
        <div className="mb-6">
          <TypingStats 
            stats={stats} 
            isVisible={gameState.isActive || gameState.isComplete} 
          />
        </div>
        
        {/* Controls */}
        <TestControls 
          onReset={handleNewTest} 
          isComplete={gameState.isComplete} 
        />
        
        {/* Instructions with keyboard shortcuts */}
        {!gameState.isActive && !gameState.isComplete && (
          <div className="text-center mt-8 text-gray-500">
            <p>Start typing to begin the test</p>
            {testMode === 'time' && (
              <p className="text-sm mt-2">
                Complete as much code as possible in {timeLimit} seconds
              </p>
            )}
            <div className="mt-4 text-xs space-y-1">
              <p>
                <kbd className="px-2 py-1 bg-gray-800 rounded">Shift + Enter</kbd> or{' '}
                <kbd className="px-2 py-1 bg-gray-800 rounded">Esc</kbd> to restart
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}