"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CODE_LINES = [
  "const designer = {",
  '  name: "Георги Гушев",',
  '  focus: "Design / Web / Digital",',
  "};",
  "",
  "await designer.init();"
];
const CODE_TEXT = CODE_LINES.join("\n");

/** Timings in ms. The whole intro takes about three seconds. */
const TYPING_MS = 1150;
const PAUSE_AFTER_TYPING_MS = 150;
const LOADING_MS = 600;
const WELCOME_MS = 700;
const EXIT_MS = 700;
const PAGE_REVEAL_MS = 900;

const SEEN_KEY = "intro-seen";
const COMPLETE_EVENT = "intro-complete";
const REVEAL_ATTRIBUTE = "data-intro-reveal";
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** After the intro, the page content fades in softly underneath the fading overlay. */
const PAGE_REVEAL_STYLE = `
  html[${REVEAL_ATTRIBUTE}] main {
    animation: gdx-page-reveal ${PAGE_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  @keyframes gdx-page-reveal {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    html[${REVEAL_ATTRIBUTE}] main { animation: none; }
  }
`;

type Phase = "typing" | "loading" | "welcome" | "done";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

function rememberIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "true");
  } catch {
    // Private mode or blocked storage: the intro will simply play again next time.
  }
}

/** Runs a 0 → 1 animation over `duration` ms on the frame clock; returns a cancel function. */
function animateProgress(duration: number, onFrame: (t: number) => void, onDone: () => void): () => void {
  let frameId = 0;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    onFrame(t);
    if (t < 1) frameId = requestAnimationFrame(step);
    else onDone();
  };
  frameId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frameId);
}

function highlightLine(line: string): ReactNode {
  if (line.startsWith("const ")) {
    return (
      <>
        <span className="text-[#c792ea]">const </span>
        <span className="text-[#e8a44a]">designer</span>
        <span className="text-slate-400">{line.slice("const designer".length)}</span>
      </>
    );
  }
  if (line.startsWith("await ")) {
    return (
      <>
        <span className="text-[#c792ea]">await </span>
        <span className="text-[#e8a44a]">designer</span>
        <span className="text-slate-400">{line.slice("await designer".length)}</span>
      </>
    );
  }
  const quoteStart = line.indexOf('"');
  if (quoteStart >= 0) {
    const quoteEnd = line.indexOf('"', quoteStart + 1);
    const end = quoteEnd >= 0 ? quoteEnd + 1 : line.length;
    return (
      <>
        <span className="text-slate-400">{line.slice(0, quoteStart)}</span>
        <span className="text-[#e8a44a]">{line.slice(quoteStart, end)}</span>
        <span className="text-slate-400">{line.slice(end)}</span>
      </>
    );
  }
  return <span className="text-slate-400">{line}</span>;
}

function Caret() {
  return <span className="inline-block h-[16px] w-[7px] translate-y-[2px] bg-accent/90 motion-safe:animate-pulse" />;
}

/**
 * The "code typing" intro shown once per browser session before the site opens.
 * Typing runs at an even pace on the frame clock, the loading bar eases in, and the
 * overlay fades away while the page content fades in underneath.
 */
export function IntroAnimation() {
  const [isActive, setIsActive] = useState(true);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedCount, setTypedCount] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const hasFinished = useRef(false);

  const finish = useCallback((immediate: boolean) => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    rememberIntroSeen();
    setPhase("done");
    window.dispatchEvent(new Event(COMPLETE_EVENT));
    if (immediate) {
      setIsActive(false);
      return;
    }
    const root = document.documentElement;
    const style = document.createElement("style");
    style.textContent = PAGE_REVEAL_STYLE;
    document.head.appendChild(style);
    root.setAttribute(REVEAL_ATTRIBUTE, "");
    window.setTimeout(() => setIsActive(false), EXIT_MS);
    window.setTimeout(() => {
      root.removeAttribute(REVEAL_ATTRIBUTE);
      style.remove();
    }, Math.max(EXIT_MS, PAGE_REVEAL_MS) + 100);
  }, []);

  // Returning visitors in the same session, and visitors who prefer reduced motion, skip the intro.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hasSeenIntro() || prefersReducedMotion) finish(true);
  }, [finish]);

  useEffect(() => {
    if (phase !== "typing" || hasFinished.current) return;
    let timeoutId = 0;
    const cancel = animateProgress(
      TYPING_MS,
      (t) => setTypedCount(Math.floor(t * CODE_TEXT.length)),
      () => {
        timeoutId = window.setTimeout(() => setPhase("loading"), PAUSE_AFTER_TYPING_MS);
      }
    );
    return () => {
      cancel();
      window.clearTimeout(timeoutId);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    return animateProgress(
      LOADING_MS,
      (t) => setLoaded(easeInOutCubic(t) * 100),
      () => setPhase("welcome")
    );
  }, [phase]);

  useEffect(() => {
    if (phase !== "welcome") return;
    const timeoutId = window.setTimeout(() => finish(false), WELCOME_MS);
    return () => window.clearTimeout(timeoutId);
  }, [phase, finish]);

  if (!isActive) return null;

  const typedLines = CODE_TEXT.slice(0, typedCount).split("\n");
  const isTyping = phase === "typing";
  const showStatus = phase === "loading" || phase === "welcome";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="site-intro"
          role="status"
          aria-label="GDX Studio"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060e1a]"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: EXIT_MS / 1000, ease: EASE_OUT }}
        >
          <div className="w-full max-w-lg px-6">
            <motion.div
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628] shadow-[0_0_80px_rgba(79,156,247,0.08)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-[11px] text-slate-500">gdxstudio.init</span>
              </div>

              <div className="min-h-[200px] p-5 font-mono text-[13px] leading-[1.8]" aria-hidden="true">
                {typedLines.map((line, index) => {
                  const isLastLine = index === typedLines.length - 1;
                  return (
                    <div key={index} className="flex">
                      <span className="mr-4 w-5 select-none text-right text-[11px] text-slate-600">{index + 1}</span>
                      <span className="whitespace-pre">
                        {line === "" ? " " : highlightLine(line)}
                        {isLastLine && (isTyping || phase === "loading") && <Caret />}
                      </span>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence>
                {showStatus && (
                  <motion.div
                    className="border-t border-white/[0.06] px-5 py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                      <span>{phase === "welcome" ? "✓ Ready" : "Initializing..."}</span>
                      <span className="tabular-nums">{Math.round(loaded)}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full origin-left rounded-full bg-gradient-to-r from-accent via-accent to-primary"
                        style={{ transform: `scaleX(${loaded / 100})` }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {phase === "welcome" && (
                <motion.p
                  className="mt-8 text-center text-2xl font-semibold text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                >
                  Welcome to <span className="text-gradient">GDX Studio</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}