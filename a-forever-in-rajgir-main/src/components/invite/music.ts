import { MUSIC_URL } from "./media";

export interface MusicPlayer {
  play: () => Promise<void>;
  pause: () => void;
  isPlaying: () => boolean;
  subscribe: (listener: () => void) => () => void;
}

let sharedPlayer: MusicPlayer | null = null;

function createFile(url: string): MusicPlayer {
  const audio = new Audio(url);
  audio.loop = false;
  audio.preload = "metadata";
  audio.volume = 0.5;
  let pendingPlay: Promise<void> | null = null;
  const listeners = new Set<() => void>();

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  const play = () => {
    if (!audio.paused) return Promise.resolve();
    if (pendingPlay) return pendingPlay;
    pendingPlay = audio.play().finally(() => {
      pendingPlay = null;
    });
    return pendingPlay;
  };

  audio.addEventListener("playing", notify);
  audio.addEventListener("pause", notify);
  audio.addEventListener("error", notify);
  audio.addEventListener("ended", () => {
    notify();
    audio.currentTime = 0;
    void play().catch(() => undefined);
  });

  return {
    play,
    pause: () => {
      audio.pause();
    },
    isPlaying: () => !audio.paused,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function createMusic(): MusicPlayer {
  if (!sharedPlayer) sharedPlayer = createFile(MUSIC_URL);
  return sharedPlayer;
}
