import { afterEach, describe, expect, it, vi } from "vitest";

import { createMusic } from "./music";

describe("wedding music player", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("uses one audio element, reports playback state, and resumes without seeking", async () => {
    const audio = document.createElement("audio");
    let paused = true;
    let currentTime = 0;
    Object.defineProperties(audio, {
      paused: { configurable: true, get: () => paused },
      currentTime: {
        configurable: true,
        get: () => currentTime,
        set: (value: number) => {
          currentTime = value;
        },
      },
    });

    vi.spyOn(audio, "play").mockImplementation(() => {
      paused = false;
      audio.dispatchEvent(new Event("playing"));
      return Promise.resolve();
    });
    vi.spyOn(audio, "pause").mockImplementation(() => {
      paused = true;
      audio.dispatchEvent(new Event("pause"));
    });
    const audioConstructor = vi.fn(function MockAudio() {
      return audio;
    });
    vi.stubGlobal("Audio", audioConstructor);

    const player = createMusic();
    expect(createMusic()).toBe(player);
    const states: boolean[] = [];
    const unsubscribe = player.subscribe(() => states.push(player.isPlaying()));

    currentTime = 23;
    await player.play();
    expect(player.isPlaying()).toBe(true);
    expect(currentTime).toBe(23);
    expect(audio.volume).toBe(0.5);

    player.pause();
    expect(player.isPlaying()).toBe(false);
    currentTime = 27;
    await player.play();
    expect(currentTime).toBe(27);
    expect(audioConstructor).toHaveBeenCalledTimes(1);
    expect(audio.play).toHaveBeenCalledTimes(2);
    expect(states).toEqual([true, false, true]);

    paused = true;
    currentTime = 61;
    audio.dispatchEvent(new Event("ended"));
    expect(currentTime).toBe(0);
    expect(audio.play).toHaveBeenCalledTimes(3);

    unsubscribe();
  });
});
