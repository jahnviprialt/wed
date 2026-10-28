import { useEffect, useMemo, useRef, type ReactNode } from "react";

function particleValue(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
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
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        l: `${(particleValue(index + 1) * 100).toFixed(5)}%`,
        s: Number((2 + particleValue(index + 101) * 4).toFixed(5)),
        d: Number((14 + particleValue(index + 201) * 14).toFixed(5)),
        dl: Number((-particleValue(index + 301) * 20).toFixed(5)),
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.l,
            width: p.s * 2,
            height: p.s * 2,
            animationDuration: `${p.d}s`,
            animationDelay: `${p.dl}s`,
          }}
        />
      ))}
    </div>
  );
}

export function CeremonyParticles({
  count = 12,
  kind,
}: {
  count?: number;
  kind: "mehendi" | "haldi" | "wedding";
}) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        left: `${(particleValue(index + 401) * 100).toFixed(2)}%`,
        top: `${(particleValue(index + 501) * 100).toFixed(2)}%`,
        duration: `${18 + particleValue(index + 601) * 20}s`,
        delay: `${-particleValue(index + 701) * 24}s`,
        size: `${2 + particleValue(index + 801) * 3}px`,
      })),
    [count],
  );

  return (
    <div className={`ceremony-particles ceremony-particles--${kind}`} aria-hidden>
      {items.map((item, index) => (
        <span
          key={index}
          className="ceremony-particle"
          style={{
            left: item.left,
            top: item.top,
            width: item.size,
            height: item.size,
            animationDuration: item.duration,
            animationDelay: item.delay,
          }}
        />
      ))}
    </div>
  );
}

export function MehendiArtwork() {
  return (
    <svg
      viewBox="0 0 320 132"
      className="ceremony-art ceremony-art--mehendi"
      fill="none"
      aria-hidden
    >
      <g className="art-sway art-sway--left" stroke="currentColor">
        <path d="M12 116c24-13 22-38 44-51 12-7 24-9 37-8M30 111c0-16-9-24-20-30m42 3c-1-15 5-24 16-33m-31 45c14-2 23 3 30 14" />
        <path d="M53 65c-9-7-10-15-6-21 8 2 13 8 13 17m7-12c-1-11 4-18 12-20 5 7 4 15-3 23m-37 18c-10-2-16-8-15-16 8-3 15 0 21 8m25 26c-9 3-16 0-19-7 5-6 12-7 20-3" />
      </g>
      <g className="art-sway art-sway--right" stroke="currentColor">
        <path d="M308 116c-24-13-22-38-44-51-12-7-24-9-37-8m19 54c0-16 9-24 20-30m-42 3c1-15-5-24-16-33m31 45c-14-2-23 3-30 14" />
        <path d="M267 65c9-7 10-15 6-21-8 2-13 8-13 17m-7-12c1-11-4-18-12-20-5 7-4 15 3 23m37 18c10-2 16-8 15-16-8-3-15 0-21 8m-25 26c9 3 16 0 19-7-5-6-12-7-20-3" />
      </g>
      <g className="mehendi-palm" stroke="currentColor">
        <path d="M135 111V71c0-5 7-5 7 0V47c0-6 8-6 8 0V36c0-6 8-6 8 0V49c0-7 8-7 8 0v11c0-6 8-6 8 0v27c0 12-8 24-21 24h-8c-6 0-10-4-10-10z" />
        <path d="M145 91c6-7 16-7 23 0m-20 9c5 4 12 4 17 0m-11-20 3 4 3-4m-10 18 2 2m12-2-2 2" />
        <circle cx="156" cy="89" r="3" />
      </g>
      <g className="mehendi-palm" stroke="currentColor">
        <path d="M185 111V71c0-5-7-5-7 0V47c0-6-8-6-8 0V36c0-6-8-6-8 0V49c0-7-8-7-8 0v11c0-6-8-6-8 0v27c0 12 8 24 21 24h8c6 0 10-4 10-10z" />
        <path d="M175 91c-6-7-16-7-23 0m20 9c-5 4-12 4-17 0m11-20-3 4-3-4m10 18-2 2m-12-2 2 2" />
        <circle cx="164" cy="89" r="3" />
      </g>
      <path
        className="art-flower"
        d="M160 19c4 5 4 9 0 13-4-4-4-8 0-13zm-14 10c6-1 10 1 11 6-5 2-9 0-11-6zm28 0c-6-1-10 1-11 6 5 2 9 0 11-6zm-20 15c2-6 5-8 10-7 0 5-3 8-10 7zm12 0c-2-6-5-8-10-7 0 5 3 8 10 7z"
      />
    </svg>
  );
}

export function HaldiArtwork() {
  return (
    <svg viewBox="0 0 320 132" className="ceremony-art ceremony-art--haldi" fill="none" aria-hidden>
      <path className="haldi-canopy" d="M48 109V61c0-34 50-52 112-52s112 18 112 52v48" />
      <g className="art-sway art-sway--left" stroke="currentColor">
        <path d="M50 93C29 70 27 49 31 24c20 17 30 38 25 61-8-15-18-25-31-31m33 38C51 68 55 48 69 29c9 23 7 42-5 59" />
        <path d="M43 40c8 17 14 35 15 54m3-55c-4 16-5 31-2 46" />
      </g>
      <g className="art-sway art-sway--right" stroke="currentColor">
        <path d="M270 93c21-23 23-44 19-69-20 17-30 38-25 61 8-15 18-25 31-31m-33 38c7-25 3-45-11-64-9 23-7 42 5 59" />
        <path d="M277 40c-8 17-14 35-15 54m-3-55c4 16 5 31 2 46" />
      </g>
      <g className="marigold marigold--one" fill="currentColor">
        <circle cx="91" cy="42" r="5" />
        <circle cx="91" cy="31" r="4" />
        <circle cx="101" cy="39" r="4" />
        <circle cx="97" cy="50" r="4" />
        <circle cx="85" cy="51" r="4" />
        <circle cx="81" cy="40" r="4" />
      </g>
      <g className="marigold marigold--two" fill="currentColor">
        <circle cx="229" cy="42" r="5" />
        <circle cx="229" cy="31" r="4" />
        <circle cx="239" cy="39" r="4" />
        <circle cx="235" cy="50" r="4" />
        <circle cx="223" cy="51" r="4" />
        <circle cx="219" cy="40" r="4" />
      </g>
      <path className="haldi-bowl" d="M120 89h80c-3 17-18 25-40 25s-37-8-40-25z" />
      <path className="haldi-mixture" d="M126 89c8-14 17-20 34-20s26 6 34 20" />
      <path
        className="art-leaf"
        d="M144 76c-8-12-7-20 1-27 9 10 9 18-1 27zm32 0c8-12 7-20-1-27-9 10-9 18 1 27z"
      />
      <circle className="art-flower" cx="160" cy="60" r="8" />
    </svg>
  );
}

export function MandapArtwork() {
  return (
    <svg
      viewBox="0 0 520 230"
      className="ceremony-art ceremony-art--mandap"
      fill="none"
      aria-hidden
    >
      <path className="mandap-canopy" d="M82 88 260 17l178 71-32 19H114z" />
      <path className="mandap-drape" d="M104 95v99h38V111m236-16v99h-38V111" />
      <path className="mandap-pillar" d="M148 102h25v94h-25zm199 0h25v94h-25z" />
      <path
        className="mandap-line"
        d="M132 100h256M159 86c20-17 34-17 51 0m99 0c20-17 34-17 51 0"
      />
      <g className="mandap-leaves">
        <path d="M174 91c-8-9-8-16-1-21 7 8 7 15 1 21zm19 1c-4-10-2-17 6-20 4 10 2 17-6 20zm17 0c1-10 6-15 14-15 0 10-5 15-14 15zm119-1c8-9 8-16 1-21-7 8-7 15-1 21zm-19 1c4-10 2-17-6-20-4 10-2 17 6 20zm-17 0c-1-10-6-15-14-15 0 10 5 15 14 15z" />
      </g>
      <g className="art-garland">
        <path d="M158 92c11 29 24 40 39 40s28-11 39-40m46 0c11 29 24 40 39 40s28-11 39-40" />
        <circle cx="178" cy="112" r="4" />
        <circle cx="197" cy="127" r="4" />
        <circle cx="216" cy="121" r="4" />
        <circle cx="304" cy="112" r="4" />
        <circle cx="323" cy="127" r="4" />
        <circle cx="342" cy="121" r="4" />
      </g>
      <path className="mandap-stage" d="M118 195h284m18 13H100" />
      <g className="wedding-couple">
        <path d="M230 184v-33c0-12 8-20 18-20s18 8 18 20v33m-35-32h35m-28 32-9 11m28-11 9 11" />
        <path d="M264 184v-38c0-14 9-23 20-23s20 9 20 23v38m-38-33h38m-30 33-10 11m32-11 10 11" />
        <circle cx="248" cy="125" r="8" />
        <circle cx="284" cy="115" r="8" />
      </g>
      <g className="sacred-fire">
        <path d="M258 188c-13-14-6-24 0-31 0 8 5 10 7 13 5-10 4-17 1-24 15 14 20 27 9 42" />
        <path d="M263 188c-4-7 0-12 4-16 4 7 5 11 1 16" />
      </g>
      <g className="art-flower">
        <circle cx="112" cy="91" r="6" />
        <circle cx="408" cy="91" r="6" />
        <circle cx="260" cy="29" r="6" />
      </g>
    </svg>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={`mx-auto h-5 w-48 text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden
    >
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
      <ellipse
        cx="20"
        cy="15"
        rx="3.2"
        ry="7"
        className="animate-flicker fill-gold"
        style={{ transformOrigin: "20px 22px" }}
      />
      <ellipse cx="20" cy="17" rx="1.4" ry="3.5" className="fill-ivory" />
      <path d="M5 24c3 9 27 9 30 0z" className="fill-terracotta" />
      <path d="M5 24h30" className="stroke-gold" strokeWidth="1" />
    </svg>
  );
}

/** Shows an original photograph untouched; until supplied, an ornate empty frame. */
export function Photo({
  src,
  alt,
  className = "",
}: {
  src: string | null;
  alt: string;
  className?: string;
  zoom?: boolean;
}) {
  if (src)
    return (
      <div className={`flex items-center justify-center overflow-hidden bg-champagne ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-contain" />
      </div>
    );
  return (
    <div
      className={`paper flex flex-col items-center justify-center gap-3 text-center ${className}`}
    >
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
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        l: particleValue(index + 901) * 100,
        d: 22 + particleValue(index + 1001) * 16,
        dl: -particleValue(index + 1101) * 30,
        s: 0.6 + particleValue(index + 1201) * 0.6,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.l}%`,
            animationDuration: `${p.d}s`,
            animationDelay: `${p.dl}s`,
            scale: String(p.s),
          }}
        />
      ))}
    </div>
  );
}

/** Floral line-art corners that slowly draw themselves in when revealed. */
export function FloralCorners({ className = "" }: { className?: string }) {
  const corner = (
    <svg
      viewBox="0 0 160 160"
      className="h-28 w-28 text-gold sm:h-40 sm:w-40"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
    >
      <path className="draw-line" d="M4 156V40C4 20 20 4 40 4h116" />
      <path className="draw-line" d="M14 150V46c0-18 14-32 32-32h104" strokeOpacity=".5" />
      <path
        className="draw-line"
        d="M30 30c10 4 18 12 20 24M30 30c4 10 12 18 24 20M30 30c-4-6-4-12 0-16 4 4 4 10 0 16zM30 30c-6-4-12-4-16 0 4 4 10 4 16 0z"
      />
      <path className="draw-line" d="M60 14c6 6 14 6 20 0M14 60c6 6 6 14 0 20" />
      <path
        className="draw-line corner-vine"
        d="M40 45c14 5 24 16 31 30m-21-19c10-4 17-11 20-20m-10 33c11-2 20-7 26-15"
      />
      <path
        className="corner-leaf"
        d="M49 49c-1-8 3-13 9-14 3 6 1 11-9 14zm19-14c-1-8 3-13 9-14 3 6 1 11-9 14zm-5 38c-8-1-12-6-12-12 7-2 12 2 12 12z"
      />
      <g className="corner-bloom">
        <path d="M79 67c4-5 7-5 10 0-3 5-6 5-10 0zm-1-1c-6 1-8-1-7-6 5-2 8 0 7 6zm12 0c6 1 8-1 7-6-5-2-8 0-7 6zm-5 7c1 6-1 8-6 7-2-5 0-8 6-7zm-1-12c1-6-1-8-6-7-2 5 0 8 6 7z" />
        <circle cx="85" cy="67" r="2.5" />
      </g>
    </svg>
  );
  return (
    <div className={`pointer-events-none absolute inset-3 ${className}`} aria-hidden>
      <div className="absolute left-0 top-0">{corner}</div>
      <div className="absolute right-0 top-0 -scale-x-100">{corner}</div>
      <div className="absolute bottom-0 left-0 -scale-y-100">{corner}</div>
      <div className="absolute bottom-0 right-0 -scale-100">{corner}</div>
    </div>
  );
}
