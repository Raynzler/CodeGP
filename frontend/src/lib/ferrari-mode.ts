// src/lib/ferrari-mode.ts
export function activateFerrariMode(
  setText: (text: string) => void,
  originalText: string
) {
  // Randomly mess up the strategy
  const mistakes = [
    () => setText(originalText.replace(/function/g, 'funzione')),
    () => setText(originalText.replace(/\./g, ',')),
    () => setText(originalText.replace(/;/g, '；')), // Sneaky full-width semicolon
    () => setText("// Copy!We are checking..."),
  ];
  
  const randomMistake = mistakes[Math.floor(Math.random() * mistakes.length)];
  randomMistake();
  
  // Show message
  return "Ferrari Master🅱️lan activated! Good luck! 🤌";
}