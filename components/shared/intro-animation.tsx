"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CODE_LINES = [
  "const designer = {",
  '  name: "Георги Гушев",',
  '  focus: "Design / Web / Digital",',
  "};",
  "",
  "await designer.init();",
];
const CODE_TEXT = CODE_LINES.join("\n");

/** Timings in ms. The whole intro takes about three seconds. */
const TYPING_MS = 1150;
const PAUSE_AFTER_TYPING_MS = 150;
const LOADING_MS = 600;
const WELCOME_MS = 700;
/** The terminal card fades out; the dark backdrop stays so the page can fade in from it. */
const CONTENT_EXIT_MS = 400;
const PAGE_REVEAL_MS = 900;

const SEEN_KEY = "intro-seen";
const COMPLETE_EVENT = "intro-complete";
/** Style tags added outside React (so hydration never sees a difference). */
const SKIP_STYLE_ID = "gdx-intro-skip";
const REVEAL_STYLE_ID = "gdx-page-reveal";
const BACKDROP = "#060e1a";
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Static rules rendered with the intro: the page fades in from the same dark color as the backdrop. */
const INTRO_STYLE = `
  html { background-color: ${BACKDROP}; }
  @keyframes gdx-page-reveal {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
const PAGE_REVEAL_RULE = `body { animation: gdx-page-reveal ${PAGE_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both; }`;

/**
 * Runs while the HTML is parsed, before the overlay is painted: a visitor who already saw the
 * intro this session (or prefers reduced motion) never sees it, not even for a frame, and the
 * page simply fades in. It only adds a <style> tag, so React's markup is left untouched.
 */
const EARLY_SCRIPT = `
  try {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem("${SEEN_KEY}") === "true" || reduce) {
      var style = document.createElement("style");
      style.id = "${SKIP_STYLE_ID}";
      style.textContent = "[data-site-intro]{display:none!important}" + (reduce ? "" : ${JSON.stringify(PAGE_REVEAL_RULE)});
      document.head.appendChild(style);
    }
  } catch (error) {}
`;

function addRevealStyle() {
  const style = document.createElement("style");
  style.id = REVEAL_STYLE_ID;
  style.textContent = PAGE_REVEAL_RULE;
  document.head.appendChild(style);
}

function removeStyle(id: string) {
  document.getElementById(id)?.remove();
}

type Phase = "typing" | "loading" | "welcome" | "leaving" | "done";

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

  /** Fades the page in from the dark backdrop (unless the early script already started it), then cleans up. */
  const revealPage = useCallback((skipped: boolean) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!skipped && !prefersReducedMotion) addRevealStyle();
    window.setTimeout(() => {
      removeStyle(REVEAL_STYLE_ID);
      removeStyle(SKIP_STYLE_ID);
    }, PAGE_REVEAL_MS + 100);
  }, []);

  const finish = useCallback(
    (skipped: boolean) => {
      if (hasFinished.current) return;
      hasFinished.current = true;
      rememberIntroSeen();
      setPhase("done");
      setIsActive(false);
      window.dispatchEvent(new Event(COMPLETE_EVENT));
      revealPage(skipped);
    },
    [revealPage],
  );

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
      },
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
      () => setPhase("welcome"),
    );
  }, [phase]);

  useEffect(() => {
    if (phase !== "welcome") return;
    const timeoutId = window.setTimeout(() => setPhase("leaving"), WELCOME_MS);
    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timeoutId = window.setTimeout(() => finish(false), CONTENT_EXIT_MS);
    return () => window.clearTimeout(timeoutId);
  }, [phase, finish]);

  // The style stays mounted after the intro so the page fade-in can finish.
  const earlyAssets = (
    <>
      <style dangerouslySetInnerHTML={{ __html: INTRO_STYLE }} />
      <script dangerouslySetInnerHTML={{ __html: EARLY_SCRIPT }} />
    </>
  );
  if (!isActive) return earlyAssets;

  const typedLines = CODE_TEXT.slice(0, typedCount).split("\n");
  const isTyping = phase === "typing";
  const showStatus = phase === "loading" || phase === "welcome" || phase === "leaving";
  const showWelcome = phase === "welcome" || phase === "leaving";

  return (
    <>
      {earlyAssets}
      <div
        data-site-intro=""
        role="status"
        aria-label="GDX Studio"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060e1a]"
      >
        <motion.div
          className="w-full max-w-lg px-6"
          animate={phase === "leaving" ? { opacity: 0, scale: 0.98, y: -8 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: CONTENT_EXIT_MS / 1000, ease: "easeIn" }}
        >
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
                    <span>{showWelcome ? "✓ Ready" : "Initializing..."}</span>
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
            {showWelcome && (
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
        </motion.div>
      </div>
    </>
  );
}