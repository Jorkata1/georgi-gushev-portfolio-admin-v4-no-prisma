import * as THREE from "three";
import { CAMERA_END, CAMERA_MAX_U, FINALE_START } from "@/components/home/journey/journey-config";
import type { JourneySceneCopy } from "@/components/home/journey/journey-copy";
import { createJourneyPath, createPathHelpers } from "@/components/home/journey/scene/journey-path";
import { createRibbon } from "@/components/home/journey/scene/ribbon";
import { createChaos } from "@/components/home/journey/scene/chaos";
import { createStructure } from "@/components/home/journey/scene/structure";
import { createCodeTunnel, createTestScanner } from "@/components/home/journey/scene/code-and-test";
import { createDevices } from "@/components/home/journey/scene/devices";
import { createFinale, createStars } from "@/components/home/journey/scene/finale";
import { createProjects, type JourneyProject } from "@/components/home/journey/scene/projects";
import { SCENE_COLORS, disposeObject, smoothstep, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

/** How quickly the camera catches up with the scroll position (higher = snappier). */
const SCROLL_FOLLOW = 0.0025;
const POINTER_FOLLOW = 0.02;
const CAMERA_HEIGHT = 2.3;
const FOG_DENSITY = 0.022;
const OVERVIEW_FOG_DENSITY = 0.0025;
const OVERVIEW_OFFSET = new THREE.Vector3(-40, 52, 62);
/** Phones have 3× screens; 2× keeps them sharp without drawing three times the pixels. */
const MAX_PIXEL_RATIO_PHONE = 2;
const MAX_PIXEL_RATIO_DESKTOP = 1.75;
/**
 * Safety net for slower devices: when most frames in a window take longer than this (≈ 40 fps),
 * the resolution steps down a little, never below the minimum. A few slow frames (loading
 * textures, a background tab) never trigger it, and the first seconds are not measured.
 */
const SLOW_FRAME_SECONDS = 1 / 40;
const FRAME_WINDOW = 90;
const SLOW_SHARE = 0.6;
const WARMUP_SECONDS = 2.5;
const PIXEL_RATIO_STEP = 0.25;
const MIN_PIXEL_RATIO = 1;

export type JourneySceneOptions = {
  canvas: HTMLCanvasElement;
  copy: JourneySceneCopy;
  reduceMotion: boolean;
  isSmallScreen: boolean;
  projects: JourneyProject[];
  viewProjectLabel: string;
};

export type JourneyScene = {
  /** Advances one frame towards the given scroll progress (0 → 1) and draws it. */
  render: (targetProgress: number, pointer: { x: number; y: number }) => void;
  /** Jumps straight to a progress without easing, e.g. on first paint. */
  snapTo: (progress: number) => void;
  resize: (width: number, height: number) => void;
  /**
   * Hit-tests the project cards at a pointer position in normalized device coordinates
   * (-1 → 1) and highlights the one under it. Returns its link, or null.
   */
  pickProject: (x: number, y: number) => string | null;
  dispose: () => void;
};

export function createJourneyScene({ canvas, copy, reduceMotion, isSmallScreen, projects, viewProjectLabel }: JourneySceneOptions): JourneyScene {
  // Full quality on every screen: phones get the same antialiasing and detail as desktops.
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  let pixelRatio = Math.min(window.devicePixelRatio, isSmallScreen ? MAX_PIXEL_RATIO_PHONE : MAX_PIXEL_RATIO_DESKTOP);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(SCENE_COLORS.ink, 1);

  const scene = new THREE.Scene();
  const fog = new THREE.FogExp2(SCENE_COLORS.ink, FOG_DENSITY);
  scene.fog = fog;
  const camera = new THREE.PerspectiveCamera(isSmallScreen ? 70 : 58, 1, 0.1, 600);

  const path = createPathHelpers(createJourneyPath());
  const finale = createFinale(scene, path, camera);
  const projectCards = createProjects(scene, path, projects, viewProjectLabel, isSmallScreen);
  const parts: ScenePart[] = [
    createRibbon(scene, path, reduceMotion),
    createChaos(scene, path, copy),
    createStructure(scene, path, isSmallScreen),
    createCodeTunnel(scene, path),
    createTestScanner(scene, path),
    createDevices(scene, path, copy, renderer, isSmallScreen),
    projectCards,
    finale,
    createStars(scene, path)
  ];

  const overviewLook = new THREE.Vector3();
  const overviewPosition = new THREE.Vector3();
  function updateOverview() {
    // Frame the end of the route with the logo; a portrait screen sits closer to the logo and further back.
    const isPortrait = camera.aspect < 1;
    overviewLook.copy(path.pointAt(0.72)).lerp(finale.logo.position, isPortrait ? 0.9 : 0.35);
    overviewPosition.copy(overviewLook).add(OVERVIEW_OFFSET.clone().multiplyScalar(isPortrait ? 1.9 : 1));
    // On a phone the chapter copy fills the lower half, so aim below the logo to lift it up the screen.
    if (isPortrait) overviewLook.y -= 14;
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

    cameraPosition.copy(path.pointAt(cameraU)).addScaledVector(up, CAMERA_HEIGHT);
    lookTarget.copy(path.pointAt(Math.min(cameraU + 0.04, 1))).addScaledVector(up, 1);
    if (!reduceMotion) {
      // A gentle parallax from the pointer.
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
    adaptResolution(delta, elapsed);
  }

  let viewportWidth = 1;
  let viewportHeight = 1;
  let frameCount = 0;
  let slowFrames = 0;
  function updateViewScale() {
    const bufferHeight = viewportHeight * renderer.getPixelRatio();
    finale.setViewScale(bufferHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))));
  }
  function adaptResolution(delta: number, elapsed: number) {
    if (pixelRatio <= MIN_PIXEL_RATIO || elapsed < WARMUP_SECONDS) return;
    frameCount += 1;
    if (delta > SLOW_FRAME_SECONDS) slowFrames += 1;
    if (frameCount < FRAME_WINDOW) return;
    const isSlow = slowFrames / frameCount > SLOW_SHARE;
    frameCount = 0;
    slowFrames = 0;
    if (!isSlow) return;
    pixelRatio = Math.max(MIN_PIXEL_RATIO, pixelRatio - PIXEL_RATIO_STEP);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(viewportWidth, viewportHeight, false);
    updateViewScale();
  }

  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  function pickProject(x: number, y: number): string | null {
    const visibleCards = projectCards.pickables.filter((card) => card.parent?.visible);
    if (visibleCards.length === 0) {
      projectCards.setHovered(null);
      return null;
    }
    raycaster.setFromCamera(pointerNdc.set(x, y), camera);
    const hit = raycaster.intersectObjects(visibleCards, false)[0]?.object ?? null;
    projectCards.setHovered(hit);
    const href = hit?.userData.href;
    return typeof href === "string" ? href : null;
  }

  return {
    render,
    pickProject,
    snapTo(value: number) {
      progress = value;
    },
    resize(width: number, height: number) {
      viewportWidth = width;
      viewportHeight = height;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      updateOverview();
      updateViewScale();
    },
    dispose() {
      parts.forEach((part) => part.dispose?.());
      timer.dispose();
      disposeObject(scene);
      renderer.dispose();
    }
  };
}