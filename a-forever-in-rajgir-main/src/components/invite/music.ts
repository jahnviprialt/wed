import { MUSIC_URL } from "./media";

export interface MusicPlayer {
  play: () => Promise<void>;
  pause: () => void;
}

let sharedPlayer: MusicPlayer | null = null;

function createFile(url: string): MusicPlayer {
  const audio = new Audio(url);
  audio.loop = false;
  audio.preload = "metadata";
  audio.volume = 0;
  let started = false;
  let animationFrame = 0;
  let pendingPlay: Promise<void> | null = null;

  const rampVolume = (to: number, seconds: number) => {
    cancelAnimationFrame(animationFrame);
    const from = audio.volume;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / (seconds * 1000));
      audio.volume = from + (to - from) * progress;
      if (progress < 1) animationFrame = requestAnimationFrame(tick);
    };
    animationFrame = requestAnimationFrame(tick);
  };

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    void audio
      .play()
      .then(() => rampVolume(0.5, 2))
      .catch((error: unknown) => {
        console.error("Wedding music could not be restarted.", error);
      });
  });

  return {
    play: () => {
      if (pendingPlay) return pendingPlay;
      if (!started) audio.currentTime = 0;
      pendingPlay = audio
        .play()
        .then(() => {
          started = true;
          rampVolume(0.5, 2);
        })
        .finally(() => {
          pendingPlay = null;
        });
      return pendingPlay;
    },
    pause: () => {
      cancelAnimationFrame(animationFrame);
      audio.pause();
    },
  };
}

export function createMusic(): MusicPlayer {
  if (!sharedPlayer) sharedPlayer = createFile(MUSIC_URL);
  return sharedPlayer;
}
