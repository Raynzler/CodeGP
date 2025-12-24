package main

import (
    "encoding/json"
    "log"
    "math/rand"
    "net/http"
    "time"
)

type CodeSnippet struct {
    ID         string `json:"id"`
    Code       string `json:"code"`
    Language   string `json:"language"`
    Difficulty string `json:"difficulty"`
}

type RaceResults struct {
    WPM        int     `json:"wpm"`
    CPM        int     `json:"cpm"`
    Accuracy   float64 `json:"accuracy"`  // Fixed: Capital A
    Duration   int     `json:"duration"`   // Fixed: Just int, not time.Duration
    Language   string  `json:"language"`
    Difficulty string  `json:"difficulty"`
}

// CORS middleware function
func enableCORS(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        
        // Handle preflight requests
        if r.Method == "OPTIONS" {
           w.WriteHeader(http.StatusOK)
            return
        }
        
        next(w, r)
    }
}

func main() {
    rand.Seed(time.Now().UnixNano())
    
    // Apply CORS to all handlers
    http.HandleFunc("/api/health", enableCORS(healthHandler))
    http.HandleFunc("/api/snippets/random", enableCORS(getRandomSnippet))
    http.HandleFunc("/api/results", enableCORS(saveResults))
    
    // FIXED: Removed the broken line with ":3001, nil
    log.Println("🏎️ Server starting on :5000")
    log.Fatal(http.ListenAndServe(":5000", nil))
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    response := map[string]string{
        "status":  "OK",
        "message": "CodeGP Backend is racing! Stewards in action! 🏁",
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func getRandomSnippet(w http.ResponseWriter, r *http.Request) {
    language := r.URL.Query().Get("language")
    if language == "" {
        language = "javascript"
    }
    
    snippets := map[string][]CodeSnippet{
        "javascript": {
            {
                ID:         "js-1",
                Code:       "function hello() {\n  console.log('Hello World');\n}",
                Language:   "javascript",
                Difficulty: "easy",
            },
            {
                ID:         "js-2",
                Code:       "const sum = (a, b) => a + b;",
                Language:   "javascript",
                Difficulty: "easy",
            },
        },
        "python": {
            {
                ID:         "py-1",
                Code:       "def greet(name):\n    print(f'Hello {name}')",
                Language:   "python",
                Difficulty: "easy",
            },
        },
    }
    
    langSnippets, exists := snippets[language]
    if !exists {
        langSnippets = snippets["javascript"]
    }
    
    randomIndex := rand.Intn(len(langSnippets))
    snippet := langSnippets[randomIndex]
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(snippet)
}

func saveResults(w http.ResponseWriter, r *http.Request) {
    // Only accept POST requests
    if r.Method != "POST" {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }
    
    // Parse the incoming JSON
    var result struct {
        WPM      int     `json:"wpm"`
        CPM      int     `json:"cpm"`
        Accuracy float64 `json:"accuracy"`
        Errors   int     `json:"errors"`
        Duration int     `json:"duration"`
        Language string  `json:"language"`
    }
    
    err := json.NewDecoder(r.Body).Decode(&result)
    if err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }
    
    // Log the result (later we'll save to database)
    log.Printf("🏁 Race completed: WPM=%d, Accuracy=%.1f%%, Language=%s\n",
        result.WPM, result.Accuracy, result.Language)
    
    // Send success response
    response := map[string]interface{}{
        "success": true,
        "message": "Race result saved!",
        "wpm":     result.WPM,
    }
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated) // 201 status
    json.NewEncoder(w).Encode(response)
}
