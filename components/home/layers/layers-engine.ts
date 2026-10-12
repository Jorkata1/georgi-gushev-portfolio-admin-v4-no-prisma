import {
  ASSEMBLE_WINDOW,
  COUNT_MS,
  EXPLODE_END,
  FINALE_STEP,
  FOCUS_LIFT,
  INTRO_END,
  LIFT_EASE,
  MAX_GAP,
  SCROLL_EASE,
  STACK_FIT_HEIGHT,
  STACK_FIT_MAX,
  STACK_FIT_WIDTH,
  STACK_ORDER,
  TILT_EASE,
  getStepForProgress,
} from "@/components/home/layers/layers-config";
import { layoutFinale, type FinalePose } from "@/components/home/layers/layers-finale";
import { hasSeenIntro, playIntro, type HeroPose } from "@/components/home/layers/layers-intro";
import { clamp, createStyleWriter, decodeText, lerp, smooth, type Decoder } from "@/components/home/layers/layers-motion";
import { createStepLock } from "@/components/home/layers/layers-step-lock";

const EYEBROW_DECODE_MS = 700;
const EYEBROW_DECODE_DELAY_MS = 160;

type EngineOptions = {
  root: HTMLElement;
  glyphs: string;
  decimalSeparator: string;
  /** Called whenever the site chrome (header, back-to-top) should be shown or hidden. */
  onChromeChange: (isVisible: boolean) => void;
};

type PlateState = { element: HTMLElement; layer: number; index: number; lift: number };
type CounterState = { element: HTMLElement; from: number; to: number; decimals: number; text: string };

function required<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Layers story: missing element ${selector}`);
  return element;
}

/**
 * Drives the homepage layers story: maps the scroll position of the tall track onto the pinned
 * isometric stack and copy, runs the intro, and steps one gesture at a time. Returns a cleanup.
 */
export function createLayersEngine({ root, glyphs, decimalSeparator, onChromeChange }: EngineOptions): () => void {
  const track = required<HTMLElement>(root, "[data-gl-track]");
  const stage = required<HTMLElement>(root, "[data-gl-stage]");
  const stack = required<HTMLElement>(root, "[data-gl-stack]");
  const spot = root.querySelector<HTMLElement>("[data-gl-spot]");
  const callouts = required<HTMLElement>(root, "[data-gl-callouts]");
  const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-gl-step]"));
  const railButtons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-gl-rail] button"));
  const eyebrowLabels = steps.map((step) => step.querySelector<HTMLElement>("[data-gl-decode]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const write = createStyleWriter();

  const plates: PlateState[] = Array.from(root.querySelectorAll<HTMLElement>("[data-gl-layer]")).map((element) => {
    const layer = Number(element.dataset.glLayer);
    return { element, layer, index: STACK_ORDER.indexOf(layer), lift: 0 };
  });
  const counters: CounterState[] = Array.from(root.querySelectorAll<HTMLElement>("[data-gl-count]")).map((element) => {
    const [from = 0, to = 0, decimals = 0] = (element.dataset.glCount ?? "").split(":").map(Number);
    return { element, from, to, decimals, text: element.textContent ?? "" };
  });

  const startTime = performance.now();
  const pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };
  const heroPose: HeroPose = { rx: 58, rz: -36, float: 0, fit: 1 };
  let finalePose: FinalePose = { fit: 1, x: 0, y: 0 };
  let target = 0;
  let current = 0;
  let frameScale = 1;
  let lastFrameAt = 0;
  let frameId = 0;
  let inView = true;
  let speedStart = -1;
  let renderedStep = -1;
  let renderedFocus = -1;
  let renderedExploded: boolean | null = null;
  let chromeVisible: boolean | null = null;
  let eyebrowDecoder: Decoder | null = null;

  /* Easing that feels the same at 60 Hz and 120 Hz. */
  const ease = (rate: number) => 1 - Math.pow(1 - rate, frameScale);

  function readScroll() {
    const rect = track.getBoundingClientRect();
    const scrollable = track.offsetHeight - window.innerHeight;
    target = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
  }

  function fitStack() {
    const scene = stack.parentElement;
    if (!scene) return;
    heroPose.fit = Math.min(scene.clientWidth / STACK_FIT_WIDTH, scene.clientHeight / STACK_FIT_HEIGHT, STACK_FIT_MAX);
    finalePose = layoutFinale(scene, callouts, steps[steps.length - 1]);
  }

  function setChrome(isVisible: boolean) {
    if (isVisible === chromeVisible) return;
    chromeVisible = isVisible;
    onChromeChange(isVisible);
  }

  function formatCount(value: number, decimals: number): string {
    return decimals ? value.toFixed(decimals).replace(".", decimalSeparator) : String(Math.round(value));
  }

  function decodeEyebrow(step: number) {
    const label = eyebrowLabels[step];
    eyebrowDecoder?.cancel();
    eyebrowDecoder = null;
    if (!label || reduceMotion) return;
    eyebrowDecoder = decodeText(label, label.dataset.glDecode ?? "", glyphs, EYEBROW_DECODE_MS, EYEBROW_DECODE_DELAY_MS);
  }

  function renderStep(step: number, focusLayer: number, exploded: boolean) {
    if (step === renderedStep && focusLayer === renderedFocus && exploded === renderedExploded) return;
    if (step !== renderedStep) {
      steps.forEach((element, index) => {
        element.dataset.state = index === step ? "on" : index < step ? "after" : "before";
        /* Links in a step that is not on screen stay out of the tab order. */
        element.querySelectorAll<HTMLElement>("a, button").forEach((control) => {
          control.tabIndex = index === step ? 0 : -1;
        });
      });
      if (renderedStep !== -1) decodeEyebrow(step);
      railButtons.forEach((button, index) => {
        const isOn = index + 1 === step;
        button.classList.toggle("is-on", isOn);
        if (isOn) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
    }
    plates.forEach((plate) => {
      plate.element.classList.toggle("is-active", exploded && plate.layer === focusLayer);
      plate.element.classList.toggle("is-dim", exploded && focusLayer > 0 && plate.layer !== focusLayer);
    });
    renderedStep = step;
    renderedFocus = focusLayer;
    renderedExploded = exploded;
  }

  function renderCounters(step: number, time: number) {
    if (step === 5 && speedStart < 0) speedStart = time;
    if (step !== 5) speedStart = -1;
    const progress = step === 5 ? (reduceMotion ? 1 : smooth(time - speedStart, 150, COUNT_MS)) : 0;
    counters.forEach((counter) => {
      const text = formatCount(lerp(counter.from, counter.to, progress), counter.decimals);
      if (text !== counter.text) {
        counter.element.textContent = text;
        counter.text = text;
      }
      counter.element.parentElement?.classList.toggle("is-good", progress > 0.98);
    });
  }

  function render(progress: number, time: number) {
    const explode = smooth(progress, INTRO_END, EXPLODE_END) * (1 - smooth(progress, ASSEMBLE_WINDOW[0], ASSEMBLE_WINDOW[1]));
    const flatten = smooth(progress, ASSEMBLE_WINDOW[0] + 0.03, 0.99);
    const live = reduceMotion ? 0 : 1 - flatten;
    heroPose.rx = lerp(58, 0, flatten) + tilt.y * 6 * live;
    heroPose.rz = lerp(-36 + progress * 10, 0, flatten) + tilt.x * 8 * live;
    heroPose.float = Math.sin(time / 900) * 6 * live;
    /* On the finale the flat site grows and moves over to make room for the layer call-outs. */
    const grow = smooth(flatten, 0.2, 1);
    const fit = lerp(heroPose.fit, finalePose.fit, grow);
    const shiftX = finalePose.x * grow;
    const shiftY = finalePose.y * grow + heroPose.float;
    /* Written directly (not through inherited custom properties) so the per-frame float never restyles the children. */
    write(
      stack,
      "transform",
      `translate(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px) scale(${fit.toFixed(3)}) rotateX(${heroPose.rx.toFixed(2)}deg) rotateZ(${heroPose.rz.toFixed(2)}deg)`,
    );
    callouts.classList.toggle("is-on", flatten > 0.97);
    write(stack, "--gl-grid", smooth(explode, 0.4, 0.9).toFixed(2));
    write(stack, "--gl-tag", explode.toFixed(2));
    write(stack, "--gl-beam-z", `${(-2 * MAX_GAP * explode).toFixed(1)}px`);
    write(stack, "--gl-beam-h", `${((4 * MAX_GAP + FOCUS_LIFT) * explode).toFixed(1)}px`);
    write(stack, "--gl-beam-o", smooth(explode, 0.3, 0.9).toFixed(2));

    const step = getStepForProgress(progress);
    const focusLayer = step >= 1 && step <= 5 ? step : 0;
    plates.forEach((plate) => {
      /* The lift is scaled by the explode amount, so no layer can linger above the finished site. */
      const goal = plate.layer === focusLayer ? 1 : 0;
      plate.lift = reduceMotion ? goal : plate.lift + (goal - plate.lift) * ease(LIFT_EASE);
      if (Math.abs(goal - plate.lift) < 0.001) plate.lift = goal;
      const z = ((plate.index - 2) * MAX_GAP + plate.lift * FOCUS_LIFT) * explode;
      write(plate.element, "transform", `translateZ(${z.toFixed(1)}px)`);
    });
    renderStep(step, focusLayer, explode > 0.5);
    renderCounters(step, time);
    setChrome(step === FINALE_STEP || track.getBoundingClientRect().bottom < window.innerHeight - 1);
  }

  /* The loop runs only while the story is on screen and the tab is visible. */
  function frame(now: number) {
    frameId = 0;
    frameScale = lastFrameAt ? clamp((now - lastFrameAt) / 16.667, 0.25, 4) : 1;
    lastFrameAt = now;
    current = reduceMotion ? target : current + (target - current) * ease(SCROLL_EASE);
    if (Math.abs(target - current) < 0.0002) current = target;
    tilt.x += (pointer.x - tilt.x) * ease(TILT_EASE);
    tilt.y += (pointer.y - tilt.y) * ease(TILT_EASE);
    render(current, now - startTime);
    const settled = current === target && Math.abs(pointer.x - tilt.x) < 0.001 && Math.abs(pointer.y - tilt.y) < 0.001;
    /* With reduced motion nothing floats, so the loop sleeps until the next scroll or pointer move. */
    if (inView && !(reduceMotion && settled)) frameId = requestAnimationFrame(frame);
    else lastFrameAt = 0;
  }

  function wake() {
    if (!frameId && inView) frameId = requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver((entries) => {
    inView = entries.some((entry) => entry.isIntersecting);
    if (inView) wake();
    else setChrome(true);
  });
  observer.observe(track);

  const handleVisibility = () => {
    if (!document.hidden) wake();
  };
  const handleScroll = () => {
    readScroll();
    wake();
  };
  const handlePointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    if (spot) spot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    wake();
  };

  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("scroll", handleScroll, { passive: true });
  if (finePointer) window.addEventListener("pointermove", handlePointerMove, { passive: true });

  const stepLock = createStepLock({
    track,
    railButtons,
    reduceMotion,
    getProgress: () => target,
    onResize: () => {
      fitStack();
      readScroll();
      wake();
    },
  });

  fitStack();
  /* Label widths depend on the web font; measure again once it has loaded. */
  void document.fonts?.ready.then(() => {
    if (root.isConnected) fitStack();
  });
  readScroll();
  current = target;
  render(current, 0);
  wake();

  /* The stage starts hidden in the markup (no flash before hydration); reveal it unless the intro plays. */
  const shouldPlayIntro = !reduceMotion && window.scrollY < 2 && !hasSeenIntro();
  const intro = shouldPlayIntro
    ? playIntro({
        intro: required<HTMLElement>(root, "[data-gl-intro]"),
        label: required<HTMLElement>(root, "[data-gl-intro-label]"),
        labelText: required<HTMLElement>(root, "[data-gl-intro-label] span"),
        glyphs,
        getHeroPose: () => heroPose,
        onShowHero: () => stage.classList.remove("is-intro-stack"),
        onShowCopy: () => {
          /* Replay the hero's own entrance, which ran unseen while it was hidden. */
          renderedStep = -1;
          steps[0]?.setAttribute("data-state", "before");
          void steps[0]?.offsetWidth;
          stage.classList.remove("is-intro");
          wake();
        },
      })
    : null;
  if (!intro) stage.classList.remove("is-intro", "is-intro-stack");

  return () => {
    intro?.destroy();
    eyebrowDecoder?.cancel();
    stepLock.destroy();
    observer.disconnect();
    cancelAnimationFrame(frameId);
    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("pointermove", handlePointerMove);
  };
}