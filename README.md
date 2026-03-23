# Greensett Logistics — React + Vite Website

A production-ready, multi-page React website for Greensett Logistics Limited.

## Tech Stack

| Package | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 5** | Build tool & dev server |
| **React Router v6** | Client-side routing (4 pages) |
| **Framer Motion 11** | Cinematic fade+scale page transitions, scroll animations |
| **Three.js** | Interactive 3D globe in the hero |
| **Lenis** | Smooth scroll (add to `main.jsx` if desired) |
| **CSS Modules** | Scoped per-component styles |

## Project Structure

```
src/
├── assets/          # All 18 images (trucks, port ops, logo, etc.)
├── components/
│   ├── Footer.jsx / Footer.module.css
│   ├── Globe.jsx          # Three.js animated globe
│   ├── Marquee.jsx        # Scrolling services ticker
│   ├── Navbar.jsx / Navbar.module.css
│   └── PageTransition.jsx # Framer Motion fade+scale wrapper
├── hooks/
│   └── useScrollReveal.js
├── pages/
│   ├── Home.jsx / Home.module.css       — Hero, globe, route map, gallery
│   ├── About.jsx / About.module.css     — Story, values, sustainability, quotes
│   ├── Services.jsx / Services.module.css — Cards, process, cargo types
│   └── Contact.jsx / Contact.module.css  — Form with success state, offices
├── styles/
│   └── globals.css   # CSS variables, shared utilities
├── App.jsx           # AnimatePresence + Routes
└── main.jsx          # Entry point
```

## Routes

| Path | Page |
|---|---|
| `/` | Home (Hero + Globe + Route Map + Gallery) |
| `/about` | About (Story + Values + Sustainability + Team Quotes) |
| `/services` | Services (5 expandable service cards + Process timeline) |
| `/contact` | Contact (Form + Office info + Hours) |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag-and-drop the dist/ folder to netlify.com/drop
```

### Static hosting (nginx/Apache)
```bash
npm run build
# Serve the dist/ folder
# Add a rewrite rule: all paths → /index.html (for React Router)
```

**nginx rewrite rule:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Customisation

### Adding a new page
1. Create `src/pages/NewPage.jsx` and `NewPage.module.css`
2. Wrap content in `<PageTransition>`
3. Add route in `src/App.jsx`:
   ```jsx
   <Route path="/new-page" element={<NewPage />} />
   ```
4. Add link to `src/components/Navbar.jsx`

### Updating contact details
Edit `src/components/Footer.jsx` and `src/pages/Contact.jsx`

### Replacing images
Drop new files into `src/assets/` and update the import paths in the relevant page file.

### Changing the colour scheme
All design tokens live in `src/styles/globals.css` under `:root {}`.

---

**Greensett Logistics Limited**  
Home of Logistics Solutions  
www.greensett.com
