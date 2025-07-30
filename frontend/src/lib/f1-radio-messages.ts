// src/lib/f1-radio-messages.ts
export const radioMessages = {
  start: ["It's lights out and away we go!", "Box box box... wait, wrong message!", "Bono, my code is gone!"],
  goodSpeed: ["Purple sector!", "That's some serious pace!", "You are currently P1"],
  mistake: ["I am stupid", "Mein gott muss das sein!", "Box box, box box"],
  complete: ["GRAZZIE RAGAZZI!", "Simply lovely!", "Get in there Lewis!"],
  slow: ["We are checking...", "Slow button on", "Ferrari moment"],
};

export function getRandomMessage(type: keyof typeof radioMessages): string {
  const messages = radioMessages[type];
  return messages[Math.floor(Math.random() * messages.length)];
}