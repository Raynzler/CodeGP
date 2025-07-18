/**
 * Utility functions for the typing game
 * Combines all calculation and formatting utilities
 */

import { GAME_CONFIG } from './constants';
import { CharacterStatus } from '@/types/game.types';

// ===== CALCULATIONS =====

/**
 * Calculate Words Per Minute
 * Formula: (total characters typed / 5) / minutes elapsed
 * We use 5 characters as the standard "word" length
 */
export function calculateWPM(
  charactersTyped: number,
  timeElapsedMs: number
): number {
  if (timeElapsedMs === 0) return 0;
  
  const minutes = timeElapsedMs / 60000;
  const words = charactersTyped / GAME_CONFIG.CHARACTERS_PER_WORD;
  
  return Math.round(words / minutes);
}

/**
 * Calculate Characters Per Minute
 * More accurate for code typing than WPM
 */
export function calculateCPM(
  charactersTyped: number,
  timeElapsedMs: number
): number {
  if (timeElapsedMs === 0) return 0;
  
  const minutes = timeElapsedMs / 60000;
  return Math.round(charactersTyped / minutes);
}

/**
 * Calculate typing accuracy
 * Formula: (correct characters / total characters) * 100
 */
export function calculateAccuracy(
  totalCharacters: number,
  errors: number
): number {
  if (totalCharacters === 0) return 100;
  
  const correct = totalCharacters - errors;
  return Math.round((correct / totalCharacters) * 100);
}

/**
 * Format time in MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===== FORMATTING =====

/**
 * Compare user input with snippet and generate character statuses
 */
export function getCharacterStatuses(
  snippet: string,
  userInput: string
): CharacterStatus[] {
  return snippet.split('').map((char, index) => {
    let status: CharacterStatus['status'] = 'untyped';
    
    if (index < userInput.length) {
      status = userInput[index] === char ? 'correct' : 'incorrect';
    }
    
    return {
      char,
      status,
      index,
    };
  });
}

/**
 * Count total errors in user input
 */
export function countErrors(
  snippet: string,
  userInput: string
): number {
  let errors = 0;
  
  for (let i = 0; i < userInput.length; i++) {
    if (snippet[i] !== userInput[i]) {
      errors++;
    }
  }
  
  return errors;
}

/**
 * Check if the test is complete
 */
export function isTestComplete(
  snippet: string,
  userInput: string
): boolean {
  return userInput.length >= snippet.length;
}