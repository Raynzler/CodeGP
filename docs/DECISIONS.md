# Technical Decisions Log

## Frontend Framework: Next.js 14 with App Router
**Date**: [Date]
**Why**: 
- Latest React features with Server Components
- Built-in optimizations (image, font, script)
- Vercel deployment is seamless
- App Router provides better layouts and loading states
**Trade-offs**: 
- App Router is newer, less community resources
- Some libraries not yet compatible
**Alternatives Considered**: 
- Create React App (too basic)
- Remix (less ecosystem)

## State Management: useState + Custom Hooks
**Date**: [Date]
**Why**:
- Simple enough for current scope
- No need for Redux complexity yet
- Custom hooks provide good abstraction
**Trade-offs**:
- Multiple useState calls (refactor to useReducer later)
- No global state management
**Future**: Consider Zustand if app grows

## Database: Supabase (PostgreSQL)
**Date**: [Date]
**Why**:
- Built-in authentication
- Real-time subscriptions for multiplayer (future)
- Generous free tier
- PostgreSQL is industry standard
**Trade-offs**:
- Vendor lock-in
- Less control than self-hosted
**Alternatives Considered**:
- Firebase (NoSQL not ideal for leaderboards)
- Self-hosted Postgres (too much overhead)

## Styling: Tailwind CSS
**Date**: [Date]
**Why**:
- Rapid prototyping
- Consistent design system
- Small bundle size with purging
- Great DX with IntelliSense
**Trade-offs**:
- HTML can get verbose
- Learning curve for utility classes

## Backend Language: Go
**Date**: [Today]
**Why**: 
- Already proficient in Go (see Go-Cart project)
- Positions me as Backend/Systems engineer, not just web dev
- Better performance for real-time typing tests
- Single binary deployment is cleaner
- Demonstrates polyglot programming skills
**Trade-offs**:
- Different language from frontend (complexity)
- Fewer tutorials for Go + Next.js combo
- More verbose than TypeScript
**Alternatives Considered**:
- Node.js/TypeScript (too common, doesn't differentiate)
- Java/Spring (too enterprise, verbose)
- C++ (overkill for web APIs)