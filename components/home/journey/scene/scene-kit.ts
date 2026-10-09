import * as THREE from "three";

export const SCENE_COLORS = {
  ink: 0x060e1a,
  gold: new THREE.Color("#e8a44a"),
  goldSoft: new THREE.Color("#f2c27a"),
  blue: new THREE.Color("#7fb6fa"),
  beige: new THREE.Color("#a69c86")
} as const;

export const FONTS = {
  sans: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  comic: "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive",
  impact: "Impact, 'Arial Black', sans-serif",
  times: "'Times New Roman', Times, serif"
} as const;

/** Per-frame values every part of the scene reads. */
export type FrameState = {
  /** Smoothed scroll progress through the journey (0 → 1). */
  progress: number;
  /** Camera position along the line (0 → CAMERA_MAX_U). */
  cameraU: number;
  /** 0 → 1 while the camera rises to the final overview. */
  finale: number;
  /** How far ahead the line is drawn. */
  revealU: number;
  elapsed: number;
  delta: number;
  reduceMotion: boolean;
};

export type ScenePart = {
  update?: (state: FrameState) => void;
};

export type DrawFn = (context: CanvasRenderingContext2D, width: number, height: number) => void;

export function createCanvasTexture(width: number, height: number, draw: DrawFn): THREE.CanvasTexture {
  const surface = document.createElement("canvas");
  surface.width = width;
  surface.height = height;
  const context = surface.getContext("2d");
  if (!context) throw new Error("2D canvas is not available");
  draw(context, width, height);
  const texture = new THREE.CanvasTexture(surface);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function roundRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

export function smoothstep(value: number, edge0: number, edge1: number): number {
  return THREE.MathUtils.smoothstep(value, edge0, edge1);
}

/** Frees every geometry, material and texture under an object. */
export function disposeObject(root: THREE.Object3D) {
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    mesh.geometry?.dispose();
    const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
    materials.forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value instanceof THREE.Texture) value.dispose();
      });
      material.dispose();
    });
  });
}