import { useEffect } from 'react';
import type { Metric, CaseSection } from '../lib/github';
import { modal } from '../content';

export interface ModalCase {
  tag: string; type: string; title: string;
  metrics: Metric[]; sections: CaseSection[];
}

const SEC_C = ['#ff8a6e', '#e8c26a', '#7ee08a']; // accent-light → gold → green (last)

export function CaseModal({ cs, onClose, onShift }: { cs: ModalCase; onClose: () => void; onShift: (d: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onShift(1);
      if (e.key === 'ArrowLeft') onShift(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose, onShift]);

  const n = cs.sections.length;
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={cs.title}
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(5,5,4,0.72)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center', padding: 'clamp(8px,3vw,32px)', animation: 'fadeIn .18s ease' }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ width: 'min(980px,100%)', maxHeight: 'calc(100vh - 32px)', overflowY: 'auto', background: '#0f0f0d', border: '1px solid #34332e', borderRadius: 14, boxShadow: '0 40px 120px rgba(0,0,0,0.7)', animation: 'winIn .28s cubic-bezier(.2,.8,.2,1)' }}>
        <div className="mono" style={{ position: 'sticky', top: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--border)', background: '#141412', fontSize: 12, color: 'var(--muted)', zIndex: 1 }}>
          <span style={{ color: 'var(--accent)' }}>{cs.tag}</span><span>{cs.type}</span>
          <button onClick={onClose} className="btn-unset esc-btn" style={{ padding: '1px 8px', border: '1px solid var(--border)', borderRadius: 4 }}>{modal.close}</button>
        </div>
        <div style={{ padding: 'clamp(22px,4vw,44px)', display: 'grid', gap: 28 }}>
          <h3 style={{ fontWeight: 600, fontSize: 'clamp(28px,3.6vw,44px)', lineHeight: 1, letterSpacing: '-0.04em', margin: 0, textWrap: 'balance' } as React.CSSProperties}>{cs.title}</h3>
          {cs.metrics.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 8 }}>
              {cs.metrics.map((m) => (
                <div key={m.lbl} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', display: 'grid', gap: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 26, lineHeight: 1.05, letterSpacing: '-0.035em' }}>{m.val}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{m.lbl}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 'clamp(18px,2.6vw,28px)' }}>
            {cs.sections.map((s, j) => {
              const c = j === n - 1 ? SEC_C[2] : SEC_C[Math.min(j, 1)];
              return (
                <div key={s.title} style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
                  <div className="mono" style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase', color: c }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', border: `1px solid ${c}`, display: 'grid', placeItems: 'center', fontSize: 10, flexShrink: 0 }}>{j + 1}</span>
                    <span>{s.title}</span><span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  </div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--body)' }}>{s.text}</p>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 18 }}>
            <button onClick={() => onShift(-1)} className="btn-unset mono muted-btn" style={{ fontSize: 12 }}>{modal.prev}</button>
            <button onClick={() => onShift(1)} className="btn-unset mono muted-btn" style={{ fontSize: 12 }}>{modal.next}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
