# 🏎️ CodeGP

> Race through code Grand Prix style! A Formula 1 themed code typing game where speed meets precision.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🏁 Live Demo

**[syntaxracer.vercel.app](https://syntaxracer.vercel.app)** - Current F1 themed version

## 🚦 Features

### Racing Features 🏎️
- **F1 Theme** - Complete racing experience with pit stops, radio messages, and race terminology
- **Driver Rankings** - Progress from Mazepin to Verstappen based on your WPM
- **DRS Zones** - Unlock DRS at 95%+ accuracy for speed boosts
- **Sector Timing** - Track your performance through S1, S2, and S3
- **Pit Stop Animations** - 2.3-second pit stop when resetting
- **Race Engineer Radio** - Authentic F1 radio messages during races

### Core Features 💻
- **7 Programming Languages** - JavaScript, TypeScript, Python, Java, C++, Go, Rust
- **Multiple Modes** - Time trials (15s, 30s, 60s) or complete code snippets
- **Real-time Stats** - WPM, CPM, accuracy, and sector times
- **User Profiles** - Track your racing career with authentication
- **Leaderboards** - Compete for pole position (coming soon)
- **Progress Tracking** - View your improvement over time

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, TypeScript (in development)
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (frontend), Railway (backend - coming soon)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for auth features)

### Installation

```bash
# Clone the repository
git clone https://github.com/Raynzler/CodeGP.git
cd CodeGP

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Set up environment variables
# Create frontend/.env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Run development servers
cd ..
npm run dev

```
Open http://localhost:3000

🎮 How to Race
Choose Your Track - Select a programming language
Select Race Mode - Time trial or complete the code
Lights Out! - Start typing when ready
Check Your Stats - View WPM, accuracy, and driver ranking
Beat Your Records - Sign in to save your progress
Keyboard Shortcuts
Shift + Enter - New race
Esc - Return to pit lane (reset)
Ctrl + Backspace - Delete word
🏆 Driver Rankings
Your WPM determines your F1 driver ranking:

🏎️ 0-29 WPM: Mazepin
🏎️ 30-49 WPM: Latifi
🏎️ 50-69 WPM: Alonso
🏎️ 70-89 WPM: Hamilton
🏎️ 90-109 WPM: Verstappen
🏎️ 110-129 WPM: Schumacher
🏎️ 130+ WPM: Räikkönen
🚧 Roadmap
 F1 theme implementation
 User authentication
 Global leaderboards
 Multiplayer races
 Team championships
 Achievement system
 Mobile app
🤝 Contributing
Contributions are welcome! Feel free to submit issues and PRs.

📄 License
MIT License

Copyright (c) 2024 Hamza

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Built with ❤️ and high octane fuel ⛽