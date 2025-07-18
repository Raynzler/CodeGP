/**
 * Global constants used throughout the application
 * Centralizing these values makes them easy to modify
 */

export const GAME_CONFIG = {
  // Standard typing test duration in seconds
  DEFAULT_TIME_LIMIT: 60,
  
  // Characters per "word" for WPM calculation
  // Industry standard is 5 characters = 1 word
  CHARACTERS_PER_WORD: 5,
  
  // Minimum snippet length
  MIN_SNIPPET_LENGTH: 50,
  
  // Animation durations in ms
  CURSOR_BLINK_SPEED: 530,
  TRANSITION_DURATION: 150,
};

export const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'go',
  'rust',
] as const;