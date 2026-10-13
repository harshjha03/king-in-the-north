import { useEffect, useState } from 'react';

const DELAY_MS = 30_000;
const DISMISSED_KEY = 'got-prompt-dismissed';
export const GOT_URL = '/got/'; // the original Game of Thrones site, copied there at build time

// After 30s on the page, ask once whether the visitor wants the GoT-themed site.
// "No" is remembered in this browser so returning visitors aren't asked again.
export function GotPrompt({ paused }: { paused: boolean }) {
  const [due, setDue] = useState(false);

  useEffect(() => {
    try { if (localStorage.getItem(DISMISSED_KEY)) return; } catch { /* storage blocked: still ask */ }
    const t = setTimeout(() => setDue(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setDue(false);
    window.umami?.track('got_prompt', { answer: 'no' });
    try { localStorage.setItem(DISMISSED_KEY, '1'); } catch { /* ignore */ }
  };

  const accept = () => {
    window.umami?.track('got_prompt', { answer: 'yes' });
    window.location.href = GOT_URL;
  };

  useEffect(() => {
    if (!due || paused) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [due, paused]);

  if (!due || paused) return null; // wait while a case study is open

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="got-title" onClick={dismiss}
      style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'grid', placeItems: 'center', padding: 16, background: 'rgba(5,2,1,0.78)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', animation: 'fadeIn .3s ease' }}>
      <div onClick={(e) => e.stopPropagation()} className="got-card">
        <img src={`${GOT_URL}assets/dragon-sigil.png`} alt="" width={96} height={96} style={{ display: 'block', margin: '0 auto', filter: 'drop-shadow(0 0 18px rgba(192,57,43,0.55))' }} />
        <div className="got-kicker">A raven arrives</div>
        <h2 id="got-title" className="got-title">Game Of Thrones Fan?</h2>
        <p className="got-text">There is another version of this chronicle — the same work, told in seasons, sigils and fire &amp; blood.</p>
        <div style={{ display: 'grid', gap: 10, marginTop: 6 }}>
          <button autoFocus onClick={accept} className="btn-unset got-yes">Yes — take me to Westeros</button>
          <button onClick={dismiss} className="btn-unset got-no">No, I'll stay here</button>
        </div>
      </div>
    </div>
  );
}
