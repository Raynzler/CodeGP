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
import { getRandomMessage, radioMessages } from '@/lib/f1-radio-messages';
import RadioMessage from '@/components/ui/RadioMessage';
import KeyboardShortcuts from '@/components/ui/KeyboardShortcuts';
import PitStopAnimation from '@/components/game/PitStopAnimation';
import LandingAnimation from '@/components/game/LandingAnimation';
import DRSIndicator from '@/components/game/DRSIndicator';

export default function Home() {
  const [language, setLanguage] = useState<Language>('javascript');
  const [snippet, setSnippet] = useState<any>(null);
  const [testMode, setTestMode] = useState<'time' | 'code'>('code');
  const [timeLimit, setTimeLimit] = useState<number>(30);
  const [showResults, setShowResults] = useState(false);
  const [finalStats, setFinalStats] = useState<any>(null);
  const [radioMessage, setRadioMessage] = useState<string | null>(null);
  const [showRadio, setShowRadio] = useState(false);
  const [lastErrorCount, setLastErrorCount] = useState(0);
  const [showPitStop, setShowPitStop] = useState(false);
  const [drsEnabled, setDrsEnabled] = useState(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  


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
  
  // Show radio message helper
  const showRadioMessage = useCallback((type: keyof typeof radioMessages) => {
    const message = getRandomMessage(type);
    setRadioMessage(message);
    setShowRadio(true);
    setTimeout(() => setShowRadio(false), 3000);
  }, []);
  
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
  
  // Radio messages based on game events
  useEffect(() => {
  if (gameState.isActive && !gameState.isComplete) {
    const typedChars = characterStatuses.filter(c => c.status !== 'untyped').length;
      
      // Show start message when typing begins
      if (typedChars === 4) {
        showRadioMessage('start');
      }
      
      // Show speed message at certain WPM thresholds
      if (stats.wpm > 80 && typedChars % 50 === 0 && typedChars > 0) {
      showRadioMessage('goodSpeed');
    }
      
      // Show mistake message on new errors
       if (stats.errors > lastErrorCount && stats.errors % 3 === 0 && typedChars > 10) {
      showRadioMessage('mistake');
      setLastErrorCount(stats.errors);
    }
  }
    
    if (gameState.isComplete) {
    showRadioMessage('complete');
  }
}, [stats.wpm, stats.errors, gameState.isActive, gameState.isComplete, characterStatuses, showRadioMessage, lastErrorCount]);


// ADD DRS EFFECT HERE - After radio messages, before timer
useEffect(() => {
  // Check for DRS activation
  if (gameState.isActive) {
    // Count consecutive correct characters
    let consecutive = 0;
    for (let i = characterStatuses.length - 1; i >= 0; i--) {
      if (characterStatuses[i].status === 'correct') {
        consecutive++;
      } else if (characterStatuses[i].status === 'incorrect') {
        break;
      }
    }
    setConsecutiveCorrect(consecutive);
    
    // Enable DRS if accuracy > 95% and typed at least 20 chars
    const shouldEnableDRS = stats.accuracy >= 95 &&
                           stats.totalChars >= 20 &&
                           consecutive >= 10;
    
    if (shouldEnableDRS && !drsEnabled) {
      setDrsEnabled(true);
      showRadioMessage('goodSpeed');
    } else if (!shouldEnableDRS && drsEnabled) {
      setDrsEnabled(false);
    }
  } else {
    setDrsEnabled(false);
    setConsecutiveCorrect(0);
  }
}, [stats.accuracy, stats.totalChars, characterStatuses, gameState.isActive, drsEnabled, showRadioMessage]);

  
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
  // Close results first if showing
  if (showResults) {
    setShowResults(false);
  }
  


  // Then show pit stop if we had typed something
  setTimeout(() => {
    if (stats.totalChars > 0) {
      setShowPitStop(true);
    } else {
      // Direct reset if no typing happened
      setSnippet(getRandomSnippet(language));
      resetGame();
      setSecondsRemaining(timeLimit);
      setTimerStarted(false);
      setLastErrorCount(0);
      setDrsEnabled(false);
      setConsecutiveCorrect(0);
    }
  }, 100);
}, [stats.totalChars, language, resetGame, timeLimit]);

  // Pit stop complete handler:
const handlePitStopComplete = useCallback(() => {
  setShowPitStop(false);
  setSnippet(getRandomSnippet(language));
  resetGame();
  setSecondsRemaining(timeLimit);
  setTimerStarted(false);
  setShowResults(false);
  setLastErrorCount(0);
  setDrsEnabled(false); // Reset DRS
  setConsecutiveCorrect(0); // Reset consecutive
  if (timerRef.current) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }
}, [language, resetGame, timeLimit]);


const handleCloseResults = useCallback(() => {
  setShowResults(false);
  setFinalStats(null);
  // Don't reset game here - let user continue or start fresh
}, []);
  
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
    
    // Reset these states when showing results
    setDrsEnabled(false);
    setConsecutiveCorrect(0);
  }
}, [gameState.isComplete, testMode, stats, characterStatuses]);

// Add pause handler:
const togglePause = useCallback(() => {
  if (gameState.isActive && !gameState.isComplete) {
    setIsPaused(!isPaused);
  }
}, [gameState.isActive, gameState.isComplete, isPaused]);


// Update timer effect to respect pause:
useEffect(() => {
  let interval: NodeJS.Timeout;
  
  if (gameState.isActive && gameState.startTime !== null && !isPaused) {
    interval = setInterval(() => {
      setElapsedTime(Date.now() - gameState.startTime!);
    }, 100);
  }
  
  return () => clearInterval(interval);
}, [gameState.isActive, gameState.startTime, isPaused]);
  
  // Handle language change
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setSnippet(getRandomSnippet(newLanguage));
    resetGame();
    setSecondsRemaining(timeLimit);
    setTimerStarted(false);
    setShowResults(false);
    setLastErrorCount(0);
  };
  
  // Handle test mode change
  const handleModeChange = (mode: 'time' | 'code') => {
    setTestMode(mode);
    resetGame();
    setSecondsRemaining(mode === 'time' ? timeLimit : 0);
    setTimerStarted(false);
    setShowResults(false);
    setLastErrorCount(0);
  };
  
  // Handle time limit change
  const handleTimeChange = (time: number) => {
    setTimeLimit(time);
    setSecondsRemaining(time);
    setTimerStarted(false);
    resetGame();
  };


  // Add retry handler:
const handleRetry = useCallback(() => {
  // Keep same snippet, just reset progress
  resetGame();
  setSecondsRemaining(timeLimit);
  setTimerStarted(false);
  setShowResults(false);
  setLastErrorCount(0);
  setDrsEnabled(false);
  setConsecutiveCorrect(0);
  setIsPaused(false);
}, [resetGame, timeLimit]);
  
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
    <>
      <LandingAnimation />
      <PitStopAnimation 
        isVisible={showPitStop} 
        onComplete={handlePitStopComplete} 
      />
      <TestResults
        stats={finalStats}
        onNewTest={handleNewTest}
        onClose={handleCloseResults}  // CHANGED: Using handleCloseResults instead of inline function
      />
    </>
  );
}
  
  return (
  <>
    <LandingAnimation />
    <PitStopAnimation 
      isVisible={showPitStop} 
      onComplete={handlePitStopComplete} 
    />
    
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
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  🏁 Tap to Start Race
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


  
{testMode === 'code' && gameState.isActive && (
  <button
    onClick={togglePause}
    className="ml-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
  >
    {isPaused ? '▶️ Resume' : '⏸️ Pause'}
  </button>
)}
        
        {/* Controls */}
        <TestControls 
  onReset={handleRetry} 
  onNewTrack={handleNewTest}
  isComplete={gameState.isComplete} 
/>
        
        {/* Instructions with keyboard shortcuts */}
        {!gameState.isActive && !gameState.isComplete && (
          <div className="text-center mt-8 text-gray-500">
            <p>🏁 Start typing to begin the race</p>
            {testMode === 'time' && (
              <p className="text-sm mt-2">
                Complete as many laps as possible in {timeLimit} seconds
              </p>
            )}
            <div className="mt-4 text-xs space-y-1">
              <p>
                <kbd className="px-2 py-1 bg-gray-800 rounded">Shift + Enter</kbd> or{' '}
                <kbd className="px-2 py-1 bg-gray-800 rounded">Esc</kbd> for pit stop
              </p>
            </div>
          </div>
        )}
      </div>
      <RadioMessage message={radioMessage} isVisible={showRadio} />
      <DRSIndicator isEnabled={drsEnabled} accuracy={stats.accuracy} />
      <KeyboardShortcuts />
    </div>
  </>
);
}