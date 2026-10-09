import * as THREE from "three";
import { CAMERA_END, CAMERA_MAX_U, FINALE_START } from "@/components/home/journey/journey-config";
import type { JourneySceneCopy } from "@/components/home/journey/journey-copy";
import { chaosAt, createJourneyPath, createPathHelpers } from "@/components/home/journey/scene/journey-path";
import { createRibbon } from "@/components/home/journey/scene/ribbon";
import { createChaos } from "@/components/home/journey/scene/chaos";
import { createStructure } from "@/components/home/journey/scene/structure";
import { createCodeTunnel, createTestScanner } from "@/components/home/journey/scene/code-and-test";
import { createDevices } from "@/components/home/journey/scene/devices";
import { createFinale, createStars } from "@/components/home/journey/scene/finale";
import { SCENE_COLORS, disposeObject, smoothstep, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

/** How quickly the camera catches up with the scroll position (higher = snappier). */
const SCROLL_FOLLOW = 0.0025;
const POINTER_FOLLOW = 0.02;
const CAMERA_HEIGHT = 2.3;
const FOG_DENSITY = 0.022;
const OVERVIEW_FOG_DENSITY = 0.0025;
const OVERVIEW_OFFSET = new THREE.Vector3(-40, 52, 62);

export type JourneySceneOptions = {
  canvas: HTMLCanvasElement;
  copy: JourneySceneCopy;
  reduceMotion: boolean;
  isSmallScreen: boolean;
};

export type JourneyScene = {
  /** Advances one frame towards the given scroll progress (0 → 1) and draws it. */
  render: (targetProgress: number, pointer: { x: number; y: number }) => void;
  /** Jumps straight to a progress without easing, e.g. on first paint. */
  snapTo: (progress: number) => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
};

export function createJourneyScene({ canvas, copy, reduceMotion, isSmallScreen }: JourneySceneOptions): JourneyScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isSmallScreen, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.5 : 1.75));
  renderer.setClearColor(SCENE_COLORS.ink, 1);

  const scene = new THREE.Scene();
  const fog = new THREE.FogExp2(SCENE_COLORS.ink, FOG_DENSITY);
  scene.fog = fog;
  const camera = new THREE.PerspectiveCamera(isSmallScreen ? 70 : 58, 1, 0.1, 600);

  const path = createPathHelpers(createJourneyPath());
  const finale = createFinale(scene, path, camera);
  const parts: ScenePart[] = [
    createRibbon(scene, path, isSmallScreen, reduceMotion),
    createChaos(scene, path, copy, isSmallScreen),
    createStructure(scene, path, isSmallScreen),
    createCodeTunnel(scene, path, isSmallScreen),
    createTestScanner(scene, path),
    createDevices(scene, path, copy, renderer, isSmallScreen),
    finale,
    createStars(scene, path, isSmallScreen)
  ];

  const overviewLook = new THREE.Vector3();
  const overviewPosition = new THREE.Vector3();
  function updateOverview() {
    // A portrait screen is narrow, so frame closer to the logo and pull further back.
    const isPortrait = camera.aspect < 1;
    overviewLook.copy(path.pointAt(0.72)).lerp(finale.logo.position, isPortrait ? 0.55 : 0);
    overviewPosition.copy(overviewLook).add(OVERVIEW_OFFSET.clone().multiplyScalar(isPortrait ? 1.45 : 1));
  }

  const timer = new THREE.Timer();
  const smoothPointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const cameraPosition = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  let progress = 0;

  function render(targetProgress: number, pointer: { x: number; y: number }) {
    timer.update();
    const delta = Math.min(timer.getDelta(), 0.05);
    const elapsed = timer.getElapsed();
    progress += (targetProgress - progress) * (reduceMotion ? 1 : 1 - Math.pow(SCROLL_FOLLOW, delta));
    smoothPointer.lerp(pointerTarget.set(pointer.x, pointer.y), reduceMotion ? 0 : 1 - Math.pow(POINTER_FOLLOW, delta));

    const cameraU = THREE.MathUtils.clamp((progress / CAMERA_END) * CAMERA_MAX_U, 0, CAMERA_MAX_U);
    const finaleAmount = smoothstep(progress, FINALE_START, 1);
    const chaos = chaosAt(cameraU);

    cameraPosition.copy(path.pointAt(cameraU)).addScaledVector(up, CAMERA_HEIGHT);
    lookTarget.copy(path.pointAt(Math.min(cameraU + 0.04, 1))).addScaledVector(up, 1);
    if (!reduceMotion) {
      // A nervous shake on the chaotic stretch, and a gentle parallax from the pointer.
      cameraPosition.x += Math.sin(elapsed * 9) * 0.06 * chaos;
      cameraPosition.y += Math.cos(elapsed * 7) * 0.05 * chaos;
      cameraPosition.addScaledVector(path.sideAt(cameraU), smoothPointer.x * 0.6);
      cameraPosition.y -= smoothPointer.y * 0.35;
    }
    cameraPosition.lerp(overviewPosition, finaleAmount);
    lookTarget.lerp(overviewLook, finaleAmount);
    camera.position.copy(cameraPosition);
    camera.lookAt(lookTarget);
    fog.density = THREE.MathUtils.lerp(FOG_DENSITY, OVERVIEW_FOG_DENSITY, finaleAmount);

    const state: FrameState = {
      progress,
      cameraU,
      finale: finaleAmount,
      revealU: Math.max(cameraU + 0.17, finaleAmount * 1.2),
      elapsed,
      delta,
      reduceMotion
    };
    parts.forEach((part) => part.update?.(state));
    renderer.render(scene, camera);
  }

  return {
    render,
    snapTo(value: number) {
      progress = value;
    },
    resize(width: number, height: number) {
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      updateOverview();
    },
    dispose() {
      timer.dispose();
      disposeObject(scene);
      renderer.dispose();
    }
  };
}