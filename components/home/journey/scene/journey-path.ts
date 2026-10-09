import * as THREE from "three";
import { CAMERA_LEAD, CHAPTER_STATIONS, CHAPTER_SWITCH } from "@/components/home/journey/journey-config";
import { smoothstep } from "@/components/home/journey/scene/scene-kit";

const UP = new THREE.Vector3(0, 1, 0);

/** The winding line the camera travels along. */
export function createJourneyPath(): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 14; i += 1) {
    points.push(new THREE.Vector3(Math.sin(i * 0.85) * 13, Math.sin(i * 0.5) * 3, -i * 28));
  }
  return new THREE.CatmullRomCurve3(points, false, "centripetal");
}

export type JourneyPath = {
  curve: THREE.CatmullRomCurve3;
  pointAt: (u: number) => THREE.Vector3;
  tangentAt: (u: number) => THREE.Vector3;
  sideAt: (u: number) => THREE.Vector3;
  /** Places an object at u + offset, turned towards the camera arriving along the line. */
  placeFacingCamera: (object: THREE.Object3D, u: number, offset: THREE.Vector3) => void;
};

export function createPathHelpers(curve: THREE.CatmullRomCurve3): JourneyPath {
  const pointAt = (u: number) => curve.getPointAt(THREE.MathUtils.clamp(u, 0, 1));
  const tangentAt = (u: number) => curve.getTangentAt(THREE.MathUtils.clamp(u, 0, 1));
  const sideAt = (u: number) => new THREE.Vector3().crossVectors(tangentAt(u), UP).normalize();
  const placeFacingCamera = (object: THREE.Object3D, u: number, offset: THREE.Vector3) => {
    object.position.copy(pointAt(u)).add(offset);
    object.lookAt(pointAt(Math.max(0, u - 0.04)).add(offset).add(new THREE.Vector3(0, 0.5, 0)));
  };
  return { curve, pointAt, tangentAt, sideAt, placeFacingCamera };
}

/** Amount of "chaos" along the line: full at the start, gone once structure begins. */
export function chaosAt(u: number): number {
  return 1 - smoothstep(u, 0.12, 0.21);
}

/** Where the build-in of a chapter's scene starts and finishes, as fractions of the way from the previous rest. */
const BUILD_START = CHAPTER_SWITCH - 0.3;
/** Finishes a little before the copy switches: the camera trails the scroll, so this lands together with the text. */
const BUILD_END = CHAPTER_SWITCH - 0.07;

/**
 * 0 → 1 while the camera travels towards a chapter's scene, timed so the scene is fully built by
 * the moment that chapter's copy appears. Stays at 1 afterwards; pair it with `stationFade`.
 */
export function chapterBuild(cameraU: number, chapterIndex: number): number {
  const rest = CHAPTER_STATIONS[chapterIndex] - CAMERA_LEAD;
  const previousRest = chapterIndex === 0 ? 0 : CHAPTER_STATIONS[chapterIndex - 1] - CAMERA_LEAD;
  const gap = rest - previousRest;
  return smoothstep(cameraU, previousRest + gap * BUILD_START, previousRest + gap * BUILD_END);
}

/** 1 until the camera passes a station, then 0 over `after` units of the line. */
export function stationFade(cameraU: number, targetU: number, after: number): number {
  return 1 - smoothstep(cameraU, targetU + 0.02, targetU + after);
}

/** Share of a staggered build that belongs to item `index` of `count` (each item takes `span` of it). */
export function staggered(build: number, index: number, count: number, span = 0.6): number {
  const delay = count <= 1 ? 0 : (index / (count - 1)) * (1 - span);
  const t = Math.min(1, Math.max(0, (build - delay) / span));
  return t * t * (3 - 2 * t);
}