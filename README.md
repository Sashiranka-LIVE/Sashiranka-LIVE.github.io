# sashiranka.me — "Form to Print."

Vite (vanilla) + GSAP 3.15 (SplitText, ScrollTrigger) + Lenis 1.3. No WebGL: the hero and contact backgrounds are looping videos.

```bash
npm install
npm run dev                          # http://127.0.0.1:5173
npx vite build && npx vite preview   # production build on :4173
node shoot3.mjs [pre|hero|mobile]    # Playwright screenshots → shots/round3/ (needs preview running)
npm run og                           # regenerate og.png + favicons
```
`?hold=0.64` freezes the preloader at 64% (for screenshots).

## Background videos
| Slot | Markup | Files in `public/video/` |
|---|---|---|
| Hero | `#heroBg` | `hero-bg.{mp4,webm}`, `hero-poster.webp` |
| Contact | `#contactBg` | `contact-bg.{mp4,webm}`, `contact-poster.webp` |

- Both are muted, looping, `playsinline`, `object-fit: cover`, shown at `--op: .35` under a `#0F0E0C` gradient (`.bgvid__shade`).
- The poster `<img>` sits underneath; the video fades in over it once it is really playing (`.is-playing`).
- Reduced motion: the `<video>` is removed before any source is attached (no download), only the poster shows.
- The contact video is lazy: `<source data-src>` is attached when the section is within 300 px of the viewport (`src/bgvideo.js`). Both videos pause when off-screen or when the tab is hidden.
- Each loop ends with a 1.2 s cross-dissolve into its first frame, so the restart is seamless.

### Re-encoding (ffmpeg)
Sources are 1920×1080. The "SD" watermark sits in the top-left (x < 350, y < 210), so every encode crops `crop=1560:1080:360:0`, then scales to 1280×886 at 25 fps, no audio. Seamless loop = `xfade` of the last 1.2 s over the first 1.2 s. Targets: each file under 3 MB.

## Files
- `index.html` — all sections and meta tags.
- `src/main.js` — preloader, cursor, Lenis, GSAP reveals, signature draws.
- `src/bgvideo.js` — background-loop helper (lazy load, reduced motion, play/pause on visibility).
- `src/style.css` — all styles (`.bgvid*`, `.hero__bg`, `.foot__bg`, `.foot__panel`).
- `src/config.js` — `PALETTE`, `BRAND`.
- `../archive/hero-v3/` — the retired halftone portrait (three.js scene, GLB avatars, depth maps, transform clip). Not part of the build.

## Licences
- Archivo, Instrument Serif, JetBrains Mono, Noto Sans Sinhala: SIL OFL 1.1, self-hosted via @fontsource.
- Lenis (MIT), Vite (MIT), GSAP (GSAP "Standard" licence, free incl. commercial, plugins incl. SplitText).
- Videos and portraits were supplied by the user.
