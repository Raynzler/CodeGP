package models

// RaceResult represents a completed typing test
type RaceResult struct {
	ID       string  `json:"id"`
	WPM      int     `json:"wpm"`
	CPM      int     `json:"cpm"`
	Accuracy float64 `json:"accuracy"`
	Language string  `json:"language"`
}
