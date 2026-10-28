import { MUSIC_URL } from "./media";

export interface MusicPlayer {
  play: () => void;
  pause: () => void;
  fadeTo: (v: number, secs: number) => void;
}

/** Soft generated ambience: tanpura drone + slow pentatonic santoor-like plucks + string pad. */
function createSynth(): MusicPlayer {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;
  // simple echo "hall"
  const delay = ctx.createDelay(2);
  delay.delayTime.value = 0.42;
  const fb = ctx.createGain();
  fb.gain.value = 0.38;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 2400;
  delay.connect(fb).connect(lp).connect(delay);
  lp.connect(master);
  master.connect(ctx.destination);

  const sa = 146.83; // D3
  const ratios = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2, 3];

  // drone
  const drone = (freq: number, gain: number) => {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 520;
    const g = ctx.createGain();
    g.gain.value = gain;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08 + Math.random() * 0.05;
    const lg = ctx.createGain();
    lg.gain.value = gain * 0.6;
    lfo.connect(lg).connect(g.gain);
    o.connect(f).connect(g).connect(master);
    o.start();
    lfo.start();
  };
  drone(sa / 2, 0.035);
  drone((sa * 3) / 4, 0.025);
  drone(sa, 0.03);
  drone(sa * 1.003, 0.02);

  const pluck = (freq: number, t: number, vel = 0.12) => {
    const o = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    o.type = "triangle";
    o2.type = "sine";
    o.frequency.value = freq;
    o2.frequency.value = freq * 2.01;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 3.2);
    o.connect(g);
    o2.connect(g);
    g.connect(master);
    g.connect(delay);
    o.start(t);
    o2.start(t);
    o.stop(t + 3.4);
    o2.stop(t + 3.4);
  };
  const pad = (freq: number, t: number, dur: number) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.025, t + dur * 0.4);
    g.gain.linearRampToValueAtTime(0, t + dur);
    [1, 1.004, 0.996].forEach((d) => {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = freq * d;
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = 900;
      o.connect(f).connect(g);
      o.start(t);
      o.stop(t + dur + 0.1);
    });
    g.connect(master);
    g.connect(delay);
  };

  let timer: number | undefined;
  let next = 0;
  let step = 0;
  const schedule = () => {
    while (next < ctx.currentTime + 2) {
      const phrase = Math.floor(step / 8) % 4;
      const idx = [0, 2, 4, 3, 5, 4, 2, 1][step % 8]! + (phrase === 2 ? 2 : 0);
      if (Math.random() > 0.18) pluck(sa * 2 * ratios[idx % ratios.length]!, next, 0.06 + Math.random() * 0.05);
      if (step % 16 === 0) {
        const root = [1, 4 / 3, 3 / 2, 1][phrase]!;
        pad(sa * root, next, 7);
        pad(sa * root * 1.5, next, 7);
      }
      next += step % 4 === 3 ? 0.9 : 0.6;
      step++;
    }
  };

  return {
    play: () => {
      void ctx.resume();
      if (!next) next = ctx.currentTime + 0.2;
      schedule();
      timer = window.setInterval(schedule, 500);
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 3);
    },
    pause: () => {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      window.clearInterval(timer);
      window.setTimeout(() => void ctx.suspend(), 900);
    },
    fadeTo: (v, secs) => {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.55 * v, ctx.currentTime + secs);
    },
  };
}

function createFile(url: string): MusicPlayer {
  const a = new Audio(url);
  a.loop = true;
  a.volume = 0;
  let raf = 0;
  const ramp = (to: number, secs: number) => {
    cancelAnimationFrame(raf);
    const from = a.volume;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / (secs * 1000));
      a.volume = from + (to - from) * k;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  };
  return {
    play: () => {
      void a.play();
      ramp(0.5, 3);
    },
    pause: () => a.pause(),
    fadeTo: (v, s) => ramp(0.5 * v, s),
  };
}

export function createMusic(): MusicPlayer {
  return MUSIC_URL ? createFile(MUSIC_URL) : createSynth();
}
