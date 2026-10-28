import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import opening from "@/assets/opening.jpg";
import { DIRECTIONS_URL, PHOTOS } from "@/components/invite/media";
import { createMusic, type MusicPlayer } from "@/components/invite/music";
import {
  CeremonyParticles,
  FloralCorners,
  HaldiArtwork,
  MandapArtwork,
  MehendiArtwork,
  Ornament,
  Particles,
  Petals,
  Photo,
  Reveal,
} from "@/components/invite/parts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shipra & Saurav — Wedding Invitation · 20 November 2026" },
      {
        name: "description",
        content:
          "With joy, Shipra & Saurav invite you to celebrate their wedding on 20 November 2026, 7:00 PM onwards, in Rajgir.",
      },
      { property: "og:title", content: "Shipra weds Saurav · 20 November 2026" },
      {
        property: "og:description",
        content:
          "You are warmly invited to the wedding of Shipra & Saurav — 20 November 2026, 7:00 PM onwards, Rajgir.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const SHLOKA = [
  "॥ ॐ श्री गणेशाय नमः ॥",
  "वक्रतुण्ड महाकाय",
  "सूर्यकोटि समप्रभ ।",
  "निर्विघ्नं कुरु मे देव",
  "सर्वकार्येषु सर्वदा ॥",
];

function Invitation() {
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const music = useRef<MusicPlayer | null>(null);
  const brideSection = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const player = createMusic();
    music.current = player;
    let active = true;
    const updatePlaying = () => {
      if (active) setPlaying(player.isPlaying());
    };
    const unsubscribe = player.subscribe(updatePlaying);
    let waitingForInteraction = true;

    const removeInteractionListeners = () => {
      if (!waitingForInteraction) return;
      waitingForInteraction = false;
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    const attemptPlay = () => {
      if (player.isPlaying()) {
        removeInteractionListeners();
        updatePlaying();
        return;
      }

      void player
        .play()
        .then(() => {
          removeInteractionListeners();
          updatePlaying();
        })
        .catch(() => {
          updatePlaying();
        });
    };
    const handleFirstInteraction = () => attemptPlay();

    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("scroll", handleFirstInteraction, { passive: true });
    window.addEventListener("keydown", handleFirstInteraction);
    updatePlaying();
    attemptPlay();

    return () => {
      active = false;
      removeInteractionListeners();
      unsubscribe();
      music.current = null;
    };
  }, []);

  const enter = () => {
    if (entered) return;
    setEntered(true);
    window.setTimeout(() => {
      brideSection.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }, 50);
  };

  const toggle = () => {
    if (playing) {
      music.current?.pause();
    } else {
      void music.current?.play().catch(() => undefined);
    }
  };

  return (
    <main className="relative bg-ivory text-foreground">
      <Opening onEnter={enter} entered={entered} />
      {entered && (
        <>
          <BrideSection sectionRef={brideSection} />
          <GroomSection />
          <StorySection />
          <EventsSection />
          <LoveQuoteSection />
          <Finale />
        </>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className={`music-control fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-rose/80 text-gold backdrop-blur-md transition hover:bg-rose ${playing ? "music-control--playing" : ""}`}
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        {playing && (
          <span className="music-note music-note--one" aria-hidden>
            ♪
          </span>
        )}
        {playing && (
          <span className="music-note music-note--two" aria-hidden>
            ♫
          </span>
        )}
      </button>
    </main>
  );
}

function Opening({ onEnter, entered }: { onEnter: () => void; entered: boolean }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowDetails(true), 8500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="invitation-opening paper jaali relative flex min-h-[100svh] scroll-mt-0 items-center justify-center overflow-x-hidden px-4 py-4 text-center sm:px-6">
      <img
        src={opening}
        alt=""
        width={1024}
        height={1792}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="opening-art pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="opening-shade pointer-events-none absolute inset-0" />
      {!entered && <Particles count={8} />}
      <div className="opening-card relative z-10 mx-auto flex w-full max-w-md flex-col items-center justify-center">
        <div className="space-y-0.5 font-deva text-rose">
          {SHLOKA.map((line, index) => (
            <p
              key={line + index}
              className={`opening-line ${index === 0 ? "mb-2 text-base text-terracotta sm:text-xl" : "text-lg leading-snug sm:text-2xl"}`}
              style={{ animationDelay: `${index * 1.7}s` }}
            >
              {line}
            </p>
          ))}
        </div>
        <div className={`opening-details ${showDetails ? "opening-details--visible" : ""}`}>
          <Ornament className="my-4" />
          <h1 className="mb-1 font-display text-4xl tracking-[0.18em] text-rose sm:text-6xl">
            SHIPRA
          </h1>
          <p className="mb-1 font-script text-4xl text-terracotta sm:text-5xl">&amp;</p>
          <h2 className="mb-3 font-display text-4xl tracking-[0.18em] text-rose sm:text-6xl">
            SAURAV
          </h2>
          <p className="font-caps text-xs tracking-[0.28em] text-rose sm:text-sm">
            20 NOVEMBER 2026
          </p>
          <p className="mt-1 font-caps text-[9px] tracking-[0.24em] text-rose/80">
            7:00 PM ONWARDS
          </p>
          <p className="mt-3 max-w-full break-words font-caps text-[9px] tracking-[0.2em] text-terracotta sm:text-[10px]">
            ARUNYA GAUTAM VIHAR HOTEL &amp; RESORT
          </p>
          <p className="mt-1 font-caps text-[9px] tracking-[0.3em] text-terracotta">RAJGIR</p>
          <div className="opening-actions mt-4 flex flex-col items-center gap-2">
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="opening-action opening-action--map inline-flex h-11 w-44 items-center justify-center rounded-full border border-gold-deep bg-rose px-7 font-caps text-[9px] tracking-[0.28em] text-ivory shadow-[var(--shadow-frame)] transition hover:bg-rose-deep"
            >
              VIEW MAP
            </a>
            {!entered && (
              <button
                type="button"
                onClick={onEnter}
                className="opening-action opening-action--enter inline-flex h-11 w-44 items-center justify-center rounded-full border border-gold-deep bg-rose px-7 font-caps text-[9px] tracking-[0.28em] text-ivory shadow-[var(--shadow-frame)] transition hover:bg-rose-deep"
              >
                TAP TO ENTER
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrideSection({ sectionRef }: { sectionRef: React.Ref<HTMLElement> }) {
  return (
    <section
      ref={sectionRef}
      className="celebrant-section celebrant-section--bride paper relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-20"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row-reverse md:items-center">
        <Reveal className="w-full max-w-sm">
          <div className="portrait-frame portrait-frame--bride">
            <Photo src={PHOTOS.bride} alt="Shipra" className="aspect-[3/4] w-full rounded-t-full" />
          </div>
        </Reveal>
        <div className="text-center md:flex-1 md:text-left">
          <Reveal delay={300}>
            <p className="font-caps text-xs tracking-royal text-gold-deep">THE BRIDE</p>
          </Reveal>
          <Reveal delay={700}>
            <h2 className="mt-4 font-display text-6xl font-light tracking-[0.18em] text-rose sm:text-7xl">
              SHIPRA
            </h2>
          </Reveal>
          <Reveal delay={1100}>
            <Ornament className="my-6" />
            <p className="font-display text-lg italic text-muted-foreground sm:text-xl">
              D/O Mrs. Sheela &amp; Mr. Paramanand Singh
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GroomSection() {
  return (
    <section className="celebrant-section celebrant-section--groom paper relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center">
        <Reveal className="w-full max-w-sm">
          <div className="portrait-frame portrait-frame--groom">
            <Photo src={PHOTOS.groom} alt="Saurav" className="aspect-[3/4] w-full rounded-t-full" />
          </div>
        </Reveal>
        <div className="text-center md:flex-1 md:text-left">
          <Reveal delay={300}>
            <p className="font-caps text-xs tracking-royal text-leaf">THE GROOM</p>
          </Reveal>
          <Reveal delay={700}>
            <h2 className="mt-4 font-display text-6xl font-light tracking-[0.18em] text-leaf sm:text-7xl">
              SAURAV
            </h2>
          </Reveal>
          <Reveal delay={1100}>
            <Ornament className="my-6" />
            <p className="font-display text-lg italic text-muted-foreground sm:text-xl">
              S/O Gita Kumari &amp; Bijoy Kumar
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="family-story paper relative overflow-hidden px-6 py-24">
      <Petals count={6} />
      <div className="story-layout mx-auto grid max-w-6xl items-center gap-12">
        <Reveal className="story-copy text-center md:text-left">
          <p className="font-caps text-xs tracking-royal text-terracotta">A STORY IN THE MAKING</p>
          <p className="mt-5 font-display text-3xl italic leading-relaxed text-rose-deep sm:text-4xl">
            Two journeys,
            <br />
            two families,
            <br />
            one beautiful beginning.
          </p>
          <Ornament className="my-6 md:mx-0" />
          <p className="font-display text-lg italic text-muted-foreground sm:text-xl">
            And now, they begin their forever...
          </p>
        </Reveal>
        <div className="story-gallery grid grid-cols-3 items-center">
          {PHOTOS.couple.map((photo, index) => (
            <Reveal key={index} delay={index * 150} className="story-photo-reveal">
              <div className={`story-photo story-photo--${index + 1}`}>
                <Photo
                  src={photo}
                  alt={`Shipra and Saurav · family moment ${index + 1}`}
                  className="aspect-[3/4] w-full rounded-[inherit]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventScene({
  title,
  date,
  time,
  detail,
  children,
  tone,
}: {
  title: string;
  date: string;
  time: string;
  detail?: string;
  children?: React.ReactNode;
  tone: "mehendi" | "haldi" | "wedding";
}) {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const observer = new IntersectionObserver(
      ([entry]) => scene.classList.toggle("is-active", Boolean(entry?.isIntersecting)),
      { rootMargin: "80px 0px" },
    );
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return (
    <article ref={sceneRef} className={`event-scene event-scene--${tone} relative`}>
      <CeremonyParticles kind={tone} count={tone === "wedding" ? 16 : 12} />
      <div
        className={`event-scene__art relative z-10 ${tone === "wedding" ? "event-scene__art--wedding" : ""}`}
      >
        {children}
      </div>
      <div
        className={`event-scene__copy relative z-10 ${tone === "wedding" ? "event-scene__copy--wedding" : ""}`}
      >
        <h3 className="font-display text-3xl tracking-[0.16em]">{title}</h3>
        <Ornament className="my-4 w-32" />
        <p className="font-caps text-xs tracking-royal">{date}</p>
        <p className="mt-2 font-caps text-xs tracking-royal">{time}</p>
        {detail && <p className="mt-4 font-caps text-[10px] tracking-[0.28em]">{detail}</p>}
      </div>
    </article>
  );
}

function EventsSection() {
  return (
    <section className="celebration-events paper relative overflow-hidden px-6 py-24">
      <Reveal className="events-heading mx-auto max-w-6xl">
        <p className="font-script text-5xl text-terracotta">Wedding Celebrations</p>
        <Ornament className="mt-4" />
      </Reveal>

      <div className="events-flow mx-auto mt-10 max-w-6xl">
        <Reveal>
          <EventScene
            tone="mehendi"
            title="MEHENDI"
            date="19 NOVEMBER 2026"
            time="10:00 AM"
            detail="RAJGIR"
          >
            <MehendiArtwork />
          </EventScene>
        </Reveal>
        <Reveal delay={200}>
          <EventScene
            tone="haldi"
            title="HALDI"
            date="20 NOVEMBER 2026"
            time="11:00 AM"
            detail="RAJGIR"
          >
            <HaldiArtwork />
          </EventScene>
        </Reveal>

        <Reveal>
          <EventScene
            tone="wedding"
            title="SANGEET • WEDDING CEREMONY • JAIMALA"
            date="20 NOVEMBER 2026"
            time="7:00 PM ONWARDS"
            detail="RAJGIR"
          >
            <MandapArtwork />
          </EventScene>
        </Reveal>
      </div>
    </section>
  );
}

function LoveQuoteSection() {
  return (
    <section className="love-quote paper relative flex min-h-[55svh] items-center justify-center overflow-hidden px-6 py-20 text-center">
      <Petals count={5} />
      <div className="love-quote__copy relative z-10 max-w-3xl px-8 py-12 sm:px-16">
        <p className="font-display text-3xl italic leading-relaxed text-rose-deep sm:text-4xl">
          From a beautiful hello
          <br />
          to a lifetime of together.
        </p>
        <Ornament className="my-6" />
        <p className="font-display text-lg italic text-muted-foreground sm:text-xl">
          Here’s to the moments that brought them here.
        </p>
      </div>
    </section>
  );
}

function Finale() {
  const photo = PHOTOS.couple[0] ?? null;

  return (
    <section className="wedding-finale paper relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <Petals count={8} />
      <Reveal className="pointer-events-none absolute inset-0 z-0">
        <FloralCorners className="finale-floral" />
      </Reveal>
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
        <Reveal className="finale-photo w-[48%] max-w-[13rem]">
          <div className="finale-photo-frame">
            <Photo
              src={photo}
              alt="Shipra and Saurav"
              className="aspect-[3/4] w-full rounded-t-full"
            />
          </div>
        </Reveal>
        <Reveal delay={250}>
          <Ornament className="my-8" />
          <p className="finale-invitation font-display text-xl leading-relaxed sm:text-2xl">
            Together with our families,
            <br />
            we invite you to celebrate
            <br />
            the beginning of our forever.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <p className="finale-names mt-10 whitespace-nowrap font-display text-[1.65rem] tracking-[0.08em] sm:text-5xl sm:tracking-[0.12em]">
            SHIPRA <span className="font-script tracking-normal">&amp;</span> SAURAV
          </p>
          <p className="finale-date mt-6 font-caps text-xs tracking-royal">20 NOVEMBER 2026</p>
          <p className="finale-time mt-2 font-caps text-[10px] tracking-[0.28em]">
            7:00 PM ONWARDS
          </p>
          <p className="finale-location mt-4 font-caps text-[10px] tracking-[0.3em]">RAJGIR</p>
        </Reveal>
      </div>
    </section>
  );
}
