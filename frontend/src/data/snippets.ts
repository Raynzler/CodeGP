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
    {
      id: 'js-ferrari-masterplan',
      code: `// Ferrari Strategy Department Simulator
function calculateOptimalStrategy(currentPosition, lapsRemaining) {
  const strategies = ["Plan A", "Plan B", "Plan C", "Plan F"];
  let selectedStrategy = strategies[0];
  
  // Classic Ferrari moment
  if (currentPosition === 1) {
    console.log("We are checking...");
    selectedStrategy = "Box for hards with 5 laps to go";
  }
  
  // Question?
  setTimeout(() => {
    console.log("Copy, we are looking");
    selectedStrategy = strategies[Math.floor(Math.random() * 4)];
  }, 30000);
  
  return selectedStrategy;
}`,
      language: 'javascript',
      difficulty: 'medium',
    },
    {
      id: 'js-verstappen-domination',
      code: `// Max Verstappen Race Simulator 2023
class Verstappen {
  constructor() {
    this.poles = 12;
    this.wins = 19;
    this.radio = ["Simply lovely!", "Ha ha yes boys!", "That was fun"];
  }
  
  qualifyingLap() {
    console.log("*Purple Sector 1*");
    console.log("*Purple Sector 2*");
    console.log("*Purple Sector 3*");
    return "Pole Position by 0.5 seconds";
  }
  
  raceStart() {
    return "Leads into turn 1, race over";
  }
}

const max = new Verstappen();
console.log(max.qualifyingLap());`,
      language: 'javascript',
      difficulty: 'easy',
    },
    {
      id: 'js-hamilton-blessed',
      code: `// Mercedes Tyre Management System
const lewisHamilton = {
  tyreStatus: "Bono, my tyres are dead!",
  actualTyreStatus: "Sets fastest lap",
  
  async manageTyres(lapNumber) {
    const messages = [
      "These tyres won't last",
      "I'm losing grip",
      "The car doesn't feel right"
    ];
    
    // Complain about tyres
    console.log(messages[lapNumber % 3]);
    
    // Set purple sectors anyway
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      sector1: "Purple",
      sector2: "Purple", 
      sector3: "Personal best",
      message: "Get in there Lewis! Mega drive!"
    };
  }
};`,
      language: 'javascript',
      difficulty: 'medium',
    },
    {
      id: 'js-alonso-karma',
      code: `// Alpine El Plan Implementation
function executeElPlan(seasonYear) {
  const alonso = {
    age: 42,
    motivation: Infinity,
    radio: "GP2 engine! GP2!",
    
    defendPosition(attacker) {
      // All the time you have to leave the space!
      if (attacker === "Hamilton") {
        return "Palmer has retired, karma!";
      }
      return "Maximum penalties!";
    }
  };
  
  // Trust El Plan
  while (seasonYear < 2024) {
    console.log("Next year will be our year");
    seasonYear++;
  }
  
  return "Aston Martin suddenly fast?!";
}`,
      language: 'javascript',
      difficulty: 'hard',
    },
    {
      id: 'js-guenther-steiner',
      code: `// Haas F1 Budget Simulator
class HaasF1Team {
  constructor(budget) {
    this.budget = budget || "We don't have money";
    this.guenther = new TeamPrincipal();
  }
  
  upgradePackage() {
    if (this.budget < 1000000) {
      return this.guenther.express("We look like bunch of wankers!");
    }
    
    // Fok smash the door moment
    const success = Math.random() > 0.8;
    
    if (!success) {
      this.guenther.callMick();
      return "Kevin, tell him to fok smash my door!";
    }
    
    return "P7! Unbelievable!";
  }
}`,
      language: 'javascript',
      difficulty: 'hard',
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
    {
      id: 'ts-fia-regulations',
      code: `// FIA Technical Regulations Type System
interface TechnicalRegulation {
  article: number;
  description: string;
  interpretation: "clear" | "vague" | "ferrari-international-assistance";
}

type PenaltyDecision = {
  driver: string;
  incident: "track limits" | "unsafe release" | "causing collision";
  penalty: 5 | 10 | "no investigation necessary";
  stewarding: "noted" | "investigating after race";
};

class FIASteward {
  constructor(private consistency: number = Math.random()) {}
  
  reviewIncident(incident: PenaltyDecision): string {
    // Michael, this is so not right!
    if (incident.driver === "Hamilton") {
      return "5 second penalty";
    }
    
    // Let them race logic
    if (this.consistency < 0.5) {
      return "No further action";
    }
    
    return "Under investigation";
  }
}`,
      language: 'typescript',
      difficulty: 'hard',
    },
    {
      id: 'ts-mclaren-strategy',
      code: `// McLaren Strategy Department
type DriverMood = "Happy Lando" | "Angry Lando" | "Radio Silence";

interface McLarenStrategy {
  driver: "NOR" | "PIA";
  tyreChoice: "We'll get back to you";
  pitWindow: [number, number];
  teamOrder?: "Papaya rules" | "Multi 21";
}

async function mcLarenPitwall(race: Race): Promise<McLarenStrategy> {
  // Classic McLaren overthinking
  await delay(30000);
  
  console.log("Lando, box to overtake");
  console.log("Actually stay out");
  console.log("No wait, box box box!");
  
  return {
    driver: "NOR",
    tyreChoice: "We'll get back to you",
    pitWindow: [15, 45], // Wide enough?
    teamOrder: "Papaya rules"
  };
}`,
      language: 'typescript',
      difficulty: 'medium',
    },
    {
      id: 'ts-red-bull-pitstop',
      code: `// Red Bull Pit Stop Optimization
interface PitStopTiming {
  jackUp: number;
  wheelOff: number[];
  wheelOn: number[];
  jackDown: number;
  total: number;
}

class RedBullPitCrew {
  private readonly worldRecord = 1.82;
  
  performPitStop(pressure: "normal" | "championship-deciding"): PitStopTiming {
    const baseTime = pressure === "normal" ? 2.1 : 2.8;
    
    // Sub 2 second magic
    const timing: PitStopTiming = {
      jackUp: 0.3,
      wheelOff: [0.4, 0.4, 0.4, 0.4],
      wheelOn: [0.6, 0.6, 0.6, 0.6],
      jackDown: 0.3,
      total: baseTime + (Math.random() * 0.3)
    };
    
    console.log(\`Pit stop: \${timing.total.toFixed(2)}s\`);
    return timing;
  }
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
    {
      id: 'py-race-engineer',
      code: `# Race Engineer Communication System
class RaceEngineer:
    def __init__(self, driver_name):
        self.driver = driver_name
        self.messages = {
            "Hamilton": ["It's hammertime", "Tyre temps look good"],
            "Verstappen": ["Mode 7, please", "You are the man!"],
            "Leclerc": ["We are checking", "Copy, we are looking"]
        }
    
    def send_radio_message(self, situation):
        if situation == "leading_race":
            return "Keep your head down, long way to go"
        elif situation == "under_pressure":
            return "You're doing great, keep calm"
        elif situation == "ferrari_strategy":
            return "Trust the plan, trust the plan"
        
        # Box box box
        return "Box this lap, box box"
    
    def respond_to_complaint(self, complaint):
        # Classic engineer responses
        if "tyres" in complaint.lower():
            return "Copy, we'll monitor"
        return "Understood, keep pushing"`,
      language: 'python',
      difficulty: 'medium',
    },
    {
      id: 'py-drs-train',
      code: `# DRS Train Detection System
class DRSTrain:
    """When everyone's in DRS range of each other"""
    
    def __init__(self):
        self.train_members = []
        self.drs_threshold = 1.0  # seconds
        
    def add_driver(self, driver, gap_to_ahead):
        if gap_to_ahead <= self.drs_threshold:
            self.train_members.append({
                'driver': driver,
                'gap': gap_to_ahead,
                'message': f"{driver} joins the DRS train!"
            })
            
    def analyze_train(self):
        if len(self.train_members) > 5:
            return "Choo choo! Nobody can overtake!"
        elif len(self.train_members) > 3:
            return "DRS train forming, overtaking difficult"
        return "Clean air, push push push!"
        
    def monaco_special(self):
        # Special Monaco logic
        return "Position is everything, track position!"`,
      language: 'python',
      difficulty: 'easy',
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
    {
      id: 'java-team-principal',
      code: `// F1 Team Principal Simulator
public class TeamPrincipal {
    private String name;
    private double budget;
    private String catchphrase;
    
    public TeamPrincipal(String team) {
        switch(team) {
            case "Red Bull":
                this.name = "Christian Horner";
                this.catchphrase = "Toto, it's called motor racing";
                break;
            case "Mercedes":
                this.name = "Toto Wolff";
                this.catchphrase = "*Smashes table* No Michael no!";
                break;
            case "Ferrari":
                this.name = "Fred Vasseur";
                this.catchphrase = "We are checking...";
                break;
            default:
                this.catchphrase = "We'll come back stronger";
        }
    }
    
    public String reactToIncident(String incident) {
        if (incident.contains("penalty")) {
            return this.catchphrase + " This is unacceptable!";
        }
        return "We need to speak to the FIA about this";
    }
}`,
      language: 'java',
      difficulty: 'medium',
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
    {
      id: 'cpp-telemetry',
      code: `// F1 Telemetry Data Processor
#include <iostream>
#include <vector>
#include <algorithm>

class TelemetryData {
private:
    double speed;
    double throttle;
    int gear;
    double brake_temp;
    
public:
    TelemetryData() : speed(0), throttle(0), gear(1), brake_temp(400) {}
    
    void processLap(const std::vector<double>& inputs) {
        // Bono, my tyres!
        if (brake_temp > 1000) {
            std::cout << "Brake temps critical!" << std::endl;
        }
        
        // Speed trap analysis
        auto max_speed = *std::max_element(inputs.begin(), inputs.end());
        if (max_speed > 340) {
            std::cout << "New speed record at Monza!" << std::endl;
        }
    }
    
    void sendToEngineers() {
        std::cout << "Copy, we are checking..." << std::endl;
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
    {
      id: 'go-safety-car',
      code: `// Safety Car Deployment System
package main

import "fmt"

type SafetyCar struct {
    deployed bool
    driver   string
    message  string
}

func (sc *SafetyCar) deploy(incident string) {
    sc.deployed = true
    sc.driver = "Bernd Maylander"
    
    fmt.Println("SAFETY CAR DEPLOYED")
    fmt.Println("Delta positive, delta positive")
    
    // Typical messages during SC
    messages := []string{
        "Safety car in this lap",
        "Keep delta positive",
        "SC window is open",
        "Prepare for restart",
    }
    
    for _, msg := range messages {
        fmt.Printf("Engineer: %s\\n", msg)
    }
}

func (sc *SafetyCar) end() {
    fmt.Println("Safety car in this lap!")
    fmt.Println("Racing resumes!")
    sc.deployed = false
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
    {
      id: 'rust-engine-modes',
      code: `// Power Unit Mode Management
#[derive(Debug)]
enum EngineMode {
    Qualify,
    Race,
    SaveFuel,
    Party,  // RIP Party mode
    Limp,
}

struct PowerUnit {
    manufacturer: String,
    current_mode: EngineMode,
    reliability: f32,
}

impl PowerUnit {
    fn new(manufacturer: &str) -> Self {
        PowerUnit {
            manufacturer: manufacturer.to_string(),
            current_mode: EngineMode::Race,
            reliability: match manufacturer {
                "Mercedes" => 0.95,
                "Honda" => 0.90,
                "Renault" => 0.75,  // GP2 engine!
                _ => 0.80,
            },
        }
    }
    
    fn change_mode(&mut self, mode: EngineMode) {
        match mode {
            EngineMode::Party => {
                println!("Party mode banned since 2020!");
            },
            _ => self.current_mode = mode,
        }
    }
}`,
      language: 'rust',
      difficulty: 'medium',
    },
    {
      id: 'rust-race-control',
      code: `// Race Control Decision System
use std::collections::HashMap;

struct RaceControl {
    flags: HashMap<String, bool>,
    vsc_deployed: bool,
    race_director: String,
}

impl RaceControl {
    fn new() -> Self {
        RaceControl {
            flags: HashMap::new(),
            vsc_deployed: false,
            race_director: "Niels Wittich".to_string(),
        }
    }
    
    fn investigate_incident(&self, drivers: Vec<&str>) -> String {
        // Classic FIA consistency
        if drivers.contains(&"Verstappen") && drivers.contains(&"Hamilton") {
            return "Noted - Racing incident".to_string();
        }
        
        match drivers.len() {
            1 => "5 second penalty for track limits".to_string(),
            2 => "Under investigation after the race".to_string(),
            _ => "No further action".to_string(),
        }
    }
}`,
      language: 'rust',
      difficulty: 'hard',
    },
    {
      id: 'rust-tyre-strategy',
      code: `// Pirelli Tyre Degradation Model
#[derive(Clone)]
enum TyreCompound {
    Soft(f32),
    Medium(f32),
    Hard(f32),
    Intermediate(f32),
    Wet(f32),
}

struct TyreStrategy {
    current_tyre: TyreCompound,
    lap_count: u32,
    deg_rate: f32,
}

impl TyreStrategy {
    fn calculate_pit_window(&self) -> (u32, u32) {
        match &self.current_tyre {
            TyreCompound::Soft(_) => (12, 20),
            TyreCompound::Medium(_) => (20, 35),
            TyreCompound::Hard(_) => (30, 50),
            _ => (5, 60), // Weather tyres
        }
    }
    
    fn ferrari_strategy(&mut self) -> String {
        // Classic Ferrari
        "Box box, no stay out, wait box box!".to_string()
    }
}`,
      language: 'rust',
      difficulty: 'medium',
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