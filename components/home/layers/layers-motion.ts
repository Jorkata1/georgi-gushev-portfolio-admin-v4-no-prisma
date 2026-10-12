/** Small, dependency-free motion helpers shared by the layers story and its intro. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Smoothstep of `value` between `start` and `end`, clamped to 0…1. */
export function smooth(value: number, start: number, end: number): number {
  const t = clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Linear progress of `time` through the window `start`…`end`, clamped to 0…1. */
export function progressIn(time: number, start: number, end: number): number {
  return clamp((time - start) / (end - start), 0, 1);
}

/** Gentle start and a long, soft landing. */
export function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

const DECODE_TICK_MS = 50;

export type Decoder = { cancel: () => void };

/**
 * Types `text` into `element` as if decoded from random glyphs: characters settle left to right,
 * the unsettled ones change every ~50 ms. Returns a handle to stop it early.
 */
export function decodeText(
  element: HTMLElement,
  text: string,
  glyphs: string,
  durationMs: number,
  delayMs: number,
): Decoder {
  const begin = performance.now() + delayMs;
  let lastSwap = 0;
  let frameId = 0;

  const tick = (now: number) => {
    if (now - lastSwap >= DECODE_TICK_MS || now - begin >= durationMs) {
      lastSwap = now;
      const t = clamp((now - begin) / durationMs, 0, 1);
      const settled = Math.floor((1 - Math.pow(1 - t, 2)) * text.length);
      let output = text.slice(0, settled);
      for (let index = settled; index < text.length; index += 1) {
        output += text[index] === " " ? " " : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      element.textContent = output;
      if (t >= 1) {
        element.textContent = text;
        return;
      }
    }
    frameId = requestAnimationFrame(tick);
  };

  frameId = requestAnimationFrame(tick);
  return {
    cancel: () => {
      cancelAnimationFrame(frameId);
      element.textContent = text;
    },
  };
}

/** Writes a style property only when its value actually changes. */
export function createStyleWriter() {
  const written = new WeakMap<HTMLElement, Map<string, string>>();
  return (element: HTMLElement, property: string, value: string) => {
    let cache = written.get(element);
    if (!cache) {
      cache = new Map();
      written.set(element, cache);
    }
    if (cache.get(property) === value) return;
    cache.set(property, value);
    if (property === "transform") element.style.transform = value;
    else element.style.setProperty(property, value);
  };
}