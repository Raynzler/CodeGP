'use client';

import { useState } from 'react';
import { Language } from '@/types/game.types';
import { getRandomSnippet } from '@/data/snippets';
import { useTypingGame } from '@/lib/hooks/useTypingGame';
import CodeDisplay from '@/components/game/CodeDisplay';
import TypingStats from '@/components/game/TypingStats';
import TestControls from '@/components/game/TestControls';
import LanguageSelector from '@/components/ui/LanguageSelector';

/**
 * Main typing test page
 * Orchestrates all components and game flow
 */
export default function Home() {
  const [language, setLanguage] = useState<Language>('javascript');
  const [snippet, setSnippet] = useState(() => getRandomSnippet(language));
  
  const {
    gameState,
    stats,
    characterStatuses,
    cursorPosition,
    resetGame,
  } = useTypingGame(snippet);
  
  // Handle language change
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setSnippet(getRandomSnippet(newLanguage));
    resetGame();
  };
  
  // Handle new test
  const handleNewTest = () => {
    setSnippet(getRandomSnippet(language));
    resetGame();
  };
  
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              CodeSpeed
            </span>
          </h1>
          <p className="text-gray-400">Test your coding speed and accuracy</p>
        </header>
        
        {/* Language Selector */}
        <div className="mb-6">
          <LanguageSelector 
            selected={language} 
            onChange={handleLanguageChange} 
          />
        </div>
        
        {/* Code Display */}
        <div className="mb-6">
          <CodeDisplay
            characterStatuses={characterStatuses}
            cursorPosition={cursorPosition}
            isActive={gameState.isActive}
          />
        </div>
        
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
        
        {/* Instructions */}
        {!gameState.isActive && !gameState.isComplete && (
          <div className="text-center mt-8 text-gray-500">
            <p>Start typing to begin the test</p>
          </div>
        )}
      </div>
    </div>
  );
}