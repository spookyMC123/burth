# Birthday Surprise Website

A cinematic, elegant birthday surprise website for a special occasion.

## Overview

This is a pure black & white themed website featuring stunning cinematic animations and effects. The site displays a heartfelt birthday message with a dramatic entrance sequence.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Pure CSS3 (no frameworks)
- **Deployment**: Compatible with Vercel, Cloudflare Pages, Netlify

## Project Structure

```
/
├── src/
│   ├── App.tsx         # Main React component with all logic
│   ├── App.css         # All cinematic styles and animations
│   ├── index.css       # Global styles and CSS variables
│   └── main.tsx        # React entry point
├── public/
│   └── (place music.mp3 here for background music)
├── index.html          # HTML entry point
└── vite.config.ts      # Vite configuration (port 5000)
```

## Key Features

1. **Cinematic Entrance**: Letterbox bars, spotlight reveal, slow zoom
2. **Tap-to-Enter Flow**: Interactive button before main content
3. **Visual Effects**: Film grain, vignette, floating particles, lens flares
4. **Frosted Glass Panels**: Elegant text containers
5. **Accessibility**: Keyboard navigation, prefers-reduced-motion support
6. **Background Music**: Optional, plays after Enter button is tapped

## Configuration

### Port
The dev server runs on port 5000 (configured in vite.config.ts)

### Message Customization
Edit `BIRTHDAY_MESSAGE` object in `src/App.tsx`

### Timing
- Entrance animation: 3.5 seconds
- Transition to content: 1.5 seconds

## Development Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server on port 5000
npm run build  # Build for production
```

## Recent Changes

- Initial creation: Complete cinematic birthday website with React + TypeScript
- All effects implemented: letterbox, particles, film grain, vignette, glass panels
- Responsive design with mobile-first approach
- Accessibility features included
