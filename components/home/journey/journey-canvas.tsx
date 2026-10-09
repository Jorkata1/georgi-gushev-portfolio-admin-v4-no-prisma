"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { useRouter } from "next/navigation";
import type { JourneySceneCopy } from "@/components/home/journey/journey-copy";
import type { JourneyScene } from "@/components/home/journey/scene/create-journey-scene";
import type { JourneyProject } from "@/components/home/journey/scene/projects";

const SMALL_SCREEN_QUERY = "(max-width: 640px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export type JourneyCanvasStatus = "loading" | "ready" | "unsupported";

type JourneyCanvasProps = {
  copy: JourneySceneCopy;
  /** Scroll progress through the journey (0 → 1), written by the parent on scroll. */
  progressRef: MutableRefObject<number>;
  projects: JourneyProject[];
  viewProjectLabel: string;
  onStatusChange: (status: JourneyCanvasStatus) => void;
};

function canUseWebGL(): boolean {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The 3D world behind the journey. three.js is loaded only here, after mount, so it never
 * blocks the first paint; frames are drawn only while the journey is on screen.
 */
export function JourneyCanvas({ copy, progressRef, projects, viewProjectLabel, onStatusChange }: JourneyCanvasProps) {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef(onStatusChange);
  statusRef.current = onStatusChange;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!canUseWebGL()) {
      statusRef.current("unsupported");
      return;
    }

    let scene: JourneyScene | null = null;
    let frameId = 0;
    let isVisible = true;
    let isDisposed = false;
    const pointer = { x: 0, y: 0 };

    const toCanvasNdc = (event: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: ((event.clientX - rect.left) / rect.width) * 2 - 1, y: -(((event.clientY - rect.top) / rect.height) * 2 - 1) };
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
      if (!scene || event.pointerType === "touch") return;
      const ndc = toCanvasNdc(event);
      canvas.style.cursor = scene.pickProject(ndc.x, ndc.y) ? "pointer" : "";
    };

    // Project cards in the scene open their project; the same links are in the chapter copy for keyboards.
    const handleClick = (event: MouseEvent) => {
      if (!scene) return;
      const ndc = toCanvasNdc(event);
      const href = scene.pickProject(ndc.x, ndc.y);
      if (href) routerRef.current.push(href);
    };

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      scene?.resize(clientWidth, clientHeight);
    };

    const tick = () => {
      frameId = 0;
      if (!scene || isDisposed || !isVisible) return;
      scene.render(progressRef.current, pointer);
      frameId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (frameId === 0 && scene && isVisible) frameId = requestAnimationFrame(tick);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      startLoop();
    });
    const resizeObserver = new ResizeObserver(resize);

    import("@/components/home/journey/scene/create-journey-scene")
      .then(({ createJourneyScene }) => {
        if (isDisposed) return;
        scene = createJourneyScene({
          canvas,
          copy,
          reduceMotion: window.matchMedia(REDUCED_MOTION_QUERY).matches,
          isSmallScreen: window.matchMedia(SMALL_SCREEN_QUERY).matches,
          projects,
          viewProjectLabel
        });
        scene.snapTo(progressRef.current);
        resize();
        resizeObserver.observe(canvas);
        visibilityObserver.observe(canvas);
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        canvas.addEventListener("click", handleClick);
        statusRef.current("ready");
        startLoop();
      })
      .catch((error: unknown) => {
        console.error("[journey] Could not start the 3D scene", error);
        statusRef.current("unsupported");
      });

    return () => {
      isDisposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("click", handleClick);
      scene?.dispose();
    };
  }, [copy, progressRef, projects, viewProjectLabel]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}