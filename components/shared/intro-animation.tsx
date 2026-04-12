"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeLines = [
  'const designer = {',
  '  name: "Георги Гушев",',
  '  focus: "Design / Web / Digital",',
  '  approach: "clarity + function",',
  '  qa: true,',
  '};',
  '',
  'await designer.init();',
];

function colorize(text: string) {
  if (text.includes("const")) {
    const parts = text.split("designer");
    return (
      <>
        <span className="text-[#c792ea]">const </span>
        <span className="text-[#e8a44a]">designer</span>
        <span className="text-slate-400">{parts[1]}</span>
      </>
    );
  }
  if (text.includes('"') && (text.includes("name") || text.includes("focus"))) {
    const before = text.split('"')[0];
    const quoted = text.split('"')[1];
    const after = text.split('"').slice(2).join('"');
    return (
      <>
        <span className="text-slate-400">{before}</span>
        <span className="text-[#e8a44a]">&quot;{quoted}&quot;</span>
        <span className="text-slate-400">{after}</span>
      </>
    );
  }
  if (text.includes("approach")) {
    const before = text.split('"')[0];
    const quoted = text.split('"')[1];
    const after = text.split('"').slice(2).join('"');
    return (
      <>
        <span className="text-slate-400">{before}</span>
        <span className="text-[#4f9cf7]">&quot;{quoted}&quot;</span>
        <span className="text-slate-400">{after}</span>
      </>
    );
  }
  if (text.includes("true")) {
    return (
      <>
        <span className="text-slate-400">{text.replace("true,", "")}</span>
        <span className="text-[#28c840]">true</span>
        <span className="text-slate-400">,</span>
      </>
    );
  }
  if (text.includes("await")) {
    return (
      <>
        <span className="text-[#c792ea]">await </span>
        <span className="text-[#e8a44a]">designer</span>
        <span className="text-slate-400">.init();</span>
      </>
    );
  }
  return <span className="text-slate-400">{text}</span>;
}

export function IntroAnimation() {
  const [show, setShow] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [phase, setPhase] = useState<"typing" | "loading" | "welcome" | "done">("typing");
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen") === "true") {
      setShow(false);
      // Signal immediately — intro already seen
      window.dispatchEvent(new Event("intro-complete"));
      return;
    }
  }, []);

  useEffect(() => {
    if (phase !== "typing" || !show) return;

    if (currentLine >= codeLines.length) {
      setTimeout(() => setPhase("loading"), 250);
      return;
    }

    const line = codeLines[currentLine];

    if (line === "") {
      setTimeout(() => {
        setCompletedLines((prev) => [...prev, ""]);
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }, 60);
      return;
    }

    if (currentChar >= line.length) {
      setTimeout(() => {
        setCompletedLines((prev) => [...prev, line]);
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }, 50);
      return;
    }

    const speed = 12 + Math.random() * 13;
    typingRef.current = setTimeout(() => {
      setCurrentChar((prev) => prev + 1);
    }, speed);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [phase, currentLine, currentChar, show]);

  useEffect(() => {
    if (phase !== "loading") return;

    let progress = 0;
    const loadInterval = setInterval(() => {
      progress += Math.random() * 18 + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadInterval);
        setLoadingProgress(100);
        setTimeout(() => setPhase("welcome"), 200);
      } else {
        setLoadingProgress(Math.min(progress, 100));
      }
    }, 60);

    return () => clearInterval(loadInterval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "welcome") return;

    const timer = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("intro-seen", "true");
      // Signal hero to start animating
      window.dispatchEvent(new Event("intro-complete"));
      setTimeout(() => setShow(false), 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase]);

  if (!show) return null;

  const partialLine =
    phase === "typing" && currentLine < codeLines.length
      ? codeLines[currentLine].slice(0, currentChar)
      : null;

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060e1a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="w-full max-w-lg px-6">
            <motion.div
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628] shadow-[0_0_80px_rgba(79,156,247,0.08)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[11px] text-slate-500 font-mono">
                  gdxstudio.init
                </span>
              </div>

              <div className="min-h-[250px] p-5 font-mono text-[13px] leading-[1.8]">
                {completedLines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="mr-4 w-5 select-none text-right text-slate-600 text-[11px]">
                      {i + 1}
                    </span>
                    {line === "" ? (
                      <span>&nbsp;</span>
                    ) : (
                      colorize(line)
                    )}
                  </div>
                ))}

                {partialLine !== null && (
                  <div className="flex">
                    <span className="mr-4 w-5 select-none text-right text-slate-600 text-[11px]">
                      {completedLines.length + 1}
                    </span>
                    <span>
                      <span className="text-slate-400">{partialLine}</span>
                      <span className="inline-block h-[16px] w-[7px] translate-y-[2px] animate-pulse bg-accent/90" />
                    </span>
                  </div>
                )}

                {phase === "typing" && currentLine >= codeLines.length && (
                  <div className="flex">
                    <span className="mr-4 w-5 select-none text-right text-slate-600 text-[11px]">
                      {completedLines.length + 1}
                    </span>
                    <span className="inline-block h-[16px] w-[7px] translate-y-[2px] animate-pulse bg-accent/90" />
                  </div>
                )}
              </div>

              {(phase === "loading" || phase === "welcome") && (
                <motion.div
                  className="border-t border-white/6 px-5 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">
                      {phase === "welcome" ? "✓ Ready" : "Initializing..."}
                    </span>
                    <span className="text-slate-500">
                      {Math.round(loadingProgress)}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent via-accent to-primary"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence>
              {phase === "welcome" && (
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <p className="text-2xl font-semibold text-white">
                    Welcome to{" "}
                    <span className="text-gradient">GDX Studio</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}