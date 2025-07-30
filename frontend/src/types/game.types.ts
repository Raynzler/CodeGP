/**
 * Type definitions for the typing game
 * These types ensure type safety across the application
 */

export interface GameStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  time: number;
  totalChars: number;
}

export interface GameState {
  isActive: boolean;
  isComplete: boolean;
  startTime: number | null;
  endTime: number | null;
  currentIndex: number;
}

export interface Snippet {
  id: string;
  code: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CharacterStatus {
  char: string;
  status: 'untyped' | 'correct' | 'incorrect';
}

/**
 * Type definitions for the typing game
 * These types ensure type safety across the application
 */

// Export Language type from constants
export type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go' | 'rust';

export interface GameStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  time: number;
  totalChars: number;
}

export interface GameState {
  isActive: boolean;
  isComplete: boolean;
  startTime: number | null;
  endTime: number | null;
  currentIndex: number;
}

export interface Snippet {
  id: string;
  code: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CharacterStatus {
  char: string;
  status: 'untyped' | 'correct' | 'incorrect';
}