import * as THREE from "three";
import { chaosAt, type JourneyPath } from "@/components/home/journey/scene/journey-path";
import { SCENE_COLORS, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

/** Detail of the line along its length (same on every screen). */
const RIBBON_SAMPLES = 2400;
const TRAIL_SEGMENTS = 800;

function buildRibbonGeometry(path: JourneyPath, width: number, samples: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i <= samples; i += 1) {
    const u = i / samples;
    const point = path.pointAt(u);
    const tangent = path.tangentAt(u);
    const side = path.sideAt(u);
    const chaos = chaosAt(u);
    // In the chaos stretch the ribbon twists and wobbles; once structure begins it lies flat.
    side.applyAxisAngle(tangent, chaos * Math.sin(u * 140) * 1.1);
    point.y += chaos * Math.sin(u * 95) * 0.9;
    const half = side.multiplyScalar(width / 2);
    positions.push(point.x - half.x, point.y - half.y, point.z - half.z, point.x + half.x, point.y + half.y, point.z + half.z);
    uvs.push(u, 0, u, 1);
    if (i < samples) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vDepth = -viewPosition.z;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const SHARED_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform vec3 uGold;
  uniform vec3 uBeige;
  uniform float uFlow;
  varying vec2 vUv;
  varying float vDepth;
  float hash(float n) { return fract(sin(n) * 43758.5453); }
`;

/** Crisp edge rails, a bright centre filament and soft light packets travelling forward. */
const CORE_FRAGMENT = /* glsl */ `
  ${SHARED_FRAGMENT}
  void main() {
    float chaos = 1.0 - smoothstep(0.12, 0.21, vUv.x);
    if (chaos > 0.35 && step(0.58, hash(floor(vUv.x * 170.0))) > 0.5) discard;
    float across = abs(vUv.y - 0.5) * 2.0;
    float reveal = smoothstep(uReveal + 0.04, uReveal - 0.015, vUv.x);
    float fog = exp(-vDepth * 0.02);
    vec3 base = mix(uBeige, uGold, smoothstep(0.14, 0.26, vUv.x));
    vec3 hot = vec3(1.0, 0.93, 0.78);
    float order = 1.0 - chaos;
    float aa = fwidth(across) * 1.5;
    float rails = 1.0 - smoothstep(0.0, aa + 0.015, abs(across - 0.9));
    float core = exp(-across * across * 40.0);
    float body = 0.1 * (1.0 - smoothstep(0.9, 1.0, across));
    float packets = smoothstep(0.86, 1.0, sin(vUv.x * 120.0 - uTime * 2.2)) * uFlow * order;
    float head = exp(-pow((vUv.x - uReveal + 0.01) * 70.0, 2.0)) * order;
    vec3 color = base * (body + rails * 0.95) + mix(base, hot, 0.55) * core * 0.85
      + hot * (packets * 1.1 + head * 2.0) * (core + rails * 0.4);
    float alpha = clamp(body + rails * 0.9 + core * 0.75 + (packets + head) * core, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha * reveal * fog);
  }
`;

const GLOW_FRAGMENT = /* glsl */ `
  ${SHARED_FRAGMENT}
  void main() {
    float chaos = 1.0 - smoothstep(0.12, 0.21, vUv.x);
    if (chaos > 0.35 && step(0.58, hash(floor(vUv.x * 170.0))) > 0.5) discard;
    float across = abs(vUv.y - 0.5) * 2.0;
    float reveal = smoothstep(uReveal + 0.04, uReveal - 0.015, vUv.x);
    float fog = exp(-vDepth * 0.02);
    vec3 base = mix(uBeige, uGold, smoothstep(0.14, 0.26, vUv.x));
    gl_FragColor = vec4(base, exp(-across * across * 5.0) * 0.15 * reveal * fog);
  }
`;

export function createRibbon(scene: THREE.Scene, path: JourneyPath, reduceMotion: boolean): ScenePart {
  const uniforms = {
    uTime: { value: 0 },
    uReveal: { value: 0.2 },
    uGold: { value: SCENE_COLORS.gold },
    uBeige: { value: SCENE_COLORS.beige },
    uFlow: { value: reduceMotion ? 0 : 1 }
  };
  const samples = RIBBON_SAMPLES;
  const shared = { uniforms, vertexShader: VERTEX_SHADER, transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending };

  const core = new THREE.Mesh(buildRibbonGeometry(path, 0.9, samples), new THREE.ShaderMaterial({ ...shared, fragmentShader: CORE_FRAGMENT }));
  const glow = new THREE.Mesh(buildRibbonGeometry(path, 4.2, samples), new THREE.ShaderMaterial({ ...shared, fragmentShader: GLOW_FRAGMENT }));

  // In the final overview the whole route lights up as one bright line.
  const trailMaterial = new THREE.MeshBasicMaterial({ color: SCENE_COLORS.goldSoft, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
  const trail = new THREE.Mesh(new THREE.TubeGeometry(path.curve, TRAIL_SEGMENTS, 0.32, 8, false), trailMaterial);

  scene.add(glow, core, trail);

  return {
    update(state: FrameState) {
      uniforms.uTime.value = state.elapsed;
      uniforms.uReveal.value = state.revealU;
      trailMaterial.opacity = state.finale * 0.85;
    }
  };
}