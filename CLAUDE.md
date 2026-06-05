# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

```powershell
node .\serve.mjs
```

Opens at `http://127.0.0.1:4173/`. There is no build step — the server serves files directly. No npm, no bundler, no hot reload; changes are visible on manual browser refresh.

## Architecture

This is a no-build React portfolio. JSX is transpiled **in the browser** at runtime by Babel (loaded from `vendor/babel.min.js`). React and ReactDOM are also loaded from local `vendor/` files. There is no `package.json`, no node_modules, and no compile step.

**Data flow:**

1. `index.html` sets `window.__resources` (image paths), loads vendor scripts, then loads `src/data.js` and the JSX source files.
2. `src/data.js` defines `window.PORTFOLIO` — all content (identity, stats, seasons, case studies, links) lives here. **Edit content here, not in the component.**
3. `src/RefinedPortfolio.jsx` exports `window.RefinedPortfolio` — contains the full CSS (`REFINED_STYLE` template literal injected via `<style>`), all components, and all logic.
4. `src/app.jsx` mounts `<window.RefinedPortfolio data={window.PORTFOLIO} />` into `#app`.

**Scroll architecture:**

The page uses `scroll-snap-type: y mandatory` on `.refined-root` with `scroll-snap-stop: always` on each section. This means sections snap to fill the viewport — continuous scroll-position-based effects don't work cleanly; use entry-triggered animations instead.

Section visibility is tracked via `IntersectionObserver` (threshold 0.3). The observer adds `r-season--entered` / `r-oath--entered` classes to trigger CSS entry animations. It removes them on exit so animations replay on re-entry.

**Animation rule:**

- **Header elements** (season label, title, lore) use CSS `animation` with `fill-mode: both`.
- **Interactive elements** (`.r-card`, `.r-oath-link`) use CSS `transition` — never `animation`. CSS animations override inline styles in the cascade, which breaks the JS-driven micro-parallax (3D tilt via `element.style.transform`).

**Modal / history:**

Opening a case study calls `openModal(id)` which does `history.pushState`. Closing calls `closeModal()` which calls `history.back()` to keep history tidy. A `popstate` listener handles the browser back button. Do not call `setSelectedId` directly — always use `openModal` / `closeModal`.

**Tracking:**

Umami events are fired via `window.umami?.track(eventName, properties)`. Analytics IDs are public (intentional). To exempt a browser from tracking: `localStorage.setItem('umami.disabled', '1')`.

## serve.mjs security notes

The static server sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Content-Security-Policy` on every response. The path traversal guard uses `target.startsWith(root + path.sep)` — keep the `path.sep` suffix if editing this check.
