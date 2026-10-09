import * as THREE from "three";
import { FONTS } from "@/components/home/journey/scene/scene-kit";

/** The brand wordmark from the site's public folder (transparent PNG). */
export const LOGO_SRC = "/branding/logo-full.png";
/** Width of the sampling canvas; the logo's own aspect ratio sets the height. */
const SAMPLE_WIDTH = 420;
const ALPHA_THRESHOLD = 140;

export type LogoSample = {
  /** Target positions in logo units: x in [-0.5, 0.5] × aspect-scaled y, z = 0. */
  points: Float32Array;
  colors: Float32Array;
  count: number;
  aspect: number;
  /** Sampling step in canvas pixels; sets how far apart neighbouring particles are. */
  step: number;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src}`));
    image.src = src;
  });
}

/** Fallback when the logo file cannot be loaded: the name set in type, in brand colors. */
function drawFallbackLogo(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#4a78bc";
  ctx.font = `900 ${height * 0.9}px ${FONTS.sans}`;
  ctx.fillText("GDX", 0, height / 2, width * 0.82);
  ctx.fillStyle = "#d8ab63";
  ctx.font = `800 ${height * 0.22}px ${FONTS.sans}`;
  ctx.fillText("STUDIO", width * 0.84, height / 2, width * 0.16);
}

/** Samples the opaque pixels of the logo into point targets and their colors. */
export async function sampleLogo(step: number): Promise<{ sample: LogoSample; image: HTMLImageElement | null }> {
  let image: HTMLImageElement | null = null;
  try {
    image = await loadImage(LOGO_SRC);
  } catch (error) {
    console.warn("[journey] Logo image unavailable, using a text fallback", error);
  }
  const aspect = image ? image.naturalWidth / image.naturalHeight : 3.8;
  const width = SAMPLE_WIDTH;
  const height = Math.round(width / aspect);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D canvas is not available");
  if (image) ctx.drawImage(image, 0, 0, width, height);
  else drawFallbackLogo(ctx, width, height);

  const pixels = ctx.getImageData(0, 0, width, height).data;
  const points: number[] = [];
  const colors: number[] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const index = (y * width + x) * 4;
      if (pixels[index + 3] < ALPHA_THRESHOLD) continue;
      points.push(x / width - 0.5, (0.5 - y / height) / aspect, 0);
      colors.push(pixels[index] / 255, pixels[index + 1] / 255, pixels[index + 2] / 255);
    }
  }
  return {
    sample: { points: new Float32Array(points), colors: new Float32Array(colors), count: points.length / 3, aspect, step },
    image
  };
}

const VERTEX_SHADER = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aColor;
  attribute float aDelay;
  attribute float aSeed;
  uniform float uAssemble;
  uniform float uTime;
  uniform float uSize;
  uniform float uViewScale;
  uniform float uMotion;
  varying vec3 vColor;
  varying float vSettled;

  float easeInOutCubic(float t) {
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
  }

  void main() {
    // Each particle starts its flight at its own moment, so the logo builds up rather than snapping.
    float t = clamp((uAssemble - aDelay * 0.45) / 0.55, 0.0, 1.0);
    float e = easeInOutCubic(t);
    float angle = aSeed * 6.2831 + uTime * 0.6;
    vec3 swirl = vec3(sin(angle), cos(angle * 1.3), sin(angle * 0.7)) * (1.0 - e) * 3.0 * uMotion;
    vec3 shimmer = vec3(0.0, 0.0, sin(uTime * 2.0 + aSeed * 40.0) * 0.06 * e * uMotion);
    vec3 transformed = mix(aStart, position, e) + swirl + shimmer;
    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    // uSize is in world units; uViewScale turns it into pixels at distance 1.
    gl_PointSize = min(uSize * (1.0 + (1.0 - e) * 0.5) * uViewScale / -viewPosition.z, 14.0);
    vColor = mix(vec3(0.95, 0.76, 0.48), aColor, e);
    vSettled = e;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vSettled;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor * (1.2 + (1.0 - vSettled) * 0.6), alpha * uOpacity);
  }
`;

export type LogoParticles = {
  points: THREE.Points;
  uniforms: {
    uAssemble: { value: number };
    uTime: { value: number };
    uSize: { value: number };
    /** Drawing-buffer height / (2·tan(fov / 2)); set on resize. */
    uViewScale: { value: number };
    uMotion: { value: number };
    uOpacity: { value: number };
  };
};

/** A point cloud whose particles fly from a scattered cloud into the sampled logo shape. */
export function createLogoParticles(sample: LogoSample, logoWidth: number, scatter: number, reduceMotion: boolean): LogoParticles {
  const { count } = sample;
  const targets = new Float32Array(count * 3);
  const starts = new Float32Array(count * 3);
  const delays = new Float32Array(count);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    targets[i * 3] = sample.points[i * 3] * logoWidth;
    targets[i * 3 + 1] = sample.points[i * 3 + 1] * logoWidth;
    targets[i * 3 + 2] = 0;
    // Start positions: a wide, uneven cloud around the logo, mostly in front of it.
    starts[i * 3] = (Math.random() - 0.5) * scatter * 2;
    starts[i * 3 + 1] = (Math.random() - 0.5) * scatter * 1.2;
    // Mostly behind and around the logo, so the cloud never rushes into the camera.
    starts[i * 3 + 2] = (Math.random() - 0.75) * scatter;
    delays[i] = Math.random();
    seeds[i] = Math.random();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(targets, 3));
  geometry.setAttribute("aStart", new THREE.BufferAttribute(starts, 3));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(sample.colors, 3));
  geometry.setAttribute("aDelay", new THREE.BufferAttribute(delays, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  // The particles travel far from their target positions, so never cull them by the target bounds.
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), scatter * 2);

  const uniforms = {
    uAssemble: { value: 0 },
    uTime: { value: 0 },
    uSize: { value: (logoWidth / SAMPLE_WIDTH) * sample.step * 1.35 },
    uViewScale: { value: 800 },
    uMotion: { value: reduceMotion ? 0 : 1 },
    uOpacity: { value: 0 }
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  return { points: new THREE.Points(geometry, material), uniforms };
}