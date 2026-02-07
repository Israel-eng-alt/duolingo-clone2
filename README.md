# Duolingo Clone

A comprehensive Duolingo clone built with Next.js, TypeScript, and Tailwind CSS. This application replicates the core features of Duolingo including lessons, gamification, leaderboards, and more.

## Features Implemented

### Phase 1: Foundation ✓
- [x] Next.js 14+ with TypeScript
- [x] Tailwind CSS with custom Duolingo color palette
- [x] Responsive design for mobile and desktop
- [x] Project structure and component organization

### Phase 1: Authentication ✓
- [x] Login/Register UI with social auth options
- [x] Demo account for quick testing
- [x] User state management with Zustand
- [x] Local storage persistence

### Phase 1: Basic Learning ✓
- [x] Course structure (Courses → Sections → Units → Lessons)
- [x] Interactive learning path UI
- [x] 5+ exercise types:
  - Multiple choice
  - Word bank (sentence building)
  - Translation (to target and source)
  - Match pairs
  - Fill in the blank
  - Listen and type
- [x] Lesson flow with progress tracking
- [x] Exercise validation and feedback
- [x] Sample Spanish course data

### Phase 2: Gamification ✓
- [x] XP system with history tracking
- [x] Streak system with freeze mechanics
- [x] Hearts/energy system (free tier)
- [x] Unlimited hearts (premium tier)
- [x] 10-tier league leaderboard system
- [x] Quests system (daily and weekly)
- [x] Gems economy (earn and spend)
- [x] Shop with power-ups and outfits

### Phase 2: Social Features ✓
- [x] User profiles
- [x] Stats dashboard
- [x] Settings management

### UI/UX ✓
- [x] Duolingo-style design system
- [x] Custom color palette and typography
- [x] Animations with Framer Motion
- [x] Bottom navigation
- [x] Progress bars and indicators
- [x] Responsive mobile-first design

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Package Manager:** Bun

## Getting Started

### Prerequisites

- Bun installed on your system
- Node.js 18+ (for Bun compatibility)

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd duolingo-clone
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Try the Demo

Click "Try Demo Account" on the login page to access a pre-populated account with:
- 1,250 XP
- 5-day streak
- 500 gems
- Spanish course unlocked

## Project Structure

```
duolingo-clone/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── auth/              # Authentication page
│   │   ├── leaderboard/       # Leaderboard page
│   │   ├── learn/             # Learning path page
│   │   ├── lesson/[id]/       # Lesson page (dynamic)
│   │   ├── profile/           # User profile page
│   │   ├── quests/            # Quests page
│   │   ├── shop/              # Shop page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── exercises/         # Exercise components
│   │   ├── navigation/        # Navigation components
│   │   ├── ui/                # UI components
│   │   └── LessonInterface.tsx
│   ├── data/                  # Static data
│   │   └── courseData.ts      # Course content
│   ├── lib/                   # Utilities
│   │   └── utils.ts           # Helper functions
│   ├── stores/                # Zustand stores
│   │   ├── lessonStore.ts     # Lesson state
│   │   └── userStore.ts       # User state
│   └── types/                 # TypeScript types
│       └── index.ts           # Type definitions
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Key Features

### Exercise Types

1. **Multiple Choice:** Select the correct answer from options
2. **Word Bank:** Build sentences by tapping words
3. **Translation:** Type translations between languages
4. **Match Pairs:** Match vocabulary pairs
5. **Fill in Blank:** Complete sentences with correct words
6. **Listen and Type:** Type what you hear

### Gamification

- **XP System:** Earn XP for completing lessons and quests
- **Streaks:** Track consecutive days of learning
- **Hearts:** Free users have 5 hearts that deplete on wrong answers
- **Leaderboards:** Compete with others in weekly leagues
- **Quests:** Daily and weekly challenges with rewards
- **Gems:** Virtual currency for power-ups and outfits

## Customization

### Adding New Courses

Edit `src/data/courseData.ts` to add:
- New courses
- Sections and units
- Lessons
- Exercises

### Styling

The app uses Tailwind CSS with a custom configuration in `tailwind.config.js`. Key colors:
- `--duo-green`: Primary brand color
- `--duo-blue`: Secondary color
- `--duo-orange`: Streak color
- `--duo-red`: Error/hearts color

## Future Enhancements

Potential features to add:
- [ ] Audio playback with TTS
- [ ] Speech recognition exercises
- [ ] AI-powered conversation practice (Max tier)
- [ ] Stories feature
- [ ] Friends system with quests
- [ ] Achievements system
- [ ] Subscription tiers (Super/Max)
- [ ] Offline mode
- [ ] Push notifications

## License

This project is for educational purposes. Duolingo is a trademark of Duolingo, Inc.

## Contributing

Feel free to fork and contribute to this project. This is a demonstration of building a complex React application with modern tools and best practices.

---

Built with ❤️ and lots of ☕
