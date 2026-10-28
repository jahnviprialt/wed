import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Particles({ count = 18 }: { count?: number }) {
  const [items, setItems] = useState<{ l: number; s: number; d: number; dl: number }[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: count }, () => ({
        l: Math.random() * 100,
        s: 2 + Math.random() * 4,
        d: 14 + Math.random() * 14,
        dl: -Math.random() * 20,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{ left: `${p.l}%`, width: p.s * 2, height: p.s * 2, animationDuration: `${p.d}s`, animationDelay: `${p.dl}s` }}
        />
      ))}
    </div>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={`mx-auto h-5 w-48 text-gold ${className}`} fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden>
      <path d="M0 12h88M152 12h88" />
      <path d="M120 3c4 5 4 13 0 18-4-5-4-13 0-18z" fill="currentColor" fillOpacity=".35" />
      <path d="M120 12c7-6 15-6 22 0-7 6-15 6-22 0zM120 12c-7-6-15-6-22 0 7 6 15 6 22 0z" />
      <circle cx="92" cy="12" r="1.6" fill="currentColor" />
      <circle cx="148" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function Diya({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`h-10 w-10 ${className}`} aria-hidden>
      <ellipse cx="20" cy="15" rx="3.2" ry="7" className="animate-flicker fill-gold" style={{ transformOrigin: "20px 22px" }} />
      <ellipse cx="20" cy="17" rx="1.4" ry="3.5" className="fill-ivory" />
      <path d="M5 24c3 9 27 9 30 0z" className="fill-terracotta" />
      <path d="M5 24h30" className="stroke-gold" strokeWidth="1" />
    </svg>
  );
}

/** Shows an original photograph untouched; until supplied, an ornate empty frame. */
export function Photo({ src, alt, className = "" }: { src: string | null; alt: string; className?: string; zoom?: boolean }) {
  if (src)
    return (
      <div className={`flex items-center justify-center overflow-hidden bg-champagne ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-contain" />
      </div>
    );
  return (
    <div className={`paper flex flex-col items-center justify-center gap-3 text-center ${className}`}>
      <Ornament className="w-24" />
      <p className="font-caps text-[10px] tracking-royal text-gold-deep">PHOTOGRAPH</p>
      <p className="font-display italic text-muted-foreground">{alt}</p>
    </div>
  );
}

export function useStableIndex(len: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % len), ms);
    return () => clearInterval(t);
  }, [len, ms]);
  return useMemo(() => [i, setI] as const, [i]);
}

export function Petals({ count = 10 }: { count?: number }) {
  const [items, setItems] = useState<{ l: number; d: number; dl: number; s: number }[]>([]);
  useEffect(() => {
    setItems(Array.from({ length: count }, () => ({ l: Math.random() * 80 - 20, d: 22 + Math.random() * 16, dl: -Math.random() * 30, s: 0.6 + Math.random() * 0.6 })));
  }, [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <span key={i} className="petal" style={{ left: `${p.l}%`, animationDuration: `${p.d}s`, animationDelay: `${p.dl}s`, scale: String(p.s) }} />
      ))}
    </div>
  );
}

/** Floral line-art corners that slowly draw themselves in when revealed. */
export function FloralCorners() {
  const corner = (
    <svg viewBox="0 0 160 160" className="h-28 w-28 text-gold sm:h-40 sm:w-40" fill="none" stroke="currentColor" strokeWidth="0.9">
      <path className="draw-line" d="M4 156V40C4 20 20 4 40 4h116" />
      <path className="draw-line" d="M14 150V46c0-18 14-32 32-32h104" strokeOpacity=".5" />
      <path className="draw-line" d="M30 30c10 4 18 12 20 24M30 30c4 10 12 18 24 20M30 30c-4-6-4-12 0-16 4 4 4 10 0 16zM30 30c-6-4-12-4-16 0 4 4 10 4 16 0z" />
      <path className="draw-line" d="M60 14c6 6 14 6 20 0M14 60c6 6 6 14 0 20" />
    </svg>
  );
  return (
    <div className="pointer-events-none absolute inset-3" aria-hidden>
      <div className="absolute left-0 top-0">{corner}</div>
      <div className="absolute right-0 top-0 -scale-x-100">{corner}</div>
      <div className="absolute bottom-0 left-0 -scale-y-100">{corner}</div>
      <div className="absolute bottom-0 right-0 -scale-100">{corner}</div>
    </div>
  );
}
