import { useEffect, useRef } from 'react';
import { CURSOR_GLOW } from '../content';

const S = 52; // grid cell size

export function Background({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext('2d')!;
    let w = 0, h = 0, raf = 0;
    let lit: { c: number; r: number; t: number; d: number }[] = [];
    const mouse = { x: -999, y: -999 };

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    const draw = () => {
      const oy = -((window.scrollY * 0.3) % S);
      const rowShift = Math.floor((window.scrollY * 0.3) / S);
      const cols = Math.ceil(w / S) + 1, rows = Math.ceil(h / S) + 2;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = 'rgba(255,255,255,0.018)';
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
        if ((r + rowShift + c) % 2 === 0) ctx.fillRect(c * S, r * S + oy, S, S);

      ctx.strokeStyle = 'rgba(255,255,255,0.045)'; ctx.lineWidth = 1; ctx.beginPath();
      for (let c = 0; c <= cols; c++) { ctx.moveTo(c * S + 0.5, 0); ctx.lineTo(c * S + 0.5, h); }
      for (let r = 0; r <= rows; r++) { const y = r * S + oy + 0.5; ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      if (reduced) return; // static grid only

      if (Math.random() < 0.14 && lit.length < 26)
        lit.push({ c: Math.floor(Math.random() * cols), r: Math.floor(Math.random() * rows) + rowShift, t: 0, d: 90 + Math.random() * 120 });
      lit = lit.filter((l) => (l.t += 1) < l.d);
      for (const l of lit) {
        const a = Math.sin((l.t / l.d) * Math.PI);
        const y = (l.r - rowShift) * S + oy;
        ctx.fillStyle = `rgba(255,90,54,${(a * 0.16).toFixed(3)})`; ctx.fillRect(l.c * S + 1, y + 1, S - 1, S - 1);
        ctx.strokeStyle = `rgba(255,90,54,${(a * 0.35).toFixed(3)})`; ctx.strokeRect(l.c * S + 0.5, y + 0.5, S, S);
      }

      if (CURSOR_GLOW && mouse.x > -500) {
        const mc = Math.floor(mouse.x / S), mr = Math.floor((mouse.y - oy) / S);
        for (let dr = -3; dr <= 3; dr++) for (let dc = -3; dc <= 3; dc++) {
          const cx = (mc + dc) * S + S / 2, cy = (mr + dr) * S + oy + S / 2;
          const a = Math.max(0, 1 - Math.hypot(cx - mouse.x, cy - mouse.y) / 170);
          if (a <= 0) continue;
          ctx.fillStyle = `rgba(255,90,54,${(a * a * 0.12).toFixed(3)})`; ctx.fillRect((mc + dc) * S + 1, (mr + dr) * S + oy + 1, S - 1, S - 1);
          ctx.strokeStyle = `rgba(255,138,110,${(a * 0.28).toFixed(3)})`; ctx.strokeRect((mc + dc) * S + 0.5, (mr + dr) * S + oy + 0.5, S, S);
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const redraw = () => { size(); if (reduced) draw(); };
    size(); draw();
    window.addEventListener('resize', redraw);
    window.addEventListener('pointermove', onMove, { passive: true });
    if (reduced) window.addEventListener('scroll', draw, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', redraw);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', draw);
    };
  }, [reduced]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 35%,#000 15%,transparent 78%)',
      maskImage: 'radial-gradient(ellipse 85% 75% at 50% 35%,#000 15%,transparent 78%)' }}>
      <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
