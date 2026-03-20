# Cursor Event Asset Generator

> A single-page tool for Cursor Community ambassadors to generate on-brand event assets - no backend, no build step, runs anywhere.

[![HTML/CSS/JS](https://img.shields.io/badge/stack-HTML%20%2B%20CSS%20%2B%20JS-orange)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

**[Try the live demo](https://kamilstanuch.github.io/cursor-ambassador-studio/)**

---

## What's inside

| Tool | What it does |
|------|--------------|
| **Square Designer** | Tile editor for Luma, Meetup, and social squares. Pick theme, swap logos, export as PNG. |
| **Speaker Generator** | Upload a speaker photo + details, get assets in Square (1:1), Horizontal (16:9), and Story (9:16). Download one or all as a zip. |
| **Event Description Templates** | Copy-paste starters for meetups, cafes, hackathons. Set your city and go. |
| **Asset Library** | Browse and download every SVG from the official Cursor brand pack. |
| **Chapter Avatar** | Generate circle or square avatars from the brand kit. |
| **Brand Guidelines** | Quick reference for colors, tokens, and usage rules. |

---

## Quick start

### Try the demo

Open **[kamilstanuch.github.io/cursor-ambassador-studio](https://kamilstanuch.github.io/cursor-ambassador-studio/)** - nothing to install, everything works.

### Run locally

You can open `index.html` directly in your browser - browsing, previewing, and editing all work.

**PNG export/download** requires serving over HTTP (browsers block the image generation API on `file://` for security reasons). If you need export:

```bash
# Clone and serve
git clone https://github.com/cursorcommunityled/cursor-event-asset-generator.git
cd cursor-event-asset-generator
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

---

## Project structure

```
cursor-ambassador-studio/
  index.html          <- open this
  app.bundle.js       <- all JS bundled into one file
  css/styles.css      <- all styles
  assets/             <- SVG brand assets (logos, avatars, icons)
  js/                 <- source modules (for development only)
  entry.mjs           <- esbuild entry (for development only)
```

The live site only needs `index.html`, `css/styles.css`, `app.bundle.js`, and `assets/`.

---

## Development

To modify the app, edit files in `js/` then rebuild:

```bash
npm install html-to-image jszip esbuild
npx esbuild entry.mjs --bundle --format=iife --outfile=app.bundle.js
```

### Adding a new tool

1. Create your view in `js/views/`
2. Register the route in `js/main.js`
3. Add a tile on the hub in `js/views/hub.js`
4. Rebuild `app.bundle.js`

---

## Tech stack

- **Pure HTML/CSS/JS** - no framework, no TypeScript, no server
- **[html-to-image](https://github.com/bubkoo/html-to-image)** - client-side PNG generation
- **[JSZip](https://stuk.github.io/jszip/)** - zip packaging for batch downloads
- **[esbuild](https://esbuild.github.io/)** - bundles modules into one file (dev only)

---

## Brand assets included

Official Cursor brand SVGs (September 2025 pack):

- General Logos - Cube, Wordmark, Lockup Horizontal, Lockup Vertical
- Avatars - Circle, Square
- App Icons

---

Part of [Cursor Community Led Tooling](https://github.com/orgs/cursorcommunityled/).

MIT License
