# AMMAR & RANA — Luxury Wedding Invitation

A cinematic, premium wedding invitation website built with handcrafted HTML, CSS, and JavaScript.

**Wedding Date:** 04 September 2026  
**Venue:** View Restaurant, Tartous, Syria

---

## Features

- Full-screen cinematic hero with parallax
- Bilingual support (English / Arabic RTL)
- GSAP + ScrollTrigger animations
- Lenis smooth scrolling
- Luxury loading screen
- Live countdown timer
- Wedding details cards
- Google Maps integration
- Masonry gallery with lightbox
- RSVP form
- Background music (auto-starts on first interaction)
- Mouse glow effect
- Scroll progress indicator
- Fully responsive design
- SEO, Open Graph & PWA manifest

---

## Project Structure

```
ammar-rana-wedding/
├── index.html
├── style.css
├── script.js
├── manifest.json
├── README.md
└── assets/
    ├── images/
    │   ├── hero.jpg          ← Add your hero photo here
    │   ├── hero.webp         ← Optional WebP version
    │   ├── hero.svg          ← Fallback (included)
    │   ├── gallery-1.jpg     ← Add gallery photos
    │   ├── gallery-2.jpg
    │   ├── gallery-3.jpg
    │   ├── gallery-4.jpg
    │   ├── gallery-5.jpg
    │   ├── gallery-6.jpg
    │   └── og-image.jpg      ← Social sharing image (1200×630)
    ├── music/
    │   └── wedding-music.mp3 ← Add your background music
    ├── icons/
    │   └── favicon.svg
    └── fonts/
```

---

## Setup

### 1. Add Your Assets

| File | Description | Recommended Size |
|------|-------------|------------------|
| `assets/images/hero.jpg` | Main hero background | 1920×1080 or larger |
| `assets/images/hero.webp` | WebP version (optional) | Same as hero.jpg |
| `assets/images/gallery-*.jpg` | Gallery photos | Various sizes |
| `assets/images/og-image.jpg` | Social media preview | 1200×630 |
| `assets/music/wedding-music.mp3` | Background music | MP3, under 5MB |

### 2. Local Preview

Open `index.html` in a browser, or use a local server:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`

---

## Deploy to GitHub Pages

### Step 1 — Create Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `ammar-rana-wedding`
3. Set visibility to **Public**
4. Click **Create repository**

### Step 2 — Push Code

```bash
cd ammar-rana-wedding
git init
git add .
git commit -m "Initial commit: luxury wedding invitation for AMMAR & RANA"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ammar-rana-wedding.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to **Settings → Pages**
2. Source: **Deploy from branch**
3. Branch: `main` / `/ (root)`
4. Click **Save**

Your site will be live at:
`https://YOUR_USERNAME.github.io/ammar-rana-wedding/`

### Step 4 — Update Meta Tags

In `index.html`, replace `yourusername` in the canonical and Open Graph URLs with your GitHub username.

---

## Customization

### Wedding Date & Time

Edit in `script.js`:

```javascript
const CONFIG = {
  weddingDate: new Date('2026-09-04T19:00:00+03:00'),
  ...
};
```

### Translations

All text is in the `i18n` object in `script.js` under `en` and `ar` keys.

### Colors

CSS variables in `style.css`:

```css
:root {
  --color-ivory: #F7F5F1;
  --color-gold: #C8A96A;
  --color-gold-dark: #B08D57;
  ...
}
```

---

## Technologies

- HTML5 (semantic)
- CSS3 (custom properties, glassmorphism)
- JavaScript ES6 (modules pattern)
- [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger
- [Lenis](https://lenis.darkroom.engineering/) smooth scroll
- Google Fonts (Playfair Display, Cormorant Garamond, Great Vibes, Poppins)

---

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## License

Private project — made with love for AMMAR & RANA.

© 2026
