import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Background } from './components/Background';
import { CaseModal, type ModalCase } from './components/CaseModal';
import { useBuilds, type Build } from './lib/github';
import {
  LORE, PARALLAX, eyebrow, footerLine, trace, stats, featuredTitle, shipped, speedRows,
  work, careerLog, headLog, links, type LogEntry,
} from './content';

const NAV: [string, string][] = [['top', 'intro'], ['builds', 'builds'], ['flagship', '4.0'], ['cases', 'cases'], ['career', 'career'], ['contact', 'contact']];
const THEMES = {
  accent: { glow: 'rgba(255,90,54,0.35)', stroke: '#ff8a6e' },
  green: { glow: 'rgba(126,224,138,0.25)', stroke: '#7ee08a' },
  gold: { glow: 'rgba(232,194,106,0.28)', stroke: '#e8c26a' },
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const pad = (n: number) => String(n).padStart(2, '0');
const hash = (s: string) => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0).toString(16).slice(0, 7); };
const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const auto = (min: number): CSSProperties => ({ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${min}px),1fr))` });

const workCases: ModalCase[] = work.map((w, i) => ({
  tag: `CASE-${pad(i + 1)}`, type: w.type, period: w.period, metrics: w.metrics,
  title: LORE ? `${w.lt} — ${w.title}` : w.title, lore: LORE ? w.lore : '',
  sections: w.sections.map((s) => ({ title: LORE ? s[1] : s[0], text: s[2] })),
}));

export default function App() {
  const builds = useBuilds();
  const [step, setStep] = useState(0);
  const [p, setP] = useState({ kP: 0, cP: 0, tP: 0, pageP: 0, active: 'top' });
  const [modal, setModal] = useState<{ list: ModalCase[]; idx: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const kRef = useRef<HTMLElement>(null);
  const cRef = useRef<HTMLElement>(null);
  const tRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % trace.length), 1600);
    return () => clearInterval(t);
  }, []);

  // Scroll engine: parallax via direct transforms, section progress via quantised state.
  useEffect(() => {
    let raf = 0;
    const k = reducedMotion ? 0 : PARALLAX;
    const frame = () => {
      raf = 0;
      const root = rootRef.current; if (!root) return;
      const vh = window.innerHeight;
      root.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
        const sp = parseFloat(el.dataset.speed!) || 0;
        const r = el.parentElement!.getBoundingClientRect();
        const mx = parseFloat(el.dataset.max || '') || 90;
        const d = Math.max(-mx, Math.min(mx, -(r.top + r.height / 2 - vh / 2) * sp * k));
        el.style.transform = `translate3d(0,${d.toFixed(1)}px,0)`;
      });
      root.querySelectorAll<HTMLElement>('[data-fade]').forEach((el) => {
        el.style.opacity = String(clamp01(1 - window.scrollY / (vh * 0.75)));
        el.style.transform = `translate3d(0,${(window.scrollY * 0.25 * k).toFixed(1)}px,0)`;
      });
      const prog = (el: HTMLElement | null) => { if (!el) return 0; const r = el.getBoundingClientRect(); return clamp01(-r.top / Math.max(1, r.height - vh)); };
      const kP = prog(kRef.current), cP = prog(cRef.current);
      const track = trackRef.current;
      if (track) track.style.transform = `translate3d(${(-cP * Math.max(0, track.scrollWidth - window.innerWidth)).toFixed(1)}px,0,0)`;
      let tP = 0;
      if (tRef.current) { const r = tRef.current.getBoundingClientRect(); tP = clamp01((vh * 0.6 - r.top) / r.height); }
      const doc = document.scrollingElement || document.documentElement;
      const pageP = clamp01(window.scrollY / Math.max(1, doc.scrollHeight - vh));
      let active = 'top';
      for (const [id] of NAV) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < vh * 0.4) active = id; }
      const q = (v: number) => Math.round(v * 400) / 400;
      setP((s) => (q(kP) === s.kP && q(cP) === s.cP && q(tP) === s.tP && q(pageP) === s.pageP && active === s.active)
        ? s : { kP: q(kP), cP: q(cP), tP: q(tP), pageP: q(pageP), active });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    frame();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [builds.length]);

  const closeModal = useCallback(() => setModal(null), []);
  const shiftModal = useCallback((d: number) => setModal((m) => m && { ...m, idx: (m.idx + d + m.list.length) % m.list.length }), []);

  const buildCases: ModalCase[] = builds.filter((b) => b.sections.length).map((b, i) => ({
    tag: `BUILD-${pad(i + 1)}`, type: b.status, period: b.period, title: b.name, lore: LORE ? b.lore : '',
    metrics: b.metrics, sections: b.sections,
  }));
  const openCase = (list: ModalCase[], idx: number) => {
    setModal({ list, idx });
    window.umami?.track('case_study_open', { id: list[idx].tag, title: list[idx].title });
  };
  const openBuild = (b: Build) => openCase(buildCases, buildCases.findIndex((c) => c.title === b.name));

  return (
    <div ref={rootRef} style={{ position: 'relative', overflowX: 'clip' }}>
      <Background reduced={reducedMotion} />
      <Header active={p.active} pageP={p.pageP} />
      <Hero step={step} />
      <Stats />
      <Builds builds={builds} onOpen={openBuild} />
      <Flagship sectionRef={kRef} kp={p.kP} />
      <Cases sectionRef={cRef} trackRef={trackRef} cP={p.cP} onOpen={(idx) => openCase(workCases, idx)} />
      <Career sectionRef={tRef} tP={p.tP} log={[
        ...careerLog,
        ...builds.map((b): LogEntry => ({ k: b.key, side: true, ref: 'side/builds', msg: b.log, sub: b.logSub })),
        headLog,
      ]} />
      <Contact />
      {modal && <CaseModal cs={modal.list[modal.idx]} onClose={closeModal} onShift={shiftModal} />}
    </div>
  );
}

function Header({ active, pageP }: { active: string; pageP: number }) {
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30 }}>
      <div style={{ maxWidth: 1240, margin: '12px auto 0', padding: '0 clamp(12px,3vw,24px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap', padding: '9px 10px 9px 16px', background: 'rgba(14,14,12,0.72)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid #26251f', borderRadius: 12 }}>
          <a href="#top" style={{ display: 'flex', gap: 10, alignItems: 'center', textDecoration: 'none', fontWeight: 600, fontSize: 14.5 }}>
            <span className="mono" style={{ width: 20, height: 20, border: '1.5px solid var(--accent)', borderRadius: 5, display: 'grid', placeItems: 'center', fontSize: 10, color: 'var(--accent)' }}>H</span>Harsh Jha
          </a>
          <nav className="mono" style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 12, flexWrap: 'wrap' }}>
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} data-umami-event="nav_click" data-umami-event-section={id} style={{ textDecoration: 'none', padding: '6px 10px', borderRadius: 6, color: active === id ? 'var(--bg)' : 'var(--secondary)', background: active === id ? 'var(--text)' : 'transparent', transition: 'background .2s,color .2s' }}>{label}</a>
            ))}
            <a href="/assets/resume.pdf" download data-umami-event="resume_download" data-umami-event-section={active} className="resume-btn" style={{ fontFamily: "'Geist',sans-serif" }}>Résumé ↓</a>
          </nav>
        </div>
        <div style={{ height: 2, margin: '6px 12px 0', background: 'var(--surface-2)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--accent)', width: `${(pageP * 100).toFixed(1)}%` }} />
        </div>
      </div>
    </header>
  );
}

function Hero({ step }: { step: number }) {
  return (
    <section id="top" className="sec" style={{ minHeight: '100vh', display: 'grid', alignItems: 'center', padding: '120px clamp(20px,4vw,40px) 64px' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', right: '-2vw', top: '14vh' }}>
          <div data-speed="0.55" data-max="400" style={{ fontWeight: 700, fontSize: 'clamp(160px,30vw,440px)', lineHeight: 0.8, letterSpacing: '-0.07em', color: 'transparent', WebkitTextStroke: '1px #2a2622' }}>140%</div>
        </div>
      </div>
      <div className="wrap" style={{ position: 'relative', ...auto(480), gap: 'clamp(36px,6vw,72px)', alignItems: 'end' }}>
        <div data-fade="1" style={{ display: 'grid', gap: 26 }}>
          <div className="mono" style={{ fontSize: 12.5, color: 'var(--muted)', display: 'flex', gap: 10, alignItems: 'center' }}><span className="dot" />{eyebrow}</div>
          <h1 style={{ fontWeight: 600, fontSize: 'clamp(44px,7.4vw,104px)', lineHeight: 0.92, letterSpacing: '-0.055em', margin: 0, textWrap: 'balance' } as CSSProperties}>
            Product manager who ships <em className="em">fast</em>, and measures what changed.
          </h1>
          <p style={{ margin: 0, maxWidth: '54ch', fontSize: 'clamp(16px,1.5vw,18px)', color: 'var(--secondary)' }}>
            Associate PM at Kazam, building EV charging, payments and fleet-billing products used by riders, fleets and charge-point operators across India. Previously B2B fuel logistics at FuelBuddy UAE. I also build and ship my own products end-to-end.
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          <div data-speed="-0.18" style={{ background: 'rgba(18,18,16,0.92)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.55)' }}>
            <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid var(--border)', fontSize: 11, color: 'var(--muted)' }}>
              <span style={{ display: 'flex', gap: 6 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: '#2e2d29' }} />)}</span>
              <span>trace · kazam-app-4.0</span><span style={{ color: 'var(--green)' }}>● run</span>
            </div>
            <div className="mono" style={{ padding: '14px 14px 4px', display: 'grid', gap: 2, fontSize: 12.5 }}>
              {trace.map(([k, v], i) => {
                const a = i === step, d = i < step;
                return (
                  <div key={k} style={{ display: 'grid', gridTemplateColumns: '16px 72px minmax(0,1fr)', gap: 10, padding: '8px 10px', borderRadius: 6, background: a ? 'var(--surface-2)' : 'transparent', transition: 'background .35s' }}>
                    <span style={{ color: a ? 'var(--accent)' : d ? 'var(--green)' : 'var(--disabled)' }}>{a ? '›' : d ? '✓' : '·'}</span>
                    <span style={{ color: a ? 'var(--accent)' : d ? 'var(--muted)' : 'var(--faint)' }}>{k}</span>
                    <span style={{ color: a ? 'var(--text)' : d ? 'var(--secondary)' : 'var(--faint)', overflowWrap: 'anywhere' }}>{v}</span>
                  </div>
                );
              })}
              <div style={{ padding: '8px 10px 12px', color: 'var(--faint)', display: 'flex', gap: 8 }}><span>$</span><span style={{ width: 7, height: 14, background: 'var(--accent)', animation: 'blink 1s steps(1) infinite' }} /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mono" style={{ position: 'absolute', left: '50%', bottom: 22, transform: 'translateX(-50%)', fontSize: 11, color: 'var(--faint)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span>scroll</span><span style={{ animation: 'cue 2s ease-in-out infinite', color: 'var(--accent)' }}>↓</span>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="sec" style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,4vw,40px) clamp(80px,10vw,140px)' }}>
      <div className="wrap" style={{ ...auto(240), gap: 12 }}>
        {stats.map((s, i) => (
          <div key={s.key} style={{ position: 'relative' }}>
            <div data-speed="0.08" style={{ background: 'rgba(18,18,16,0.9)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 22px 20px', display: 'grid', gap: 12 }}>
              <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--faint)' }}><span>{s.key}</span><span>/{pad(i + 1)}</span></div>
              <div style={{ fontWeight: 600, fontSize: 'clamp(44px,5vw,64px)', lineHeight: 0.95, letterSpacing: '-0.05em' }}>{s.val}</div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)' }}>{s.lbl}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Builds({ builds, onOpen }: { builds: Build[]; onOpen: (b: Build) => void }) {
  return (
    <section id="builds" className="sec" style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,4vw,40px) clamp(80px,10vw,140px)' }}>
      <div className="wrap" style={{ display: 'grid', gap: 40 }}>
        <div style={{ ...auto(320), gap: 16, alignItems: 'end' }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <div className="label">01 — builds</div>
            <h2 className="h2">Things I built <em className="em">myself</em></h2>
          </div>
          <div style={{ fontSize: 15, color: 'var(--muted)', justifySelf: 'end' }}>Designed, coded and shipped solo.</div>
        </div>
        <div style={{ ...auto(460), columnGap: 18, rowGap: 72, alignItems: 'start' }}>
          {builds.map((b, i) => <BuildCard key={b.key} b={b} odd={i % 2 === 1} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}

function BuildCard({ b, odd, onOpen }: { b: Build; odd: boolean; onOpen: (b: Build) => void }) {
  const t = THEMES[b.theme] || THEMES.accent;
  return (
    <div style={{ position: 'relative', paddingTop: odd ? 'clamp(0px,8vw,96px)' : 0 }}>
      <div data-speed={odd ? '0.1' : '0.03'} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', display: 'grid', boxShadow: '0 30px 80px rgba(0,0,0,0.45)' }}>
        <div style={{ position: 'relative', height: 'clamp(150px,18vw,210px)', overflow: 'hidden', borderBottom: '1px solid var(--border)', backgroundImage: 'linear-gradient(#1c1b18 1px,transparent 1px),linear-gradient(90deg,#1c1b18 1px,transparent 1px)', backgroundSize: '24px 24px', display: 'grid', placeItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 120%,${t.glow},transparent 65%)` }} />
          <div style={{ position: 'relative', fontWeight: 700, fontSize: 'clamp(64px,9vw,120px)', lineHeight: 1, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: `1px ${t.stroke}` }}>{b.glyph}</div>
          <div className="mono" style={{ position: 'absolute', left: 16, top: 14, display: 'flex', gap: 7, alignItems: 'center', fontSize: 11, color: 'var(--green)', padding: '4px 9px', border: '1px solid #2f4a33', borderRadius: 999, background: '#121c13' }}>
            <span className="dot" style={{ width: 6, height: 6 }} />{b.status}
          </div>
          <div className="mono" style={{ position: 'absolute', right: 16, top: 16, fontSize: 11, color: 'var(--muted)' }}>{b.period}</div>
        </div>
        <div style={{ padding: 'clamp(20px,3vw,28px)', display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gap: 6 }}>
            <h3 style={{ fontWeight: 600, fontSize: 'clamp(28px,3.2vw,38px)', lineHeight: 1, letterSpacing: '-0.035em', margin: 0 }}>{b.name}</h3>
            {b.oneLiner && <div style={{ fontFamily: "'Newsreader',serif", fontStyle: 'italic', fontSize: 18, color: 'var(--secondary)' }}>{b.oneLiner}</div>}
          </div>
          {b.flow.length > 0 && (
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', fontSize: 12 }}>
              {b.flow.map((f, i) => (
                <span key={f} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ padding: '5px 9px', border: `1px solid ${i === b.flowHighlight ? '#5a2a1e' : 'var(--border)'}`, color: i === b.flowHighlight ? 'var(--accent)' : 'var(--body)', borderRadius: 6, background: '#0f0f0d' }}>{f}</span>
                  {i < b.flow.length - 1 && <span style={{ color: 'var(--disabled)' }}>→</span>}
                </span>
              ))}
            </div>
          )}
          {b.metrics.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${b.metrics.length},minmax(0,1fr))`, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              {b.metrics.map((m) => (
                <div key={m.lbl} style={{ padding: '14px 10px 14px 0', display: 'grid', gap: 3 }}>
                  <span style={{ fontWeight: 600, fontSize: 24, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.val}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{m.lbl}</span>
                </div>
              ))}
            </div>
          )}
          {b.text && <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--body)' }}>{b.text}</p>}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {b.stack.map((s) => <span key={s} className="mono" style={{ fontSize: 11, padding: '3px 8px', background: 'var(--surface-2)', borderRadius: 4, color: 'var(--secondary)' }}>{s}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {b.sections.length > 0 && <button onClick={() => onOpen(b)} className="btn-unset mono muted-btn" style={{ fontSize: 12 }}>read case →</button>}
              <a href={b.href} target="_blank" rel="noreferrer" data-umami-event="realm_link_click" data-umami-event-id={b.key} style={{ fontSize: 14, fontWeight: 500, textDecoration: 'none', color: 'var(--accent)' }}>{b.cta} ↗</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Flagship({ sectionRef, kp }: { sectionRef: React.RefObject<HTMLElement>; kp: number }) {
  const homeNow = 22.5 - 19.5 * ease(clamp01(kp * 1.25 / 0.75));
  return (
    <section id="flagship" ref={sectionRef} className="sec" style={{ height: '300vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'grid', alignItems: 'center', padding: '96px clamp(20px,4vw,40px) 40px' }}>
        <div className="wrap" style={{ ...auto(440), gap: 'clamp(28px,5vw,64px)', alignItems: 'center' }}>
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="label">02 — flagship · Kazam · May 2025</div>
            <h2 className="h2-sm" style={{ lineHeight: 0.98, textWrap: 'balance' } as CSSProperties}>{featuredTitle}</h2>
            <p style={{ margin: 0, color: 'var(--secondary)', maxWidth: '52ch' }}>The app had built up serious UX debt: a 20–25 second home screen, a 30-second wait to start charging, and home-charger onboarding that needed the ops team. I led the two-quarter 4.0 release across engineering, design and ops against four goals: faster charging start, better charger discovery, simpler workflows and a larger network.</p>
            <div style={{ display: 'grid', gap: 6 }}>
              {shipped.map((t, i) => (
                <div key={t} style={{ display: 'grid', gridTemplateColumns: '28px minmax(0,1fr)', gap: 6, fontSize: 14.5, opacity: kp >= i * 0.12 ? 1 : 0.28, transition: 'opacity .3s' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', paddingTop: 3 }}>{pad(i + 1)}</span><span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(18,18,16,0.94)', border: '1px solid var(--border)', borderRadius: 14, padding: 'clamp(20px,3vw,30px)', display: 'grid', gap: 20, boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 12, alignItems: 'end' }}>
              <div style={{ display: 'grid', gap: 6 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>home_screen.load</div>
                <div style={{ fontWeight: 600, fontSize: 'clamp(56px,7vw,92px)', lineHeight: 0.85, letterSpacing: '-0.06em', fontVariantNumeric: 'tabular-nums' }}>{homeNow.toFixed(1)}<span style={{ fontSize: '0.4em', color: 'var(--muted)', letterSpacing: '-0.02em' }}>s</span></div>
              </div>
              <div style={{ textAlign: 'right', display: 'grid', gap: 4 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>speed-up</div>
                <div style={{ fontWeight: 600, fontSize: 'clamp(32px,3.6vw,46px)', lineHeight: 0.9, letterSpacing: '-0.04em', color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>{(22.5 / homeNow).toFixed(1)}×</div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              {speedRows.map(([label, before, from, to], i) => {
                const local = ease(clamp01((kp * 1.25 - i * 0.05) / 0.75));
                const now = from - (from - to) * local;
                return (
                  <div key={label} style={{ display: 'grid', gap: 7 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14 }}>
                      <span>{label}</span>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{before} → <span style={{ color: local > 0.98 ? 'var(--green)' : 'var(--text)' }}>{now.toFixed(1)}s</span></span>
                    </div>
                    <div style={{ position: 'relative', height: 8, background: '#1a1916', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, background: 'repeating-linear-gradient(90deg,#3a3833 0 3px,#24231f 3px 5px)', width: `${(from / 55 * 100).toFixed(1)}%` }} />
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, background: 'var(--accent)', width: `${(now / 55 * 100).toFixed(1)}%`, boxShadow: '0 0 12px #ff5a36' }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--faint)' }}>
              <span>3.x</span><span>{kp < 0.02 ? 'scroll to ship →' : `${Math.round(Math.min(1, kp * 1.25 / 0.75) * 100)}% shipped`}</span><span>4.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cases({ sectionRef, trackRef, cP, onOpen }: { sectionRef: React.RefObject<HTMLElement>; trackRef: React.RefObject<HTMLDivElement>; cP: number; onOpen: (i: number) => void }) {
  const n = work.length;
  return (
    <section id="cases" ref={sectionRef} className="sec" style={{ height: '420vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'grid', gridTemplateRows: 'auto minmax(0,1fr) auto', gridTemplateColumns: 'minmax(0,1fr)', gap: 28, padding: '110px 0 36px', overflow: 'hidden' }}>
        <div className="wrap px" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <div className="label">03 — case files</div>
            <h2 className="h2-sm">Selected work at Kazam</h2>
          </div>
          <div style={{ fontSize: 14.5, color: 'var(--muted)', maxWidth: '36ch' }}>Payments, data integrity, B2B analytics. Click a card to read the case.</div>
        </div>
        <div style={{ minHeight: 0 }}>
          <div ref={trackRef} className="px" style={{ display: 'flex', gap: 16, height: '100%', width: 'max-content', willChange: 'transform' }}>
            {work.map((w, i) => (
              <button key={w.id} onClick={() => onOpen(i)} className="btn-unset case-card" style={{ width: 'min(400px,78vw)', height: '100%', maxHeight: 520, background: 'rgba(18,18,16,0.95)', border: '1px solid var(--border)', borderRadius: 14, padding: 'clamp(20px,2.4vw,26px)', display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gap: 18 }}>
                <span className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--accent)', padding: '3px 7px', border: '1px solid #4a2a20', borderRadius: 4 }}>CASE-{pad(i + 1)}</span><span>{w.period}</span>
                </span>
                <span style={{ display: 'grid', gap: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 'clamp(21px,2vw,26px)', lineHeight: 1.12, letterSpacing: '-0.025em' }}>{LORE ? `${w.lt} — ${w.title}` : w.title}</span>
                  <span className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>{w.type}</span>
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--secondary)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical' }}>{w.sections[0][2]}</span>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                  <span style={{ display: 'grid', gap: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 'clamp(28px,3vw,38px)', lineHeight: 1, letterSpacing: '-0.04em' }}>{w.mVal}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{w.mLbl}</span>
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--accent)' }}>read →</span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="wrap px mono" style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 11, color: 'var(--faint)' }}>
          <span>{pad(Math.min(n, Math.floor(cP * (n - 0.01)) + 1))}</span>
          <span style={{ flex: 1, height: 2, background: 'var(--surface-2)', borderRadius: 2, overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', background: 'var(--accent)', width: `${(cP * 100).toFixed(1)}%` }} /></span>
          <span>{pad(n)}</span>
        </div>
      </div>
    </section>
  );
}

function Career({ sectionRef, tP, log }: { sectionRef: React.RefObject<HTMLElement>; tP: number; log: LogEntry[] }) {
  return (
    <section id="career" ref={sectionRef} className="sec" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,40px)' }}>
      <div className="wrap" style={{ ...auto(300), gap: 'clamp(28px,5vw,64px)' }}>
        <div style={{ display: 'grid', gap: 14, alignContent: 'start', position: 'sticky', top: 110 }}>
          <div className="label">04 — career</div>
          <h2 className="h2">Experience</h2>
          <div className="mono" style={{ fontSize: 12.5, color: 'var(--muted)' }}>git log --reverse career/</div>
        </div>
        <div style={{ position: 'relative', gridColumn: 'span 2', minWidth: 'min(100%,320px)', paddingLeft: 34 }}>
          <div style={{ position: 'absolute', left: 9, top: 8, bottom: 8, width: 2, background: '#22211d' }} />
          <div style={{ position: 'absolute', left: 9, top: 8, width: 2, background: 'linear-gradient(#ff5a36,#ff8a6e)', height: `${(tP * 100).toFixed(1)}%`, boxShadow: '0 0 10px #ff5a36' }} />
          <div style={{ display: 'grid', gap: 6 }}>
            {log.map((e, i) => {
              const on = tP >= (i + 0.5) / log.length;
              const col = e.side ? 'var(--green)' : e.role ? 'var(--gold)' : 'var(--accent)';
              return (
                <div key={e.k} style={{ position: 'relative', padding: '12px 0 18px', opacity: on ? 1 : 0.35, transition: 'opacity .4s' }}>
                  <span style={{ position: 'absolute', left: -30, top: 18, width: 12, height: 12, borderRadius: '50%', background: on && !e.role ? col : 'var(--bg)', border: `2px solid ${on ? col : '#3a3833'}`, boxShadow: '0 0 0 4px #0b0b09', transition: 'all .3s' }} />
                  <div style={{ display: 'grid', gap: 4 }}>
                    <div className="mono" style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap', fontSize: 11.5 }}>
                      <span style={{ color: 'var(--gold)' }}>{hash(e.k)}</span>
                      <span style={{ color: e.side ? 'var(--green)' : e.role ? 'var(--gold)' : 'var(--accent-light)', padding: '0 6px', border: `1px solid ${e.side ? '#2f4a33' : e.role ? '#4a3f22' : '#4a2a20'}`, borderRadius: 3, fontSize: 10.5 }}>{e.ref}</span>
                    </div>
                    <div style={{ fontWeight: e.role ? 600 : 500, fontSize: e.role ? 'clamp(22px,2.4vw,28px)' : 17, lineHeight: 1.25, letterSpacing: '-0.02em' }}>{e.msg}</div>
                    <div style={{ fontSize: 14, color: 'var(--muted)', maxWidth: '62ch' }}>{e.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="sec" style={{ padding: 'clamp(100px,14vw,180px) clamp(20px,4vw,40px) 40px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '-2vw', bottom: '8vh' }}>
          <div data-speed="0.4" data-max="400" style={{ fontWeight: 700, fontSize: 'clamp(120px,22vw,340px)', lineHeight: 0.8, letterSpacing: '-0.07em', color: 'transparent', WebkitTextStroke: '1px #26231f', whiteSpace: 'nowrap' }}>ship it.</div>
        </div>
      </div>
      <div className="wrap" style={{ position: 'relative', display: 'grid', gap: 44 }}>
        <div className="label">05 — contact</div>
        <h2 style={{ fontWeight: 600, fontSize: 'clamp(44px,7.4vw,108px)', lineHeight: 0.92, letterSpacing: '-0.055em', margin: 0, maxWidth: '14ch', textWrap: 'balance' } as CSSProperties}>
          Hiring a PM who ships? <a href="mailto:harshtimes112@gmail.com" data-umami-event="contact_click" data-umami-event-platform="email" className="em talk">Let's talk.</a>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 10 }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} {...(l.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })} data-umami-event="contact_click" data-umami-event-platform={l.label} className="panel link-card" style={{ textDecoration: 'none', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'grid', gap: 2, minWidth: 0 }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{l.label}</span>
                <span style={{ fontSize: 15, overflowWrap: 'anywhere' }}>{l.value}</span>
              </span>
              <span style={{ color: 'var(--accent)' }}>↗</span>
            </a>
          ))}
        </div>
        <footer className="mono" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 12, color: 'var(--faint)', paddingTop: 24, borderTop: '1px solid #22211d' }}>
          <span>© 2026 Harsh Jha</span><span>{footerLine}</span>
        </footer>
      </div>
    </section>
  );
}
