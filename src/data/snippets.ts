/**
 * Code snippets database
 * Organized by language with difficulty ratings
 */

import { Snippet, Language } from '@/types/game.types';

export const snippets: Record<Language, Snippet[]> = {
  javascript: [
    {
      id: 'js-1',
      code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      language: 'javascript',
      difficulty: 'easy',
    },
    {
      id: 'js-2',
      code: `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}`,
      language: 'javascript',
      difficulty: 'medium',
    },
  ],
  
  typescript: [
    {
      id: 'ts-1',
      code: `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`).then(res => res.json());
}`,
      language: 'typescript',
      difficulty: 'medium',
    },
  ],
  
  python: [
    {
      id: 'py-1',
      code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + [pivot] + quicksort(right)`,
      language: 'python',
      difficulty: 'medium',
    },
  ],
  
  java: [],
  cpp: [],
  go: [],
  rust: [],
};

/**
 * Get a random snippet for a given language
 */
export function getRandomSnippet(language: Language): Snippet {
  const langSnippets = snippets[language];
  
  if (!langSnippets || langSnippets.length === 0) {
    // Fallback to JavaScript if no snippets available
    return snippets.javascript[0];
  }
  
  return langSnippets[Math.floor(Math.random() * langSnippets.length)];
}

/**
 * Get snippet by ID
 */
export function getSnippetById(id: string): Snippet | undefined {
  for (const lang of Object.values(snippets)) {
    const snippet = lang.find(s => s.id === id);
    if (snippet) return snippet;
  }
  return undefined;
}