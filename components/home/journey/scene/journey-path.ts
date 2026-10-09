import * as THREE from "three";
import { CAMERA_LEAD } from "@/components/home/journey/journey-config";
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

/** 0 → 1 as the camera approaches a station, fully shown while it rests there, back to 0 after. */
export function proximity(cameraU: number, targetU: number, before = 0.12, after = 0.06): number {
  if (cameraU < targetU - CAMERA_LEAD) return smoothstep(cameraU, targetU - before, targetU - CAMERA_LEAD);
  return 1 - smoothstep(cameraU, targetU + 0.02, targetU + after);
}