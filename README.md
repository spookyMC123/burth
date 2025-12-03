# Birthday Surprise Website

A cinematic, elegant birthday surprise website with stunning animations and effects.

## Features

- Pure black & white cinematic theme
- Letterbox entrance animation with spotlight reveal
- Floating particle effects
- Film grain and vignette overlays
- Frosted glass panels for text
- "Tap to Enter" interactive flow
- Optional background music support
- Fully responsive (mobile-first)
- Accessibility features (keyboard navigation, reduced motion support)

## Deployment

### Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel will auto-detect Vite and configure the build settings
4. Click Deploy

### Cloudflare Pages

1. Push this project to a GitHub repository
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your GitHub account and select the repository
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Click Deploy

## Customization

### Change the Message Text

Edit `src/App.tsx` and modify the `BIRTHDAY_MESSAGE` object at the top of the file:

```typescript
const BIRTHDAY_MESSAGE = {
  title: "Your title here",
  paragraphs: [
    "First paragraph...",
    "Second paragraph...",
    // Add more paragraphs as needed
  ],
  closing: "Your closing message",
  signature: "Your signature",
  footer: "Footer text"
}
```

### Add Background Music

1. Place your music file in the `public` folder as `music.mp3`
2. The music will automatically play (at 30% volume) after the user taps "Enter"

To change the music file path, edit the `<audio>` element in `src/App.tsx`:

```html
<audio ref={audioRef} src="/your-music-file.mp3" loop />
```

### Adjust Animation Timing

- Entrance animation duration: Edit the `entranceTimer` timeout in `src/App.tsx` (default: 3500ms)
- Transition duration: Edit the `setTimeout` in `handleEnter` function (default: 1500ms)

### Color Theme

The site uses CSS custom properties. To adjust colors, edit `src/index.css`:

```css
:root {
  --bg-primary: #000000;
  --text-primary: #ffffff;
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS3 (no external CSS frameworks)
