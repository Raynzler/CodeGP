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
    {
      id: 'js-3',
      code: `class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
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
    {
      id: 'ts-2',
      code: `type State<T> = {
  loading: boolean;
  data?: T;
  error?: string;
}

function useAsync<T>(fn: () => Promise<T>): State<T> {
  const [state, setState] = useState<State<T>>({ loading: true });
  return state;
}`,
      language: 'typescript',
      difficulty: 'hard',
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
    {
      id: 'py-2',
      code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    if not root:
        return []
    return inorder_traversal(root.left) + [root.val] + inorder_traversal(root.right)`,
      language: 'python',
      difficulty: 'medium',
    },
  ],
  
  java: [
    {
      id: 'java-1',
      code: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
      language: 'java',
      difficulty: 'medium',
    },
    {
      id: 'java-2',
      code: `public interface Repository<T> {
    T findById(Long id);
    List<T> findAll();
    void save(T entity);
    void delete(T entity);
}`,
      language: 'java',
      difficulty: 'easy',
    },
  ],
  
  cpp: [
    {
      id: 'cpp-1',
      code: `#include <vector>
#include <algorithm>

template<typename T>
T findMax(const std::vector<T>& vec) {
    if (vec.empty()) {
        throw std::runtime_error("Empty vector");
    }
    return *std::max_element(vec.begin(), vec.end());
}`,
      language: 'cpp',
      difficulty: 'medium',
    },
    {
      id: 'cpp-2',
      code: `class Stack {
private:
    int* arr;
    int top;
    int capacity;
public:
    Stack(int size) {
        arr = new int[size];
        capacity = size;
        top = -1;
    }
    void push(int x) {
        if (top == capacity - 1) return;
        arr[++top] = x;
    }
};`,
      language: 'cpp',
      difficulty: 'medium',
    },
  ],
  
  go: [
    {
      id: 'go-1',
      code: `func mergeSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    mid := len(arr) / 2
    left := mergeSort(arr[:mid])
    right := mergeSort(arr[mid:])
    return merge(left, right)
}`,
      language: 'go',
      difficulty: 'medium',
    },
    {
      id: 'go-2',
      code: `type Server struct {
    addr string
    handler http.Handler
}

func (s *Server) Start() error {
    fmt.Printf("Starting server on %s\n", s.addr)
    return http.ListenAndServe(s.addr, s.handler)
}`,
      language: 'go',
      difficulty: 'easy',
    },
  ],
  
  rust: [
    {
      id: 'rust-1',
      code: `fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}`,
      language: 'rust',
      difficulty: 'easy',
    },
    {
      id: 'rust-2',
      code: `impl<T> Vec<T> {
    pub fn new() -> Self {
        Vec {
            ptr: NonNull::dangling(),
            len: 0,
            cap: 0,
        }
    }
}`,
      language: 'rust',
      difficulty: 'hard',
    },
  ],
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
  
  const randomIndex = Math.floor(Math.random() * langSnippets.length);
  return langSnippets[randomIndex];
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