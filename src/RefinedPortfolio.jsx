// Refined.jsx — Harsh Jha's portfolio.
// Mythic dark-fantasy weight, restored. Real content from `data.js`.
// Original heraldic sigil (abstract). Readable body (19px). Expandable case studies.

const { useState, useRef, useEffect } = React;

const REFINED_STYLE = `
html, body { height: 100%; overflow: hidden; }

:root {
  --r-bg: #0a0604;
  --r-bg-2: #15100c;
  --r-bg-deep: #050201;
  --r-fire: #c0392b;
  --r-fire-bright: #e85a3c;
  --r-fire-gold: #f39c12;
  --r-fire-deep: #7b0000;
  --r-gold: #d4a017;
  --r-gold-soft: #c7a155;
  --r-gold-bright: #f1c40f;
  --r-parchment: #f5e6c8;
  --r-parchment-dark: #e8d5a3;
  --r-bone: #d4c4a0;
  --r-text: #ece1c2;
  --r-text-2: #b8a880;
  --r-text-3: #7a6a48;
  --r-rule: rgba(212,160,23,0.16);
  --r-rule-strong: rgba(212,160,23,0.42);
  --r-rule-fire: rgba(192,57,43,0.4);
}

.refined-root {
  background: var(--r-bg);
  color: var(--r-text);
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 19px;
  line-height: 1.7;
  height: 100svh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-padding-top: 76px;
  scrollbar-width: none;
  position: relative;
}
.refined-root::-webkit-scrollbar { display: none; }

/* Light grain — kept low for readability */
.refined-root::after {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.07;
  mix-blend-mode: overlay;
  z-index: 1;
}

/* ── HEADER NAV ── */
.r-nav {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: min(1460px, calc(100% - 32px));
  background: linear-gradient(180deg, rgba(18,10,7,0.74), rgba(8,4,3,0.56));
  -webkit-backdrop-filter: blur(18px) saturate(1.25);
  backdrop-filter: blur(18px) saturate(1.25);
  border: 1px solid rgba(212,160,23,0.18);
  box-shadow:
    0 18px 45px rgba(0,0,0,0.42),
    inset 0 1px 0 rgba(245,230,200,0.08);
  border-radius: 8px;
  padding: 10px 24px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px;
}
.r-nav-brand { display: flex; align-items: center; gap: 14px; min-width: 0; }
.r-glyph {
  width: 30px; height: 30px;
  display: grid; place-items: center;
  color: var(--r-fire);
  flex-shrink: 0;
}
.r-nav-name {
  font-family: 'Cinzel', serif;
  font-size: 13px; letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--r-parchment);
  white-space: nowrap;
}
.r-nav-words {
  font-family: 'Cinzel', serif;
  font-style: italic; font-size: 11px;
  color: var(--r-gold-soft);
  letter-spacing: 0.18em;
  border-left: 1px solid var(--r-rule);
  padding-left: 14px;
  text-transform: uppercase;
  white-space: nowrap;
}
.r-nav-links { display: flex; gap: 2px; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; }
.r-nav-link {
  padding: 8px 14px;
  color: var(--r-text-2);
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: all 0.2s;
  background: none;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
}
.r-nav-link:hover { color: var(--r-parchment); }
.r-nav-link.active {
  color: var(--r-fire-bright);
  border-color: var(--r-rule-fire);
  background: rgba(192,57,43,0.12);
}
.r-nav-cta {
  font-family: 'Cinzel', serif;
  font-size: 11px; letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 9px 20px;
  border: 1px solid var(--r-rule-strong);
  color: var(--r-gold);
  background: rgba(192,57,43,0.08);
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.2s;
  white-space: nowrap;
  text-decoration: none;
  display: inline-block;
}
.r-nav-cta:hover { background: rgba(192,57,43,0.22); color: var(--r-parchment); border-color: var(--r-fire); }

/* ── HERO — atmospheric ── */
.r-hero {
  min-height: 100svh;
  flex-shrink: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 106px 32px 32px;
  position: relative;
  background:
    radial-gradient(ellipse at 50% 35%, rgba(192,57,43,0.12), transparent 55%),
    radial-gradient(ellipse at 50% 85%, rgba(0,0,0,0.65), transparent 60%),
    linear-gradient(180deg, var(--r-bg-deep), var(--r-bg));
  overflow: hidden;
}

.r-hero::before {
  content: '';
  position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(ellipse at center,
    transparent 30%,
    rgba(0,0,0,0.45) 65%,
    rgba(0,0,0,0.92) 100%);
  pointer-events: none;
}

/* Breathing sigil ring */
.r-sigil-ring {
  position: absolute; top: 53%; left: 50%;
  transform: translate(-50%, -50%);
  width: min(96vmin, 900px); height: min(96vmin, 900px);
  border-radius: 50%;
  border: 1px solid rgba(120,30,15,0.18);
  box-shadow:
    inset 0 0 100px rgba(100,20,10,0.22),
    0 0 60px rgba(100,20,10,0.14),
    0 0 180px rgba(80,15,5,0.08);
  animation: r-dragon-ring-breathe 6.4s cubic-bezier(0.37, 0, 0.22, 1) infinite;
  pointer-events: none; z-index: 0;
}
.r-sigil-ring-inner {
  position: absolute; top: 53%; left: 50%;
  transform: translate(-50%, -50%);
  width: min(68vmin, 650px); height: min(68vmin, 650px);
  border-radius: 50%;
  border: 1px solid rgba(212,160,23,0.12);
  pointer-events: none; z-index: 0;
}
@keyframes r-dragon-ring-breathe {
  0%, 100% {
    opacity: 0.42;
    transform: translate(-50%,-50%) scale(0.94);
    box-shadow:
      inset 0 0 80px rgba(100,20,10,0.20),
      0 0 46px rgba(100,20,10,0.12),
      0 0 150px rgba(80,15,5,0.06);
  }
  38% {
    opacity: 0.92;
    transform: translate(-50%,-50%) scale(1.025);
    box-shadow:
      inset 0 0 155px rgba(130,25,12,0.42),
      0 0 115px rgba(120,22,10,0.26),
      0 0 245px rgba(90,15,5,0.14);
  }
  55% {
    opacity: 1;
    transform: translate(-50%,-50%) scale(1.045);
  }
}

.r-sigil {
  position: absolute; top: 53%; left: 50%;
  transform: translate(-50%, -50%);
  width: min(62vmin, 520px); height: min(62vmin, 520px);
  color: #f02424;
  opacity: 0.42;
  pointer-events: none; z-index: 1;
  transform-origin: center;
  filter:
    drop-shadow(0 0 24px rgba(192,57,43,0.18))
    drop-shadow(0 0 60px rgba(120,10,0,0.12));
  animation: r-dragon-sigil-breathe 6.4s cubic-bezier(0.37, 0, 0.22, 1) infinite;
}
.r-sigil-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
  background: transparent;
  mix-blend-mode: normal;
  user-select: none;
}
@keyframes r-dragon-sigil-breathe {
  0%, 100% {
    transform: translate(-50%,-50%) scale(0.92) rotate(-0.35deg);
    opacity: 0.34;
    filter:
      drop-shadow(0 0 20px rgba(192,57,43,0.14))
      drop-shadow(0 0 46px rgba(100,0,0,0.10));
  }
  34% {
    transform: translate(-50%,-50%) scale(1.035) rotate(0.25deg);
    opacity: 0.72;
    filter:
      drop-shadow(0 0 56px rgba(192,57,43,0.30))
      drop-shadow(0 0 120px rgba(140,0,0,0.16))
      drop-shadow(0 0 180px rgba(70,0,0,0.10));
  }
  48% {
    transform: translate(-50%,-50%) scale(1.055) rotate(0deg);
    opacity: 0.86;
  }
  72% {
    transform: translate(-50%,-50%) scale(0.985) rotate(-0.15deg);
    opacity: 0.50;
  }
}

.r-hero-inner {
  position: relative; z-index: 3;
  display: flex; flex-direction: column;
  align-items: center; gap: clamp(10px, 1.9vh, 18px);
  text-align: center;
  width: min(100%, 820px);
  max-width: 820px;
}

.r-hero-house {
  font-family: 'Cinzel', serif;
  font-size: clamp(9px, 0.9vw, 11px);
  letter-spacing: 0.65em;
  color: var(--r-gold);
  text-transform: uppercase;
  text-shadow: none;
  animation: r-fade-up 0.7s ease forwards 0.1s;
  opacity: 0;
}

.r-hero-title {
  font-family: 'Cinzel Decorative', serif;
  font-size: clamp(28px, 6.8vw, 88px);
  font-weight: 700;
  line-height: 1.0;
  color: var(--r-parchment);
  letter-spacing: 0.02em;
  margin: 0;
  text-shadow: 0 3px 18px rgba(0,0,0,0.98);
  animation: r-fade-up 0.7s ease forwards 0.2s;
  opacity: 0;
}

.r-hero-subtitle {
  font-family: 'EB Garamond', serif;
  font-size: clamp(15px, 1.55vw, 20px);
  font-style: italic;
  font-weight: 400;
  color: var(--r-text-2);
  letter-spacing: 0.06em;
  margin: 2px 0 0;
  text-shadow: 0 1px 8px rgba(0,0,0,0.85);
  animation: r-fade-up 0.7s ease forwards 0.3s;
  opacity: 0;
}

.r-hero-lore {
  display: flex; flex-direction: column; gap: 10px;
  width: min(100%, 780px);
  margin-top: 10px;
  animation: r-fade-up 0.7s ease forwards 0.42s;
  opacity: 0;
}

.r-lore-name {
  font-family: 'Cinzel', serif;
  font-size: clamp(20px, 2.1vw, 26px);
  font-weight: 700;
  color: var(--r-parchment);
  letter-spacing: 0.32em;
  text-transform: uppercase;
  text-shadow: 0 2px 10px rgba(0,0,0,0.9);
}
.r-lore-epithets {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: clamp(14px, 1.35vw, 16px);
  color: var(--r-text-2);
  line-height: 1.5;
  letter-spacing: 0.01em;
}
.r-lore-aside {
  font-style: normal;
  color: var(--r-text-3);
  font-size: 0.88em;
  letter-spacing: 0.02em;
}

.r-hero-stats {
  display: flex; align-items: center;
  margin-top: 8px;
  animation: r-fade-up 0.7s ease forwards 0.58s;
  opacity: 0;
  flex-wrap: wrap;
  justify-content: center;
}
.r-hero-stat { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 0 28px; white-space: nowrap; }
.r-hero-stat-val {
  font-family: 'Cinzel', serif;
  font-size: clamp(20px, 2.1vw, 27px);
  font-weight: 700;
  color: var(--r-gold);
  line-height: 1;
  text-shadow: 0 1px 6px rgba(0,0,0,0.8);
}
.r-hero-stat-lbl {
  font-family: 'Cinzel', serif;
  font-size: 9px; letter-spacing: 0.32em;
  text-transform: uppercase; color: var(--r-text-3);
}
.r-hero-stat-sep { width: 1px; height: 28px; background: rgba(212,160,23,0.18); }

.r-hero-cue {
  display: flex; align-items: center; gap: 10px;
  font-family: 'Cinzel', serif;
  font-size: 9px; letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
  margin-top: 10px;
  animation: r-scroll-cue 2.5s ease-in-out infinite;
}
@keyframes r-scroll-cue {
  0%, 100% { opacity: 0.25; transform: translateY(0); }
  50% { opacity: 0.75; transform: translateY(6px); }
}
@keyframes r-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-height: 820px) and (min-width: 901px) {
  .r-nav { top: 14px; padding-top: 9px; padding-bottom: 9px; }
  .r-hero { padding-top: 88px; padding-bottom: 24px; }
  .r-hero-title { font-size: clamp(32px, 6.2vw, 76px); }
  .r-hero-subtitle { font-size: clamp(13px, 1.4vw, 18px); }
  .r-hero-lore { padding-top: 10px; padding-bottom: 10px; }
  .r-lore-name { font-size: clamp(17px, 1.9vw, 23px); }
  /* season-inner top padding is set dynamically via --season-pad-top */
  .r-hero-cue { display: none; }
}

/* ── DIVIDER ── */
.r-divider {
  display: flex; align-items: center; gap: 18px;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 32px;
}
.r-divider::before, .r-divider::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, var(--r-rule-strong), transparent);
}
.r-divider span {
  color: var(--r-fire);
  font-size: 13px;
  text-shadow: 0 0 14px rgba(192,57,43,0.6);
}

/* ── SEASON ── */
.r-season {
  min-height: 100svh;
  flex-shrink: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
  position: relative;
}
.r-season-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.32;
  z-index: 0;
  animation: r-season-pan 40s ease-in-out infinite alternate;
}
@keyframes r-season-pan {
  from { transform: translateX(-0.8%); }
  to   { transform: translateX(0.8%); }
}
.r-season::before {
  content: '';
  position: absolute; inset: 0; z-index: 1;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(192,57,43,0.12), transparent 45%),
    linear-gradient(180deg, var(--r-bg) 0%, transparent 18%, transparent 82%, var(--r-bg) 100%);
  pointer-events: none;
}
.r-season-inner {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: var(--season-pad-top, 76px) clamp(16px, 4vw, 56px) 40px;
  scrollbar-width: thin;
  scrollbar-color: rgba(192,57,43,0.2) transparent;
  position: relative;
  z-index: 2;
  box-sizing: border-box;
}
.r-season-inner::-webkit-scrollbar { width: 3px; }
.r-season-inner::-webkit-scrollbar-thumb { background: rgba(192,57,43,0.2); border-radius: 2px; }
.r-season-header { padding: 0 0 10px; position: relative; }
.r-season-number {
  font-family: 'Cinzel', serif;
  font-size: 11px; letter-spacing: 0.4em;
  color: var(--r-fire); text-transform: uppercase;
  margin-bottom: 12px;
  display: flex; align-items: center; gap: 14px;
}
.r-season-number::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg, var(--r-rule-fire), transparent);
}
.r-season-title {
  font-family: 'Cinzel Decorative', serif;
  font-size: clamp(18px, 4vw, 44px);
  font-weight: 700;
  color: var(--r-parchment);
  margin: 0 0 12px;
  line-height: 1.15;
  text-shadow: 0 0 30px rgba(192,57,43,0.2);
}
.r-season-lore {
  font-style: italic;
  font-size: 17px;
  color: var(--r-text-2);
  max-width: 640px;
  line-height: 1.6;
  position: relative;
  padding-left: 16px;
  border-left: 2px solid var(--r-rule-fire);
}

/* ── CARDS ── */
.r-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 14px;
  padding: 8px 0 20px;
  width: 100%;
}
/* 1 card → centred, capped width */
.r-cards[data-count="1"] {
  grid-template-columns: minmax(min(100%, 260px), 420px);
  justify-content: center;
}
/* 4 cards → 2×2 */
.r-cards[data-count="4"] {
  grid-template-columns: repeat(2, 1fr);
}
/* 5 cards → 3 top, 2 centred bottom (all equal width via 6-col base) */
.r-cards[data-count="5"] {
  grid-template-columns: repeat(6, 1fr);
}
.r-cards[data-count="5"] .r-card {
  grid-column: span 2;
}
.r-cards[data-count="5"] .r-card:nth-child(4) {
  grid-column: 2 / span 2;
}
.r-cards[data-count="5"] .r-card:nth-child(5) {
  grid-column: 4 / span 2;
}
.r-card {
  background: rgba(255,255,255,0.025);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 22px 22px 18px;
  cursor: pointer;
  transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s, background 0.2s, border-color 0.2s;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 4px 20px rgba(0,0,0,0.35);
  display: flex; flex-direction: column; gap: 12px;
  position: relative; overflow: hidden;
}
.r-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
  pointer-events: none;
}
.r-card:hover {
  background: rgba(255,255,255,0.055);
  border-color: rgba(192,57,43,0.35);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 36px rgba(0,0,0,0.55), 0 0 24px rgba(192,57,43,0.1);
}
.r-card-top {
  display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;
}
.r-card-duration {
  font-family: 'Cinzel', serif;
  font-size: 11px; letter-spacing: 0.12em;
  color: var(--r-fire-gold);
}
.r-card-type {
  font-family: 'Cinzel', serif;
  font-size: 9px; letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--r-text-3);
  text-align: right; line-height: 1.4;
}
.r-card-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(13px, 1.25vw, 16px);
  color: var(--r-parchment);
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.35;
  transition: color 0.2s;
}
.r-card:hover .r-card-title { color: var(--r-fire-gold); }
.r-card-tags { display: flex; gap: 5px; flex-wrap: wrap; }
.r-tag {
  font-family: 'Cinzel', serif;
  font-size: 9px; letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--r-text-2);
  padding: 3px 8px;
  border: 1px solid var(--r-rule);
  border-radius: 3px;
  white-space: nowrap;
}
.r-tag.fire {
  color: var(--r-fire-bright);
  border-color: var(--r-rule-fire);
  background: rgba(192,57,43,0.08);
}
.r-card-impact {
  display: flex; align-items: baseline; gap: 8px;
  padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,0.06);
  margin-top: auto;
}
.r-card-impact-val {
  font-family: 'Cinzel', serif;
  font-size: 17px; font-weight: 700;
  color: var(--r-fire-bright); line-height: 1;
}
.r-card-impact-lbl {
  font-size: 9px; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--r-text-3);
}

/* ── MODAL ── */
.r-modal-overlay {
  position: fixed; inset: 0; z-index: 1100;
  background: rgba(0,0,0,0.72);
  backdrop-filter: blur(12px) saturate(80%);
  -webkit-backdrop-filter: blur(12px) saturate(80%);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  cursor: pointer;
  animation: r-fade-in 0.2s ease;
}
@keyframes r-fade-in { from { opacity: 0; } to { opacity: 1; } }
.r-modal {
  cursor: default;
  position: relative;
  width: min(860px, 100%);
  max-height: 86vh;
  overflow-y: auto;
  border-radius: 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(100,50,10,0.35) transparent;
  transform-origin: center center;
  /* Real parchment photo */
  background-color: #c9a878;
  background-image: url('${window.__resources.parchmentBg}');
  background-size: cover;
  background-position: center center;
  border-top: 1px solid rgba(72,44,8,0.45);
  border-left: 1px solid rgba(72,44,8,0.22);
  border-right: 1px solid rgba(72,44,8,0.22);
  border-bottom: 1px solid rgba(72,44,8,0.22);
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.28),
    0 32px 100px rgba(0,0,0,0.85),
    0 0 60px rgba(192,57,43,0.08),
    inset 0 1px 0 rgba(248,235,200,0.30);
  animation: r-modal-unfold 0.45s cubic-bezier(0.34,1.2,0.64,1);
}
@keyframes r-modal-unfold {
  0%   { transform: scaleY(0.04); opacity: 0.85; }
  55%  { transform: scaleY(1.025); opacity: 1; }
  100% { transform: scaleY(1); opacity: 1; }
}
.r-modal::-webkit-scrollbar { width: 3px; }
.r-modal::-webkit-scrollbar-thumb { background: rgba(100,50,10,0.35); border-radius: 2px; }
/* Scroll-top seal bar */
.r-modal::before {
  content: '⚜';
  position: sticky; top: 0; left: 0; right: 0;
  display: block;
  text-align: center;
  font-size: 18px;
  color: rgba(90,52,12,0.72);
  background: linear-gradient(180deg, rgba(205,172,115,0.99) 0%, rgba(205,172,115,0.82) 65%, transparent 100%);
  padding: 10px 0 6px;
  letter-spacing: 0.4em;
  pointer-events: none;
  z-index: 4;
}
.r-modal-close {
  position: sticky; top: 14px; left: 100%;
  float: right;
  margin: -32px 16px 0 0;
  background: rgba(30,12,2,0.14);
  border: 1px solid rgba(60,28,5,0.45);
  border-radius: 2px;
  width: 30px; height: 30px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #1c0d04;
  font-size: 12px; z-index: 10;
  transition: background 0.2s, color 0.2s;
  font-family: 'Cinzel', serif;
}
.r-modal-close:hover { background: rgba(30,12,2,0.28); color: #0a0402; }
.r-modal-header {
  padding: 8px 52px 18px 32px;
  border-bottom: 1px solid rgba(80,35,5,0.22);
  position: relative;
}
.r-modal-header::after {
  content: '';
  position: absolute; bottom: -1px; left: 32px; right: 32px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(120,50,5,0.45), transparent);
}
.r-modal-season {
  font-family: 'Cinzel', serif;
  font-size: 10px; letter-spacing: 0.45em;
  text-transform: uppercase; color: #5a1208;
  margin-bottom: 10px;
}
.r-modal-title {
  font-family: 'Cinzel Decorative', serif;
  font-size: clamp(17px, 2.2vw, 24px);
  color: #0f0603; margin: 0;
  font-weight: 700; line-height: 1.25;
}
.r-modal-body {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 36px;
  padding: 24px 32px 44px;
}
.r-modal-side { display: flex; flex-direction: column; gap: 0; }
.r-scroll-lore {
  font-style: italic; color: #2a1206;
  font-size: 15px; line-height: 1.55;
  padding: 16px 18px; border: 1px solid rgba(80,35,5,0.28);
  background: rgba(30,12,2,0.09); margin-bottom: 1px;
  position: relative;
}
.r-scroll-lore::before {
  content: '”'; position: absolute; top: 0; left: 8px;
  font-family: 'Cinzel Decorative', serif; color: var(--r-fire);
  font-size: 28px; line-height: 1;
}
.r-scroll-lore-content { padding-top: 4px; }
.r-scroll-metrics {
  display: grid; grid-template-columns: 1fr;
  gap: 1px; background: rgba(80,35,5,0.22);
  border: 1px solid rgba(80,35,5,0.22);
}
.r-scroll-metric {
  background: rgba(255,240,180,0.35);
  padding: 12px 16px;
  display: flex; flex-direction: column; gap: 3px;
}
.r-scroll-metric-val {
  font-family: 'Cinzel', serif;
  font-size: 18px; font-weight: 700;
  color: #c0392b; line-height: 1;
}
.r-scroll-metric-lbl {
  font-size: 9px; letter-spacing: 0.16em;
  text-transform: uppercase; color: #4a2608;
}
.r-scroll-body { min-width: 0; }
.r-scroll-section { margin-bottom: 26px; }
.r-scroll-section-title {
  font-family: 'Cinzel', serif;
  font-size: 11px; letter-spacing: 0.22em;
  text-transform: uppercase; color: #3a1c06;
  margin-bottom: 10px;
  display: flex; align-items: center; gap: 10px;
}
.r-scroll-section-title::before { content: '⚔'; color: var(--r-fire); font-size: 13px; }
.r-scroll-text {
  font-size: 16px; line-height: 1.75;
  color: #1c0d04; margin: 0;
}
.r-scroll-link {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'Cinzel', serif;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
  color: #c0392b; text-decoration: none;
  border: 1px solid rgba(192,57,43,0.45); padding: 10px 18px; margin-top: 16px;
  transition: all 0.2s;
}
.r-scroll-link:hover { background: rgba(192,57,43,0.15); color: #100804; }

/* ── OATH / CONTACT ── */
.r-oath {
  min-height: 100svh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  padding: 92px 32px 80px;
  text-align: center;
  position: relative;
  border-top: 1px solid var(--r-rule);
  overflow: hidden;
  isolation: isolate;
  background: var(--r-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/* Immersive battle backdrop — recolored sword-and-riders image */
.r-oath-bg {
  position: absolute;
  inset: 0;
  background: url('${window.__resources.oathBg}') center 30% / cover no-repeat;
  opacity: 0.58;
  z-index: 0;
  animation: r-oath-pan 30s ease-in-out infinite alternate;
}
@keyframes r-oath-pan {
  from { transform: scale(1.05) translateX(-1.5%); }
  to   { transform: scale(1.10) translateX(1.5%);  }
}
/* Vignette overlay — keeps text legible over the image */
.r-oath::before {
  content: '';
  position: absolute; inset: 0; z-index: 1;
  background:
    radial-gradient(ellipse 65% 55% at 50% 52%, transparent 0%, rgba(10,6,4,0.45) 35%, rgba(10,6,4,0.92) 80%),
    radial-gradient(ellipse at 50% 0%, rgba(192,57,43,0.28), transparent 55%),
    linear-gradient(180deg, var(--r-bg) 0%, transparent 14%, transparent 86%, var(--r-bg) 100%);
  pointer-events: none;
}
/* “Fire cannot kill a dragon” floating quote, top */
.r-oath::after {
  content: '” Fire cannot kill a dragon. “';
  position: absolute; top: 80px; left: 50%;
  transform: translateX(-50%);
  font-style: italic; font-size: clamp(11px, 1.1vw, 13px);
  color: var(--r-gold-soft); letter-spacing: 0.18em;
  white-space: nowrap;
  z-index: 3;
  text-shadow: 0 2px 14px rgba(0,0,0,0.95);
}
.r-oath > *:not(.r-oath-bg):not(.r-foot) { position: relative; z-index: 2; }
.r-oath-title {
  font-family: 'Cinzel Decorative', serif;
  font-size: clamp(22px, 3.7vw, 42px);
  color: var(--r-parchment);
  margin: 0 0 14px;
  line-height: 1.18;
  font-weight: 700;
  text-shadow: 0 2px 18px rgba(0,0,0,0.95), 0 0 40px rgba(192,57,43,0.3);
  white-space: pre-line;
}
.r-oath-text {
  font-style: italic;
  font-size: clamp(16px, 1.6vw, 18px);
  color: var(--r-parchment);
  max-width: 560px;
  margin: 0 auto 28px;
  line-height: 1.45;
  text-shadow: 0 2px 12px rgba(0,0,0,0.9);
}
.r-oath-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  width: min(860px, 100%);
  margin: 0 auto;
}
.r-oath-link {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px;
  text-decoration: none;
  padding: 26px 30px;
  border-radius: 2px;
  position: relative;
  /* Very low density frost */
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(5px) saturate(110%);
  -webkit-backdrop-filter: blur(5px) saturate(110%);
  border: 1px solid rgba(255,255,255,0.08);
  border-top: 1px solid rgba(255,255,255,0.13);
  box-shadow: 0 4px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06);
  transition: background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}
.r-oath-link:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(212,160,23,0.22);
  border-top-color: rgba(212,160,23,0.35);
  box-shadow: 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(212,160,23,0.10);
}
.r-oath-link-label {
  font-family: 'Cinzel', serif;
  font-size: clamp(10px, 0.95vw, 12px);
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--r-gold);
  font-weight: 700;
}
.r-oath-link-value {
  font-family: 'EB Garamond', Georgia, serif;
  font-style: italic;
  font-size: clamp(13px, 1.15vw, 15px);
  color: var(--r-text-2);
  letter-spacing: 0.02em;
}

@media (max-height: 820px) and (min-width: 901px) {
  .r-oath { padding-top: 78px; padding-bottom: 70px; }
  .r-oath::after { top: 76px; }
  .r-oath-title { font-size: clamp(24px, 3.2vw, 36px); margin-bottom: 10px; }
  .r-oath-text { margin-bottom: 20px; line-height: 1.35; }
  .r-oath-link { padding: 18px 20px; }
}

.r-foot {
  position: absolute; bottom: 0; left: 0; right: 0;
  z-index: 3;
  border-top: 1px solid var(--r-rule);
  padding: 18px 32px;
  display: flex; justify-content: space-between; align-items: center;
  font-family: 'Cinzel', serif;
  font-size: 11px; letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--r-text-3);
  background: linear-gradient(0deg, var(--r-bg) 70%, transparent);
}
.r-foot-left { text-align: left; }
.r-foot-words { color: var(--r-fire); text-align: right; }

@media (max-width: 900px) {
  .r-nav {
    top: 10px;
    width: calc(100% - 20px);
    padding: 10px 14px;
    gap: 12px;
  }
  .r-nav-links, .r-nav-words { display: none; }
  .r-nav-name { font-size: 11px; letter-spacing: 0.2em; }
  .r-nav-cta { padding: 9px 12px; font-size: 10px; letter-spacing: 0.14em; }
  .r-hero { padding: 88px 16px 28px; }
  .r-hero-lore { padding: 12px 12px; }
  .r-hero-title { font-size: clamp(26px, 7.5vw, 60px); }
  .r-lore-name { font-size: clamp(15px, 4.2vw, 22px); letter-spacing: 0.18em; }
  .r-lore-epithets { font-size: clamp(13px, 3.5vw, 16px); }
  .r-season-inner { padding-right: 16px; padding-bottom: 32px; padding-left: 16px; }
  .r-season-title { font-size: clamp(18px, 5.5vw, 40px); }
  .r-season-lore { font-size: 15px; }
  .r-cards { grid-template-columns: 1fr; gap: 12px; }
  .r-cards[data-count="4"],
  .r-cards[data-count="5"] { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .r-cards[data-count="5"] .r-card,
  .r-cards[data-count="5"] .r-card:nth-child(4),
  .r-cards[data-count="5"] .r-card:nth-child(5) { grid-column: span 1; }
  .r-modal-overlay { padding: 0; align-items: flex-end; }
  .r-modal {
    width: 100%; max-height: 92vh;
    border-radius: 16px 16px 0 0;
    animation: r-modal-in-mobile 0.32s cubic-bezier(0.34,1.4,0.64,1);
  }
  @keyframes r-modal-in-mobile {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .r-modal-header { padding: 24px 48px 16px 18px; }
  .r-modal-body { grid-template-columns: 1fr; gap: 20px; padding: 18px 18px 36px; }
  .r-hero-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    width: min(100%, 420px);
    margin: 0 auto;
    justify-items: center;
  }
  .r-hero-stat { padding: 6px 0; }
  .r-hero-stat-sep { display: none; }
  .r-oath { min-height: 100svh; padding: 78px 16px 70px; }
  .r-oath::after {
    top: 76px;
    max-width: calc(100% - 32px);
    white-space: normal;
    line-height: 1.35;
    text-align: center;
  }
  .r-oath-title { font-size: clamp(18px, 6vw, 28px); }
  .r-oath-text { font-size: clamp(14px, 3.8vw, 18px); margin-bottom: 20px; }
  .r-oath-links { grid-template-columns: 1fr; width: 100%; }
  .r-oath-link { padding: 14px 16px; }
  .r-foot {
    flex-direction: column;
    gap: 4px;
    padding: 12px 16px;
    font-size: 9px;
    letter-spacing: 0.14em;
  }
  .r-foot-left, .r-foot-words { text-align: center; }
  .r-season-bg { background-size: cover; }
}

/* ── PHONE (iPhone 14/15 Pro, S24, S25 — ≤480px) ── */
@media (max-width: 480px) {
  .r-nav { padding: 8px 10px; gap: 8px; }
  .r-nav-name { font-size: 10px; letter-spacing: 0.14em; }
  .r-nav-cta { padding: 7px 10px; font-size: 9px; letter-spacing: 0.1em; }

  .r-hero { padding: 76px 12px 20px; }
  .r-hero-title { font-size: clamp(22px, 7.2vw, 40px); }
  .r-hero-house { font-size: 8px; letter-spacing: 0.3em; }
  .r-hero-subtitle { font-size: clamp(13px, 3.8vw, 16px); }
  .r-hero-lore { padding: 10px 8px; margin-top: 6px; }
  .r-lore-name { font-size: clamp(13px, 4vw, 18px); letter-spacing: 0.12em; }
  .r-lore-epithets { font-size: 12px; }
  .r-hero-stat-val { font-size: clamp(14px, 4vw, 20px); }
  .r-hero-stat-lbl { font-size: 7px; letter-spacing: 0.32em; }
  .r-hero-cue { font-size: 8px; letter-spacing: 0.3em; margin-top: 6px; }
  .r-hero-stats {
    width: min(100%, 320px);
    margin: 0 auto;
  }

  .r-season-inner { padding-right: 12px; padding-bottom: 24px; padding-left: 12px; }
  .r-season-title { font-size: clamp(16px, 5.5vw, 28px); }
  .r-season-lore { font-size: 13px; padding-left: 12px; }
  .r-season-number { font-size: 10px; }

  .r-card { padding: 14px 12px 10px; border-radius: 12px; }
  .r-card-title { font-size: clamp(11px, 3.2vw, 14px); }
  .r-card-duration { font-size: 9px; }
  .r-card-impact-val { font-size: 14px; }

  .r-cards[data-count="4"],
  .r-cards[data-count="5"] {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    width: 100%;
  }

  .r-hero-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    width: min(100%, 320px);
    margin: 0 auto;
    justify-items: center;
  }
  .r-hero-stat { padding: 8px 0; }
  .r-hero-stat-sep { display: none; }

  .r-modal-header { padding: 18px 44px 12px 14px; }
  .r-modal-body { padding: 14px 14px 28px; gap: 14px; }
  .r-scroll-text { font-size: 14px; }
  .r-scroll-metric-val { font-size: 15px; }
  .r-scroll-section-title { font-size: 10px; }

  .r-oath { padding: 70px 12px 60px; }
  .r-oath::after { top: 68px; font-size: 10px; letter-spacing: 0.12em; }
  .r-oath-title { font-size: clamp(16px, 5.5vw, 22px); line-height: 1.25; }
  .r-oath-text { font-size: 13px; }
  .r-oath-link { padding: 12px 14px; }
  .r-oath-link-label { font-size: 9px; letter-spacing: 0.22em; }
  .r-oath-link-value { font-size: 12px; }

  .r-foot { font-size: 8px; letter-spacing: 0.1em; padding: 10px 12px; }
}

@media (min-width: 901px) and (max-width: 1200px) {
  .r-cards { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
}

/* ── SECTION ENTRY ANIMATIONS ── */
@keyframes r-entry-up {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes r-entry-left {
  from { opacity: 0; transform: translateX(-26px); }
  to   { opacity: 1; transform: translateX(0); }
}

.r-season .r-season-number,
.r-season .r-season-title,
.r-season .r-season-lore { opacity: 0; }

.r-season--entered .r-season-number {
  animation: r-entry-left 0.5s cubic-bezier(0.22,1,0.36,1) both;
}
.r-season--entered .r-season-title {
  animation: r-entry-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both;
}
.r-season--entered .r-season-lore {
  animation: r-entry-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.22s both;
}

/* Cards use transitions (not animations) so JS inline transform can override them */
.r-season .r-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1);
}
.r-season--entered .r-card { opacity: 1; transform: translateY(0); }
.r-season--entered .r-card:nth-child(1) { transition-delay: 0.32s; }
.r-season--entered .r-card:nth-child(2) { transition-delay: 0.42s; }
.r-season--entered .r-card:nth-child(3) { transition-delay: 0.52s; }
.r-season--entered .r-card:nth-child(4) { transition-delay: 0.57s; }
.r-season--entered .r-card:nth-child(5) { transition-delay: 0.62s; }

.r-oath .r-oath-title,
.r-oath .r-oath-text { opacity: 0; }

.r-oath--entered .r-oath-title {
  animation: r-entry-up 0.6s cubic-bezier(0.22,1,0.36,1) both;
}
.r-oath--entered .r-oath-text {
  animation: r-entry-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.15s both;
}

/* Oath links also use transitions for the same reason */
.r-oath .r-oath-link {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1);
}
.r-oath--entered .r-oath-link { opacity: 1; transform: translateY(0); }
.r-oath--entered .r-oath-link:nth-child(1) { transition-delay: 0.30s; }
.r-oath--entered .r-oath-link:nth-child(2) { transition-delay: 0.40s; }
.r-oath--entered .r-oath-link:nth-child(3) { transition-delay: 0.50s; }
.r-oath--entered .r-oath-link:nth-child(4) { transition-delay: 0.60s; }
`;

/* ── Heraldic sigil — original abstract flame medallion ───────────
 * NOT a recreation of any copyrighted dragon sigil. Concentric rings
 * + radiating flames + central diamond eye — reads as ancient heraldry. */
function RefinedSigil({ size = 32, color = "currentColor", detailed = false }) {
  if (!detailed) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="14.5" stroke={color} strokeWidth="0.8" opacity="0.7"/>
        <circle cx="16" cy="16" r="10"   stroke={color} strokeWidth="0.5" opacity="0.4"/>
        <path d="M16 7 L20.5 16 L16 14 L11.5 16 Z" fill={color}/>
        <path d="M16 14 L18.5 22 L16 20 L13.5 22 Z" fill={color} opacity="0.7"/>
        <circle cx="16" cy="16" r="1" fill={color}/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="0.6" opacity="0.45"/>
      <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="1.4" opacity="0.85"/>
      <circle cx="100" cy="100" r="82" stroke={color} strokeWidth="0.4" opacity="0.4"/>
      {[0, 90, 180, 270].map(deg => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <path d="M100 14 L106 36 L100 30 L94 36 Z" fill={color} opacity="0.95"/>
          <path d="M100 30 L103 44 L100 40 L97 44 Z" fill={color} opacity="0.6"/>
        </g>
      ))}
      {[45, 135, 225, 315].map(deg => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <path d="M100 22 L104 38 L100 34 L96 38 Z" fill={color} opacity="0.55"/>
        </g>
      ))}
      <circle cx="100" cy="100" r="55" stroke={color} strokeWidth="0.7" opacity="0.6"/>
      <circle cx="100" cy="100" r="48" stroke={color} strokeWidth="0.3" opacity="0.3"/>
      <path d="M100 60 L138 100 L100 140 L62 100 Z" fill="none" stroke={color} strokeWidth="1.2" opacity="0.9"/>
      <path d="M100 72 L128 100 L100 128 L72 100 Z" fill={color} opacity="0.15"/>
      <path d="M100 84 L116 100 L100 116 L84 100 Z" fill={color} opacity="0.95"/>
      <circle cx="100" cy="100" r="3.5" fill="#0a0604"/>
      <circle cx="100" cy="100" r="1.5" fill={color}/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <rect x="99.5" y="49" width="1" height="6" fill={color} opacity="0.6"/>
        </g>
      ))}
    </svg>
  );
}

function Tag({ tag }) {
  if (typeof tag === 'string') return <span className="r-tag">{tag}</span>;
  return <span className={`r-tag ${tag.fire ? 'fire' : ''}`}>{tag.label}</span>;
}

function Card({ track, data, onOpen }) {
  const cs = data.caseStudies[track.id];
  const metric = cs?.metrics?.[0];
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transition = 'box-shadow 0.25s, background 0.2s, border-color 0.2s';
    card.style.transform = `perspective(700px) rotateX(${y * -12}deg) rotateY(${x * 12}deg) scale(1.04) translateY(-3px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s, background 0.2s, border-color 0.2s';
    card.style.transform = '';
  };

  const handleOpen = () => {
    onOpen(track.id);
    window.umami?.track('case_study_open', { id: track.id, title: track.title });
  };
  return (
    <div ref={cardRef} className="r-card" onClick={handleOpen} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="r-card-top">
        <span className="r-card-type">{track.type}</span>
      </div>
      <h3 className="r-card-title">{track.title}</h3>
      <div className="r-card-tags">
        {track.tags.map((t, i) => <Tag key={i} tag={t} />)}
      </div>
      {metric && (
        <div className="r-card-impact">
          <span className="r-card-impact-val">{metric.val}</span>
          <span className="r-card-impact-lbl">{metric.lbl}</span>
        </div>
      )}
    </div>
  );
}

function Modal({ id, data, onClose }) {
  const cs = id ? data.caseStudies[id] : null;
  const reached = useRef(new Set());

  useEffect(() => { reached.current = new Set(); }, [id]);

  useEffect(() => {
    if (!id) return;
    const opened = Date.now();
    return () => {
      const seconds = Math.round((Date.now() - opened) / 1000);
      if (seconds >= 2) window.umami?.track('case_study_time', { id, seconds });
    };
  }, [id]);

  if (!id || !cs) return null;

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const total = el.scrollHeight - el.clientHeight;
    if (total <= 0) return;
    const pct = Math.round((el.scrollTop / total) * 100);
    for (const threshold of [50, 100]) {
      if (pct >= threshold && !reached.current.has(threshold)) {
        reached.current.add(threshold);
        window.umami?.track('case_study_scroll', { id, depth_pct: threshold });
      }
    }
  };

  return (
    <div className="r-modal-overlay" onClick={onClose}>
      <div className="r-modal" onClick={e => e.stopPropagation()} onScroll={handleScroll}>
        <button className="r-modal-close" onClick={onClose}>✕</button>
        <div className="r-modal-header">
          <div className="r-modal-season">{cs.season}</div>
          <h2 className="r-modal-title">{cs.title}</h2>
        </div>
        <div className="r-modal-body">
          <aside className="r-modal-side">
            <div className="r-scroll-lore">
              <div className="r-scroll-lore-content">{cs.lore}</div>
            </div>
            <div className="r-scroll-metrics">
              {cs.metrics.map((m, i) => (
                <div key={i} className="r-scroll-metric">
                  <div className="r-scroll-metric-val">{m.val}</div>
                  <div className="r-scroll-metric-lbl">{m.lbl}</div>
                </div>
              ))}
            </div>
            {cs.link && (
              <a className="r-scroll-link" href={cs.link} target="_blank" rel="noreferrer"
                 data-umami-event="realm_link_click" data-umami-event-id={id}>
                Visit the Realm →
              </a>
            )}
          </aside>
          <div className="r-scroll-body">
            {cs.sections.map((s, i) => (
              <div key={i} className="r-scroll-section">
                <div className="r-scroll-section-title">{s.title}</div>
                <p className="r-scroll-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSigil() {
  return (
    <img
      className="r-sigil-img"
      src={window.__resources.dragonSigil}
      alt=""
      aria-hidden="true"
    />
  );
}

function RefinedPortfolio({ data, density = "regular" }) {
  const [selectedId, setSelectedId] = useState(null);
  const [activeSection, setActiveSection] = useState("sigil");
  const visitedSections = useRef(new Set(['sigil']));
  const refs = {
    sigil: useRef(null),
    season1: useRef(null),
    season2: useRef(null),
    season3: useRef(null),
    season4: useRef(null),
    oath: useRef(null),
  };

  const goTo = (key) => {
    setActiveSection(key);
    refs[key].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.umami?.track('nav_click', { section: key });
  };

  useEffect(() => {
    const keys = ['sigil', 'season1', 'season2', 'season3', 'season4', 'oath'];
    const depthPct = { sigil: 0, season1: 20, season2: 40, season3: 60, season4: 80, oath: 100 };
    const container = document.querySelector('.refined-root');
    const onScroll = () => {
      let current = keys[0];
      for (const k of keys) {
        if (!refs[k].current) continue;
        if (refs[k].current.getBoundingClientRect().top <= 80) current = k;
      }
      setActiveSection(current);
      if (!visitedSections.current.has(current)) {
        visitedSections.current.add(current);
        window.umami?.track('scroll_depth', { section: current, depth_pct: depthPct[current] });
      }
    };
    container?.addEventListener('scroll', onScroll, { passive: true });
    return () => container?.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedId(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const targets = [
      { ref: refs.season1, cls: 'r-season--entered' },
      { ref: refs.season2, cls: 'r-season--entered' },
      { ref: refs.season3, cls: 'r-season--entered' },
      { ref: refs.season4, cls: 'r-season--entered' },
      { ref: refs.oath,    cls: 'r-oath--entered' },
    ];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const cls = el.dataset.entryCls;
        if (entry.isIntersecting) {
          el.classList.remove(cls);
          void el.offsetHeight;
          el.classList.add(cls);
        } else {
          el.classList.remove(cls);
        }
      });
    }, { threshold: 0.3 });
    targets.forEach(({ ref, cls }) => {
      if (ref.current) {
        ref.current.dataset.entryCls = cls;
        observer.observe(ref.current);
      }
    });
    return () => observer.disconnect();
  }, []);

  const handleOathMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = 'box-shadow 0.25s, background 0.25s, border-color 0.25s';
    el.style.transform = `perspective(700px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) translateY(-3px)`;
  };

  const handleOathLeave = (e) => {
    const el = e.currentTarget;
    el.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s, background 0.25s, border-color 0.25s';
    el.style.transform = '';
  };

  useEffect(() => {
    const syncPad = () => {
      const nav = document.querySelector('.r-nav');
      if (!nav) return;
      const bottom = nav.getBoundingClientRect().bottom;
      document.documentElement.style.setProperty('--season-pad-top', `${Math.round(bottom + 4)}px`);
    };
    syncPad();
    window.addEventListener('resize', syncPad);
    return () => window.removeEventListener('resize', syncPad);
  }, []);

  useEffect(() => {
    const ref = document.referrer;
    let source = 'direct';
    let domain = '';
    if (ref) {
      try {
        domain = new URL(ref).hostname.replace(/^www\./, '');
        if (domain.includes('linkedin')) source = 'linkedin';
        else if (domain.includes('github')) source = 'github';
        else if (['google', 'bing', 'duckduckgo', 'yahoo'].some(s => domain.includes(s))) source = 'search';
        else source = 'referral';
      } catch {}
    }
    const w = window.innerWidth;
    const device = w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
    window.umami?.track('page_load', { referrer_source: source, referrer_domain: domain || undefined, device });
  }, []);

  useEffect(() => {
    const milestones = [30, 60, 120, 300];
    const timers = milestones.map(s =>
      setTimeout(() => window.umami?.track('time_on_page', { seconds: s }), s * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const fontSize = density === "compact" ? 17 : density === "comfy" ? 21 : 19;

  return (
    <div className="refined-root" style={{ fontSize }}>
      <style>{REFINED_STYLE}</style>

      {/* ── NAV ── */}
      <nav className="r-nav">
        <div className="r-nav-brand">
          <div className="r-glyph"><RefinedSigil size={28} color="var(--r-fire)" /></div>
          <div className="r-nav-name">{data.identity.name}</div>
          <div className="r-nav-words">{data.identity.words}</div>
        </div>
        <div className="r-nav-links">
          <button className={`r-nav-link ${activeSection === 'sigil' ? 'active' : ''}`} onClick={() => goTo('sigil')}>Sigil</button>
          <button className={`r-nav-link ${activeSection === 'season1' ? 'active' : ''}`} onClick={() => goTo('season1')}>Season I</button>
          <button className={`r-nav-link ${activeSection === 'season2' ? 'active' : ''}`} onClick={() => goTo('season2')}>Season II</button>
          <button className={`r-nav-link ${activeSection === 'season3' ? 'active' : ''}`} onClick={() => goTo('season3')}>Season III</button>
          <button className={`r-nav-link ${activeSection === 'season4' ? 'active' : ''}`} onClick={() => goTo('season4')}>Season IV</button>
          <button className={`r-nav-link ${activeSection === 'oath' ? 'active' : ''}`} onClick={() => goTo('oath')}>Raven</button>
        </div>
        <a className="r-nav-cta" href={data.identity.resumeUrl} download
           onClick={() => {
             const w = window.innerWidth;
             window.umami?.track('resume_download', {
               section: activeSection,
               device: w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop',
             });
           }}>Resume ↓</a>
      </nav>

      {/* ── HERO ── */}
      <section ref={refs.sigil} className="r-hero">
        <div className="r-sigil-ring" />
        <div className="r-sigil-ring-inner" />
        <div className="r-sigil"><HeroSigil /></div>

        <div className="r-hero-inner">
          <div className="r-hero-house">{data.identity.house}</div>
          <h1 className="r-hero-title">{data.identity.title}</h1>
          <h2 className="r-hero-subtitle">{data.identity.subtitle}</h2>

          <div className="r-hero-lore">
            <div className="r-lore-name">{data.identity.name}</div>
            <div className="r-lore-epithets">
              {data.identity.epithets}{' '}
              <span className="r-lore-aside">{data.identity.epithetsAside}</span>
            </div>
          </div>

          <div className="r-hero-stats">
            {data.heroStats.map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="r-hero-stat-sep" />}
                <div className="r-hero-stat">
                  <div className="r-hero-stat-val">{s.val}</div>
                  <div className="r-hero-stat-lbl">{s.lbl}</div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="r-hero-cue">
            <span>Scroll to Begin the Chronicles</span>
            <span style={{ fontSize: 14 }}>↓</span>
          </div>
        </div>
      </section>

      {/* ── SEASONS ── */}
      {data.seasons.map((season, si) => (
        <section key={si} ref={refs[`season${si + 1}`]} className="r-season">
          <div className="r-season-bg" style={{ backgroundImage: `url('${window.__resources['season' + (si + 1) + 'Bg']}')` }} />
          <div className="r-season-inner">
            <header className="r-season-header">
              <div className="r-season-number">Season {season.number}</div>
              <h2 className="r-season-title">{season.title}</h2>
              <p className="r-season-lore">{season.lore}</p>
            </header>
            <div className="r-cards" data-count={season.tracks.length}>
              {season.tracks.map((track) => (
                <Card
                  key={track.id}
                  track={track}
                  data={data}
                  onOpen={setSelectedId}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── OATH / CONTACT ── */}
      <section ref={refs.oath} className="r-oath">
        <div className="r-oath-bg" />
        <h2 className="r-oath-title">{data.oath.title}</h2>
        <p className="r-oath-text">{data.oath.text}</p>
        <div className="r-oath-links">
          {data.links.map((l, i) => (
            <a key={i} href={l.href}
               className="r-oath-link"
               target={l.href.startsWith('http') ? '_blank' : undefined}
               rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
               data-umami-event="contact_click" data-umami-event-platform={l.label}
               onMouseMove={handleOathMove}
               onMouseLeave={handleOathLeave}>
              <span className="r-oath-link-label">{l.label}</span>
              <span className="r-oath-link-value">{l.value}</span>
            </a>
          ))}
        </div>
        <footer className="r-foot">
          <div className="r-foot-left">© 2026 {data.identity.name}, of House Growth · First of His Name · Builder of Products</div>
          <div className="r-foot-words">{data.identity.title} · {data.identity.words}</div>
        </footer>
      </section>

      {selectedId && <Modal id={selectedId} data={data} onClose={() => setSelectedId(null)} />}
    </div>
  );
}

window.RefinedPortfolio = RefinedPortfolio;
window.RefinedSigil = RefinedSigil;
