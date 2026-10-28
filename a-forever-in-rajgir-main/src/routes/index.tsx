import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, MapPin } from "lucide-react";
import opening from "@/assets/opening.jpg";
import rajgir from "@/assets/rajgir.jpg";
import { DIRECTIONS_URL, PHOTOS } from "@/components/invite/media";
import { createMusic, type MusicPlayer } from "@/components/invite/music";
import { Diya, FloralCorners, Ornament, Particles, Petals, Photo, Reveal, useStableIndex } from "@/components/invite/parts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shipra & Saurav — Wedding Invitation · 20 November 2026" },
      { name: "description", content: "With joy, Shipra & Saurav invite you to celebrate their wedding on 20 November 2026, 7:00 PM onwards, in Rajgir." },
      { property: "og:title", content: "Shipra weds Saurav · 20 November 2026" },
      { property: "og:description", content: "You are warmly invited to the wedding of Shipra & Saurav — 20 November 2026, 7:00 PM onwards, Rajgir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const SHLOKA = ["॥ ॐ श्री गणेशाय नमः ॥", "वक्रतुण्ड महाकाय", "सूर्यकोटि समप्रभ ।", "निर्विघ्नं कुरु मे देव", "सर्वकार्येषु सर्वदा ॥"];

function Invitation() {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [playing, setPlaying] = useState(false);
  const music = useRef<MusicPlayer | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const enter = () => {
    if (leaving) return;
    music.current = createMusic();
    music.current.play();
    setPlaying(true);
    setLeaving(true);
    setTimeout(() => setEntered(true), 1800);
  };
  const toggle = () => {
    if (!music.current) return;
    if (playing) music.current.pause();
    else music.current.play();
    setPlaying(!playing);
  };

  // soften the music as the final section comes into view
  useEffect(() => {
    if (!entered || !endRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (!music.current || !playing) return;
      music.current.fadeTo(e?.isIntersecting ? 0.45 : 1, 6);
    }, { threshold: 0.6 });
    io.observe(endRef.current);
    return () => io.disconnect();
  }, [entered, playing]);

  return (
    <main className="relative bg-ivory text-foreground">
      {!entered && <Opening onEnter={enter} leaving={leaving} />}
      {entered && (
        <>
          <Hero />
          <Message />
          <Person role="THE GROOM" name="SAURAV" parents="S/O Gita Kumari & Bijoy Kumar" photo={PHOTOS.groom} />
          <Person role="THE BRIDE" name="SHIPRA" parents="D/O Mrs. Sheela & Mr. Paramanand Singh" photo={PHOTOS.bride} flip />
          <Story />
          <Reveal3 />
          <Events />
          <Gallery />
          <Atmosphere />
          <Venue />
          <div ref={endRef}><Finale /></div>
          <button
            onClick={toggle}
            aria-label={playing ? "Pause music" : "Play music"}
            className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-rose/80 text-gold backdrop-blur-md transition hover:bg-rose"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            {playing && <span className="absolute inset-0 animate-ping rounded-full border border-gold/40 [animation-duration:3s]" />}
          </button>
        </>
      )}
    </main>
  );
}

function Opening({ onEnter, leaving }: { onEnter: () => void; leaving: boolean }) {
  return (
    <section
      className={`fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-ivory transition-all duration-[1800ms] ease-out ${leaving ? "scale-110 opacity-0 blur-sm" : ""}`}
    >
      <img src={opening} alt="" width={1024} height={1792} className="absolute inset-0 h-full w-full object-cover animate-kenburns" />
      <div className="absolute inset-0 bg-ivory/30" />
      <Particles count={14} />
      <div className="relative z-10 mx-auto -mt-[12vh] flex max-w-md flex-col items-center px-8 text-center">
        <div className="space-y-2 font-deva text-rose">
          {SHLOKA.map((l, i) => (
            <Reveal key={i} delay={400 + i * 550}>
              <p className={i === 0 ? "mb-4 text-xl text-terracotta sm:text-2xl" : "text-2xl leading-relaxed sm:text-3xl"}>{l}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={3600}>
          <Ornament className="my-8" />
          <button
            onClick={onEnter}
            className="group rounded-full border border-gold-deep bg-rose px-9 py-4 font-caps text-sm tracking-royal text-ivory shadow-[var(--shadow-frame)] transition hover:bg-rose-deep"
          >
            <span className="animate-breathe">TAP TO ENTER</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-rose-silk px-6 text-center">
      <img src={opening} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-soft-light animate-kenburns" />
      <Particles />
      <div className="absolute inset-5 border border-gold/40" />
      <div className="absolute inset-7 border border-gold/20" />
      <div className="relative z-10">
        <Reveal><p className="font-caps text-xs tracking-royal text-champagne">THE WEDDING OF</p></Reveal>
        <Reveal delay={600}><h1 className="mt-8 font-display text-6xl font-light tracking-[0.2em] text-ivory sm:text-8xl">SHIPRA</h1></Reveal>
        <Reveal delay={1100}><p className="my-2 font-script text-5xl text-champagne">&amp;</p></Reveal>
        <Reveal delay={1600}><h1 className="font-display text-6xl font-light tracking-[0.2em] text-ivory sm:text-8xl">SAURAV</h1></Reveal>
        <Reveal delay={2200}>
          <Ornament className="my-8" />
          <p className="font-caps text-sm tracking-royal text-ivory">20 NOVEMBER 2026</p>
          <p className="mt-2 font-caps text-xs tracking-royal text-ivory/70">7:00 PM ONWARDS</p>
          <p className="mt-4 font-caps text-xs tracking-royal text-champagne">RAJGIR</p>
        </Reveal>
      </div>
    </section>
  );
}

function Message() {
  return (
    <section className="paper jaali relative flex min-h-[100svh] flex-col items-center justify-center gap-10 px-8 text-center">
      <div className="absolute bottom-8 flex gap-16 opacity-80"><Diya /><Diya /><Diya /></div>
      <Reveal><p className="font-display text-3xl italic text-rose sm:text-4xl">Some stories are written in the stars…</p></Reveal>
      <Reveal delay={900}><p className="font-display text-3xl italic text-rose sm:text-4xl">Some are written in the heart.</p></Reveal>
      <Reveal delay={1600}><Ornament /></Reveal>
      <Reveal delay={2200}><p className="font-script text-4xl text-terracotta sm:text-5xl">And some begin with two beautiful souls…</p></Reveal>
    </section>
  );
}

function Person({ role, name, parents, photo, flip }: { role: string; name: string; parents: string; photo: string | null; flip?: boolean }) {
  return (
    <section className={`relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-20 ${flip ? "paper" : "bg-rose-silk"}`}>
      <div className={`mx-auto flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row ${flip ? "md:flex-row-reverse" : ""}`}>
        <Reveal className="w-full max-w-sm">
          <div className="gold-frame rounded-t-full p-3">
            <Photo src={photo} alt={`${name.charAt(0)}${name.slice(1).toLowerCase()}`} className="aspect-[3/4] w-full rounded-t-full" />
          </div>
        </Reveal>
        <div className="text-center md:flex-1">
          <Reveal delay={300}><p className={`font-caps text-xs tracking-royal ${flip ? "text-gold-deep" : "text-gold"}`}>{role}</p></Reveal>
          <Reveal delay={700}><h2 className={`mt-4 font-display text-6xl font-light tracking-[0.18em] sm:text-7xl ${flip ? "text-rose" : "text-ivory"}`}>{name}</h2></Reveal>
          <Reveal delay={1100}>
            <Ornament className="my-6" />
            <p className={`font-display text-xl italic ${flip ? "text-muted-foreground" : "text-ivory/80"}`}>{parents}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="paper jaali relative overflow-hidden px-6 py-24 text-center">
      <Petals count={6} />
      <Reveal><p className="font-display text-3xl italic text-rose-deep sm:text-4xl">Two journeys…</p></Reveal>
      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center">
        {PHOTOS.couple.slice(1, 3).map((p, k) => (
          <Reveal key={k} delay={k * 500} className={`w-[78%] max-w-xs ${k === 1 ? "sm:mt-24" : ""}`}>
            <div className="gold-frame rounded-t-[9rem] bg-ivory p-2.5">
              <Photo src={p} alt="Shipra and Saurav" className="aspect-[3/4] w-full rounded-t-[8.5rem]" />
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={300} className="mt-14"><p className="font-display text-3xl italic text-rose-deep sm:text-4xl">Two families…</p></Reveal>
      <Reveal delay={600} className="mt-4"><p className="font-display text-3xl text-gold-deep sm:text-4xl">One beautiful beginning.</p></Reveal>
      <Reveal delay={1200} className="mt-8"><Ornament className="mb-4" /><p className="font-script text-4xl text-terracotta">And now, they begin their forever…</p></Reveal>
    </section>
  );
}

function Reveal3() {
  return (
    <section className="relative flex min-h-[110svh] items-center justify-center overflow-hidden bg-rose-silk px-6 text-center">
      <Particles count={26} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl animate-breathe" />
      <div className="relative z-10">
        <Reveal><h2 className="font-display text-6xl font-light tracking-[0.22em] text-ivory sm:text-8xl">SHIPRA</h2></Reveal>
        <Reveal delay={900}><p className="my-6 font-caps text-sm tracking-royal text-ivory/80">WEDS</p></Reveal>
        <Reveal delay={1800}><h2 className="font-display text-6xl font-light tracking-[0.22em] text-ivory sm:text-8xl">SAURAV</h2></Reveal>
        <Reveal delay={2800}>
          <Ornament className="my-10" />
          <p className="font-display text-3xl tracking-[0.2em] text-ivory">20 NOVEMBER 2026</p>
          <p className="mt-3 font-caps text-xs tracking-royal text-ivory/70">7:00 PM ONWARDS</p>
          <p className="mt-5 font-caps text-sm tracking-royal text-champagne">RAJGIR</p>
        </Reveal>
      </div>
    </section>
  );
}

function EventCard({ title, date, time, children }: { title: string; date: string; time: string; children?: React.ReactNode }) {
  return (
    <div className="gold-frame paper rounded-sm px-6 py-12 text-center">
      {children}
      <h3 className="font-display text-3xl tracking-[0.2em] text-rose">{title}</h3>
      <Ornament className="my-5 w-32" />
      <p className="font-caps text-xs tracking-royal text-foreground">{date}</p>
      <p className="mt-2 font-caps text-xs tracking-royal text-muted-foreground">{time}</p>
      <p className="mt-4 font-caps text-xs tracking-royal text-gold-deep">RAJGIR</p>
    </div>
  );
}

function Events() {
  return (
    <section className="paper relative px-6 py-24">
      <Reveal className="text-center">
        <p className="font-script text-4xl text-terracotta">Wedding Celebrations</p>
        <Ornament className="mt-4" />
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2">
        <Reveal><EventCard title="MEHENDI" date="19 NOVEMBER 2026" time="10:00 AM"><Leaf /></EventCard></Reveal>
        <Reveal delay={300}><EventCard title="HALDI" date="20 NOVEMBER 2026" time="11:00 AM"><Leaf className="text-gold" /></EventCard></Reveal>
      </div>
      <Reveal className="mx-auto mt-8 max-w-4xl">
        <div className="gold-frame relative overflow-hidden rounded-sm bg-rose-silk px-6 py-16 text-center">
          <Particles count={12} />
          <div className="relative flex justify-center gap-10"><Diya /><Diya /><Diya /></div>
          <div className="relative mt-6 space-y-3 font-display text-2xl tracking-[0.2em] sm:text-3xl">
            <Reveal delay={200}><p className="text-ivory">SANGEET</p></Reveal>
            <Reveal delay={800}><p className="text-ivory">WEDDING CEREMONY</p></Reveal>
            <Reveal delay={1400}><p className="text-ivory">JAIMALA</p></Reveal>
          </div>
          <Ornament className="relative my-6" />
          <p className="relative font-caps text-xs tracking-royal text-ivory">20 NOVEMBER 2026</p>
          <p className="relative mt-2 font-caps text-xs tracking-royal text-ivory/70">7:00 PM ONWARDS</p>
          <p className="relative mt-4 font-caps text-xs tracking-royal text-champagne">RAJGIR</p>
        </div>
      </Reveal>
    </section>
  );
}

function Leaf({ className = "text-leaf" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`mx-auto mb-5 h-9 w-9 ${className}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M20 36V10M20 10c-8 4-10 12-6 18M20 10c8 4 10 12 6 18M20 18c-4 1-6 4-6 7M20 18c4 1 6 4 6 7" />
      <circle cx="20" cy="7" r="2.5" fill="currentColor" fillOpacity=".4" />
    </svg>
  );
}

function Gallery() {
  const n = PHOTOS.couple.length;
  const [i, setI] = useStableIndex(n, 7000);
  return (
    <section className="relative overflow-hidden bg-rose-silk px-5 py-24 text-center">
      <Particles count={8} />
      <Reveal>
        <p className="font-caps text-xs tracking-royal text-champagne">CAPTURED MOMENTS</p>
        <p className="mt-3 font-display text-4xl tracking-[0.2em] text-ivory">OUR STORY</p>
        <Ornament className="mt-5" />
      </Reveal>
      <Reveal className="relative mx-auto mt-12 max-w-md">
        <div className="gold-frame relative aspect-[3/4] w-full bg-ivory p-3">
          {PHOTOS.couple.map((p, k) => (
            <div key={k} className={`absolute inset-3 transition-opacity duration-[2200ms] ease-in-out ${i === k ? "opacity-100" : "opacity-0"}`}>
              <Photo src={p} alt={`Shipra & Saurav · ${k + 1}`} className="h-full w-full" />
            </div>
          ))}
        </div>
      </Reveal>
      <div className="mt-8 flex items-center justify-center gap-3">
        {PHOTOS.couple.map((p, k) => (
          <button key={k} aria-label={`Photo ${k + 1}`} onClick={() => setI(k)} className={`h-14 w-11 overflow-hidden border transition-all duration-700 ${i === k ? "border-gold opacity-100" : "border-transparent opacity-50"}`}>
            {p && <img src={p} alt="" loading="lazy" className="h-full w-full object-cover" />}
          </button>
        ))}
      </div>
    </section>
  );
}

function Atmosphere() {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          scene.classList.add("chapter-in");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sceneRef} className="wedding-chapter relative flex min-h-[100svh] items-center justify-center overflow-hidden px-8 py-24 text-center">
      <div className="wedding-chapter__backdrop pointer-events-none absolute inset-0" aria-hidden />
      <div className="wedding-chapter__light pointer-events-none absolute inset-0" aria-hidden />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.11]" aria-hidden>
        <defs>
          <pattern id="chapter-jaali" width="112" height="112" patternUnits="userSpaceOnUse">
            <path d="M56 8c8 12 8 20 0 28-8-8-8-16 0-28zm0 68c8 8 8 16 0 28-8-12-8-20 0-28zM8 56c12-8 20-8 28 0-8 8-16 8-28 0zm68 0c8-8 16-8 28 0-12 8-20 8-28 0z" fill="none" stroke="#f0d9a8" strokeWidth=".7" />
            <circle cx="56" cy="56" r="9" fill="none" stroke="#f0d9a8" strokeWidth=".6" />
            <circle cx="56" cy="56" r="2" fill="#f0d9a8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chapter-jaali)" />
      </svg>
      <div className="pointer-events-none absolute inset-5 border border-champagne/25" aria-hidden />
      <div className="pointer-events-none absolute inset-7 border border-gold/15" aria-hidden />
      <Petals count={7} />
      <div className="wedding-chapter__diya wedding-chapter__diya--left pointer-events-none absolute bottom-16 z-10" aria-hidden>
        <Diya />
      </div>
      <div className="wedding-chapter__diya wedding-chapter__diya--right pointer-events-none absolute bottom-16 z-10" aria-hidden>
        <Diya />
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="font-display text-3xl leading-relaxed sm:text-4xl">
          <p className="wedding-chapter__title-first text-ivory">From a beautiful hello</p>
          <p className="wedding-chapter__title-second mt-1 italic text-champagne">to a lifetime of together.</p>
        </div>
        <Ornament className="wedding-chapter__ornament my-7" />
        <p className="wedding-chapter__caption font-display text-lg italic tracking-wide text-ivory/90 sm:text-xl">
          Here’s to the moments that brought them here.
        </p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#eee7dc]" aria-hidden />
    </section>
  );
}

function Venue() {
  return (
    <section className="paper flex min-h-[80svh] flex-col items-center justify-center px-8 py-24 text-center">
      <Reveal>
        <MapPin className="mx-auto h-6 w-6 text-gold-deep" strokeWidth={1.2} />
        <h2 className="mt-6 font-display text-6xl tracking-[0.25em] text-rose">RAJGIR</h2>
        <Ornament className="my-6" />
        <p className="font-caps text-sm tracking-royal">20 NOVEMBER 2026</p>
        <p className="mt-2 font-caps text-xs tracking-royal text-muted-foreground">7:00 PM ONWARDS</p>
      </Reveal>
      <Reveal delay={600}>
        <a
          href={DIRECTIONS_URL ?? "https://www.google.com/maps/search/?api=1&query=Rajgir"}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex min-h-12 items-center rounded-full border border-gold-deep bg-rose px-9 font-caps text-xs tracking-royal text-ivory transition hover:bg-rose-deep"
        >
          GET DIRECTIONS
        </a>
      </Reveal>
    </section>
  );
}

function Finale() {
  const best = PHOTOS.couple[0] ?? null;
  return (
    <section className="relative overflow-hidden bg-dusk">
      <Petals count={12} />
      <Particles count={8} />
      <Reveal className="relative">
        <FloralCorners />
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-8 py-24 text-center">
          <div className="w-[80%] max-w-sm animate-pushin">
            <div className="gold-frame rounded-t-full bg-ivory p-3">
              <Photo src={best} alt="Shipra and Saurav" className="aspect-[3/4] w-full rounded-t-full" />
            </div>
          </div>
        </div>
      </Reveal>
      <div className="relative z-10 flex flex-col items-center gap-4 px-8 pb-32 text-center">
        <Reveal delay={600}>
          <Ornament className="my-8" />
          <p className="font-display text-xl leading-relaxed text-earth">Together with our families,<br />we invite you to celebrate<br />the beginning of our forever.</p>
        </Reveal>
        <Reveal delay={800}>
          <p className="mt-12 font-display text-5xl tracking-[0.15em] text-rose-deep">SHIPRA <span className="font-script tracking-normal text-gold-deep">&amp;</span> SAURAV</p>
          <p className="mt-6 font-caps text-xs tracking-royal text-earth">20 NOVEMBER 2026</p>
          <p className="mt-2 font-caps text-xs tracking-royal text-earth/70">7:00 PM ONWARDS</p>
          <p className="mt-4 font-caps text-xs tracking-royal text-gold-deep">RAJGIR</p>
          <div className="mt-12 flex justify-center"><Diya /></div>
        </Reveal>
      </div>
      <div className="h-40 bg-gradient-to-b from-transparent to-ivory" />
    </section>
  );
}
