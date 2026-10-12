import { STACK_ORDER } from "@/components/home/layers/layers-config";
import {
  decodeText,
  easeInOutSine,
  easeOutCubic,
  easeOutQuint,
  lerp,
  progressIn,
  type Decoder,
} from "@/components/home/layers/layers-motion";

/*
 * Intro: one continuous move from an empty screen into the hero.
 *   0.15–0.85 s  a gold line draws the surface layer from the middle of its top edge outwards
 *   0.55–1.75 s  the stack turns to the hero angle while layers 02–05 peel down from under the surface
 *   1.95–2.35 s  the layers close up into one plane
 *   2.25–2.75 s  a gold edge sweeps across and the finished site appears behind it
 * Any scroll, key or tap finishes it at once. Shown once per browser session.
 */
const INTRO_MS = 2800;
const INTRO_GAP = 54;
const SHOW_HERO_AT = 2150;
const SHOW_COPY_AT = 2450;
const SESSION_KEY = "gdx-layers-intro";
const SKIP_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
/** Where the middle of the top edge sits along the rounded rectangle's outline (the path starts after the top-left corner). */
const RECT_TOP_MIDDLE = (280 - 14) / (2 * (560 + 350) - 8 * 14 + 2 * Math.PI * 14);

export type HeroPose = { rx: number; rz: number; float: number; fit: number };

type IntroOptions = {
  intro: HTMLElement;
  label: HTMLElement;
  labelText: HTMLElement;
  glyphs: string;
  getHeroPose: () => HeroPose;
  /** The real stack becomes visible underneath the (still opaque) intro layers. */
  onShowHero: () => void;
  /** The copy and rail fade in; the hero entrance replays. */
  onShowCopy: () => void;
};

type IntroPlate = {
  element: HTMLElement;
  depth: number;
  number: HTMLElement | null;
  outline: SVGRectElement | null;
  fill: HTMLElement | null;
  sweep: HTMLElement | null;
};

export function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberIntro() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* Storage blocked: the intro may show again on the next visit; nothing else depends on it. */
  }
}

export function playIntro(options: IntroOptions): { destroy: () => void } {
  const { intro, label, labelText, glyphs, getHeroPose, onShowHero, onShowCopy } = options;
  const plates: IntroPlate[] = Array.from(intro.querySelectorAll<HTMLElement>("[data-intro-layer]")).map((element) => {
    const layer = Number(element.dataset.introLayer);
    return {
      element,
      depth: STACK_ORDER.length - 1 - STACK_ORDER.indexOf(layer),
      number: element.querySelector<HTMLElement>("b"),
      outline: element.querySelector<SVGRectElement>("rect"),
      fill: element.querySelector<HTMLElement>("[data-intro-fill]"),
      sweep: element.querySelector<HTMLElement>("[data-intro-sweep]"),
    };
  });

  const start = performance.now();
  let finished = false;
  let heroShown = false;
  let copyShown = false;
  let frameId = 0;
  let cleanupTimer = 0;
  const decoder: Decoder = decodeText(labelText, labelText.textContent ?? "", glyphs, 1000, 250);
  intro.hidden = false;

  function showHero() {
    if (heroShown) return;
    heroShown = true;
    onShowHero();
  }

  function showCopy() {
    if (copyShown) return;
    copyShown = true;
    onShowCopy();
  }

  function finish(skipped: boolean) {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(frameId);
    SKIP_EVENTS.forEach((type) => window.removeEventListener(type, skip, true));
    decoder.cancel();
    showHero();
    showCopy();
    label.style.transition = "opacity 300ms var(--gl-ease-soft)";
    label.style.opacity = "0";
    intro.style.transition = `opacity ${skipped ? 350 : 200}ms var(--gl-ease-soft)`;
    intro.style.opacity = "0";
    cleanupTimer = window.setTimeout(() => {
      intro.hidden = true;
      intro.removeAttribute("style");
      label.removeAttribute("style");
    }, 400);
    rememberIntro();
  }

  function skip() {
    finish(true);
  }

  function renderPlate(plate: IntroPlate, t: number, close: number, sweep: number, sweepX: number) {
    const { depth } = plate;
    const peelStart = 900 + (depth - 1) * 150;
    const peel = depth === 0 ? 1 : easeOutQuint(progressIn(t, peelStart, peelStart + 750));
    const z = -depth * INTRO_GAP * peel * (1 - close);
    const opacity = depth === 0 ? progressIn(t, 120, 260) : Math.min(1, peel * 1.6);
    plate.element.style.opacity = opacity.toFixed(3);
    plate.element.style.transform = `translateZ(${z.toFixed(1)}px)`;
    if (plate.number) {
      const numberIn = depth === 0 ? progressIn(t, 700, 1000) : progressIn(peel, 0.5, 1);
      plate.number.style.opacity = (numberIn * (1 - close)).toFixed(3);
    }
    /* The sweep cuts every layer at the same edge, so the finished site shows through cleanly. */
    const mask = sweep > 0 ? `linear-gradient(90deg, transparent ${sweepX.toFixed(2)}%, #000 ${(sweepX + 0.01).toFixed(2)}%)` : "";
    plate.element.style.setProperty("-webkit-mask-image", mask);
    plate.element.style.setProperty("mask-image", mask);
    if (depth !== 0) return;
    const draw = easeInOutSine(progressIn(t, 150, 850));
    plate.outline?.setAttribute("stroke-dasharray", `${draw.toFixed(4)} ${(1 - draw + 0.0001).toFixed(4)}`);
    plate.outline?.setAttribute("stroke-dashoffset", (-(RECT_TOP_MIDDLE - draw / 2)).toFixed(4));
    if (plate.fill) plate.fill.style.opacity = (progressIn(t, 600, 1100) * (1 - close)).toFixed(3);
    if (plate.sweep) {
      plate.sweep.style.opacity = sweep > 0 && sweep < 1 ? Math.sin(Math.PI * sweep).toFixed(3) : "0";
      plate.sweep.style.left = `${sweepX.toFixed(2)}%`;
    }
  }

  const tick = (now: number) => {
    if (finished) return;
    const t = now - start;
    const pose = getHeroPose();
    /* Turn from facing the viewer to exactly the hero pose. */
    const turn = easeInOutSine(progressIn(t, 550, 1750));
    const scale = pose.fit * lerp(0.92, 1, easeOutCubic(progressIn(t, 0, 1750)));
    intro.style.transform =
      `translateY(${(pose.float * turn).toFixed(1)}px) scale(${scale.toFixed(4)}) ` +
      `rotateX(${(pose.rx * turn).toFixed(2)}deg) rotateZ(${(pose.rz * turn).toFixed(2)}deg)`;

    const close = easeInOutSine(progressIn(t, 1950, 2350));
    const sweep = progressIn(t, 2250, 2750);
    const sweepX = easeInOutSine(sweep) * 100;
    if (t >= SHOW_HERO_AT) showHero();
    if (t >= SHOW_COPY_AT) showCopy();
    plates.forEach((plate) => renderPlate(plate, t, close, sweep, sweepX));
    label.style.opacity = (progressIn(t, 150, 450) * (1 - progressIn(t, 2150, 2500))).toFixed(3);
    label.style.setProperty("--gl-progress", `${(easeInOutSine(progressIn(t, 100, 2350)) * 100).toFixed(1)}%`);

    if (t >= INTRO_MS) {
      finish(false);
      return;
    }
    frameId = requestAnimationFrame(tick);
  };

  SKIP_EVENTS.forEach((type) => window.addEventListener(type, skip, { capture: true, passive: true }));
  frameId = requestAnimationFrame(tick);

  return {
    destroy: () => {
      finished = true;
      cancelAnimationFrame(frameId);
      window.clearTimeout(cleanupTimer);
      decoder.cancel();
      SKIP_EVENTS.forEach((type) => window.removeEventListener(type, skip, true));
    },
  };
}