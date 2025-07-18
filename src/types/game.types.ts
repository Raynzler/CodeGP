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
}

export interface GameState {
  isActive: boolean;
  isComplete: boolean;
  startTime: number | null;
  endTime: number | null;
}

export interface Snippet {
  id: string;
  code: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CharacterStatus {
  char: string;
  status: 'correct' | 'incorrect' | 'untyped';
  index: number;
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
}

export interface GameState {
  isActive: boolean;
  isComplete: boolean;
  startTime: number | null;
  endTime: number | null;
}

export interface Snippet {
  id: string;
  code: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CharacterStatus {
  char: string;
  status: 'correct' | 'incorrect' | 'untyped';
  index: number;
}