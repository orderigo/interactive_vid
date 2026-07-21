# Interactive Video Presentation - Rangoon West University 25th Anniversary

Interactive touchscreen web app for the Rangoon West University 25th Anniversary Silver Jubilee celebration (2001-2026), using the local photos in `public/img/` and installable for offline viewing as a PWA/APK-style web app.

## Features

- Touchscreen Support: Full touch and swipe gesture support
- Story Slides: swipe through 2001, 2002, 2005, 2010, 2015, 2020, 2024, and the 2026 finale
- Local Photos: the first five slides use the five bundled images from `public/img/`, with later slides reusing local assets for offline safety
- Fireworks Animation: Spectacular fireworks rising from below on final year (2026)
- Event Display: Shows "ရန်ကုန်အနောက်ပိုင်းတက္ကသိုလ် (၂၅) နှစ်မြောက်ငွေရတုအထိမ်းအမှတ်" with golden effects
- Keyboard Navigation: Full keyboard support (arrows, ESC, Home, End)
- Wow Effects: 3D animations, glowing tiles, starfield background, and more
- Myanmar-inspired color schemes with gold accents

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Usage

### Touch/Swipe Gestures
- Tap: Select a year to view its image
- Swipe Left: Navigate to previous year
- Swipe Right: Navigate to next year
- ESC: Reset selection

### Keyboard Controls
- Right Arrow: Next year
- Left Arrow: Previous year
- ESC: Reset selection
- Home: Go to first year (2001)
- End: Go to final year (2026)

## Customization

### Adding Year Images
Update the `slideImages` array in `pages/index.js` with files placed in `public/img/`. Keep paths beginning with `/img/` so the service worker can cache them for offline use.

### Event Information
Modify the event name and subtitle at the top of pages/index.js.

## Tech Stack

- Frontend: Next.js 14
- 3D Graphics: Three.js r159
- React 3D: @react-three/fiber
- 3D Components: @react-three/drei

## Project Structure

interactive_vid/
├── pages/
│   ├── index.js      # Main interactive app
│   └── _app.js       # Next.js app wrapper
├── styles/
│   └── globals.css   # Global styles
├── package.json
├── next.config.js
└── README.md

## Visual Features

- 3D Year Tiles: Rotating, glowing tiles with metallic finish
- Circular Layout: Years arranged in an elegant circle for easy touch access
- Image Previews: Floating image displays above selected years
- Fireworks: Particle-based fireworks rising from below the screen
- Starfield Background: Animated stars with twinkling effects
- Golden Accents: Special gold coloring for selected elements and final year
- Smooth Animations: Fluid transitions and bobbing effects

## Touchscreen Optimization

- Large touch targets for easy interaction
- Enhanced swipe detection with velocity-based navigation
- Prevented default touch behaviors for smooth experience
- Responsive design that works on any touchscreen size

## Special Effects for 2026

When reaching 2026:
- Golden event title appears with animations
- Spectacular fireworks launch from below the screen
- Decorative particles orbit the title
- Special glow effects on all elements


## APK / Offline Install

The app is configured as an installable PWA with `public/manifest.json` and `public/sw.js`. After the first successful load from a web server, Android Chrome can use **Add to Home screen / Install app** so it behaves like an APK-style offline app. For a true `.apk`, wrap the exported `out/` folder with a PWA wrapper such as Trusted Web Activity/Bubblewrap.

## Offline Browser Package

Create a downloadable offline copy that can be opened directly from a browser without running a server:

```bash
npm run package:offline
```

This command builds the static site, copies it into `offline-package/`, and creates `interactive_vid_offline.zip`. To use it offline:

1. Share or download `interactive_vid_offline.zip`.
2. Unzip the file on the target computer.
3. Open `index.html` in any modern browser.

No internet connection or Node.js server is required after the ZIP file has been created.

## Deployment

### Static / Offline Deployment
```bash
npm run export
```

Host the generated `out/` folder on any static hosting service, or open `out/index.html` directly in a browser.

### Local Development
```bash
npm run dev
```

### Production Static Package
```bash
npm run package:offline
```

Deploy the generated `out/` folder to Vercel, Netlify, GitHub Pages, or any static hosting service.

## License

Private - For Rangoon West University 25th Anniversary use only.

---

Happy 25th Anniversary!

ရန်ကုန်အနောက်ပိုင်းတက္ကသိုလ် (၂၅) နှစ်မြောက်ငွေရတုအထိမ်းအမှတ်