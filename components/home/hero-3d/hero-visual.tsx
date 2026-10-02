"use client";

import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGlobalPointer } from "./use-global-pointer";

/** Three.js is only downloaded in the browser, after the page is interactive. */
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

const IDLE_TIMEOUT_MS = 1500;
const FALLBACK_DELAY_MS = 600;

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function prefersDataSaving(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
}

/** Static stand-in shown while the scene loads, and permanently where WebGL is unavailable. */
function ScenePoster({ isHidden }: { isHidden: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-out ${
        isHidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="absolute h-[38%] w-[38%] rounded-full"
        style={{ background: "radial-gradient(circle at 35% 30%, #F6C987, #E8A44A 45%, #7A4E14 100%)" }}
      />
      <div className="absolute h-[60%] w-[60%] rounded-full border" style={{ borderColor: "rgba(79, 156, 247, 0.3)" }} />
      <div
        className="absolute h-[70%] w-[70%] rounded-full border-2"
        style={{ borderColor: "rgba(232, 164, 74, 0.45)", transform: "rotate(-20deg) scaleY(0.35)" }}
      />
    </div>
  );
}

interface HeroVisualProps {
  className?: string;
}

export function HeroVisual({ className = "" }: HeroVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useGlobalPointer();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [shouldMountScene, setShouldMountScene] = useState(false);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!supportsWebGL() || prefersDataSaving()) return;

    // Safari has no requestIdleCallback; fall back to a short delay after hydration.
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => setShouldMountScene(true), { timeout: IDLE_TIMEOUT_MS });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = setTimeout(() => setShouldMountScene(true), FALLBACK_DELAY_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry?.isIntersecting ?? true), {
      rootMargin: "100px",
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className={`relative aspect-square w-full ${className}`}>
      <ScenePoster isHidden={isSceneReady} />
      {shouldMountScene && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${isSceneReady ? "opacity-100" : "opacity-0"}`}
        >
          <HeroScene
            pointer={pointer}
            isAnimated={!prefersReducedMotion}
            isVisible={isVisible}
            onReady={() => setIsSceneReady(true)}
          />
        </div>
      )}
    </div>
  );
}
