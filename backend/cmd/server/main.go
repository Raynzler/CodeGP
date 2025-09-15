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
	WPM           int     `json:"wpm"`
	CPM           int     `json:"cpm"`
	accuracy      float64 `json:"accuracy"`
	time.Duration `json:"duration"`
	Language      string `json:"language"`
	Difficulty    string `json:"difficulty"`
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

	log.Println(http.ListenAndServe(":3001, nil))
	log.Println("🏎️ Server starting on :5000")
	log.Fatal(http.ListenAndServe(":5000", nil))
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"status":  "OK",
		"message": "CodeGP Backend is racing!",
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

//package main
//
//import (
//	"encoding/json"
//	"log"
//	"net/http"
//)
//
//func main() {
//	// Simple health check endpoint
//	http.HandleFunc("/api/health", healthHandler)
//
//	log.Println("🏎️ Server starting on :5000")
//	log.Fatal(http.ListenAndServe(":5000", nil))
//}
//
//func healthHandler(w http.ResponseWriter, r *http.Request) {
//	response := map[string]string{
//		"status":  "OK",
//		"message": "CodeGP Backend is racing!",
//	}
//
//	w.Header().Set("Content-Type", "application/json")
//	json.NewEncoder(w).Encode(response)
//}
