import * as THREE from "three";
import { CHAPTER_STATIONS } from "@/components/home/journey/journey-config";
import type { JourneyPath } from "@/components/home/journey/scene/journey-path";
import { SCENE_COLORS, createCanvasTexture, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

const CODE_LINES = [
  "export default function Page() {",
  "<Hero priority format=\"avif\" />",
  "await optimizeImages({ quality: 80 })",
  "const lcp = 1.2 // seconds",
  "<section aria-label=\"Services\">",
  "lighthouse.performance === 97",
  "font-display: swap;",
  "cache: \"force-cache\"",
  "<Image sizes=\"(max-width: 768px) 100vw\" />",
  "next build ✓ compiled"
];

/** Chapter 03: a tunnel of gold rings lined with lines of code. */
export function createCodeTunnel(scene: THREE.Scene, path: JourneyPath, isSmallScreen: boolean): ScenePart {
  const group = new THREE.Group();
  const start = CHAPTER_STATIONS[2] - 0.07;
  const textures = CODE_LINES.map((line) =>
    createCanvasTexture(1024, 96, (ctx) => {
      ctx.font = "700 46px 'JetBrains Mono', monospace";
      ctx.fillStyle = line.includes("97") || line.includes("✓") ? "#34d399" : "#7fb6fa";
      ctx.fillText(line, 12, 64);
    })
  );
  const ringMaterial = new THREE.MeshBasicMaterial({ color: SCENE_COLORS.gold, transparent: true, opacity: 0.55 });
  const ringGeometry = new THREE.TorusGeometry(4.2, 0.025, 6, 96);
  for (let i = 0; i < 14; i += 1) {
    const u = start + i * 0.008;
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.copy(path.pointAt(u)).add(new THREE.Vector3(0, 1, 0));
    ring.lookAt(ring.position.clone().add(path.tangentAt(u)));
    group.add(ring);
  }
  const labelGeometry = new THREE.PlaneGeometry(5.2, 0.49);
  for (let i = 0; i < (isSmallScreen ? 18 : 30); i += 1) {
    const u = start - 0.005 + Math.random() * 0.12;
    const angle = Math.random() * Math.PI * 2;
    const radius = 3.1 + Math.random() * 0.8;
    const offset = path.sideAt(u).multiplyScalar(Math.cos(angle) * radius).add(new THREE.Vector3(0, 1 + Math.sin(angle) * radius, 0));
    const label = new THREE.Mesh(
      labelGeometry,
      new THREE.MeshBasicMaterial({ map: textures[i % textures.length], transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false })
    );
    path.placeFacingCamera(label, u, offset);
    group.add(label);
  }
  scene.add(group);
  return {};
}

const MARKER_COUNT = 22;
const MARKER_SIZE = 0.42;

/** Round badge with a glyph: a red "!" for an issue, a green tick once it is fixed. */
function createBadgeTexture(fill: string, drawGlyph: (ctx: CanvasRenderingContext2D, size: number) => void) {
  return createCanvasTexture(128, 128, (ctx, w, h) => {
    const glow = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w / 2);
    glow.addColorStop(0, fill);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w * 0.34, 0, Math.PI * 2);
    ctx.fill();
    drawGlyph(ctx, w);
  });
}

/** Chapter 04: a scanner ring; issue badges turn into green ticks as the camera passes them. */
export function createTestScanner(scene: THREE.Scene, path: JourneyPath): ScenePart {
  const group = new THREE.Group();
  const testU = CHAPTER_STATIONS[3] - 0.005;
  const scanner = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.09, 12, 128), new THREE.MeshBasicMaterial({ color: SCENE_COLORS.gold }));
  scanner.position.copy(path.pointAt(testU)).add(new THREE.Vector3(0, 1, 0));
  scanner.lookAt(scanner.position.clone().add(path.tangentAt(testU)));
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(3.8, 0.5, 12, 128),
    new THREE.MeshBasicMaterial({ color: SCENE_COLORS.gold, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  halo.position.copy(scanner.position);
  halo.quaternion.copy(scanner.quaternion);
  group.add(scanner, halo);

  const issueTexture = createBadgeTexture("#ef4444", (ctx, size) => {
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 62px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("!", size / 2, size / 2 + 3);
  });
  const fixedTexture = createBadgeTexture("#34d399", (ctx, size) => {
    ctx.strokeStyle = "#06281c";
    ctx.lineWidth = 11;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(size * 0.34, size * 0.52);
    ctx.lineTo(size * 0.45, size * 0.63);
    ctx.lineTo(size * 0.67, size * 0.39);
    ctx.stroke();
  });

  const markers = Array.from({ length: MARKER_COUNT }, (_, i) => {
    const u = testU - 0.06 + (i / MARKER_COUNT) * 0.11;
    const lateral = (i % 2 === 0 ? -1 : 1) * (0.9 + Math.random() * 1.6);
    const position = path.pointAt(u).add(path.sideAt(u).multiplyScalar(lateral)).add(new THREE.Vector3(0, 0.5 + Math.random() * 2.2, 0));
    const issue = new THREE.Sprite(new THREE.SpriteMaterial({ map: issueTexture, transparent: true, depthWrite: false }));
    const fixed = new THREE.Sprite(new THREE.SpriteMaterial({ map: fixedTexture, transparent: true, depthWrite: false, opacity: 0 }));
    issue.position.copy(position);
    fixed.position.copy(position);
    issue.scale.setScalar(MARKER_SIZE);
    fixed.scale.setScalar(0.001);
    group.add(issue, fixed);
    return { u, issue, fixed, state: 0, phase: Math.random() * Math.PI * 2 };
  });
  scene.add(group);

  return {
    update(state: FrameState) {
      scanner.rotation.z = state.reduceMotion ? 0 : state.elapsed * 0.4;
      markers.forEach((marker) => {
        // Turns into a tick once the camera passes; the swap plays on its own clock, with a small pop.
        const target = marker.u < state.cameraU + 0.025 ? 1 : 0;
        marker.state += (target - marker.state) * (state.reduceMotion ? 1 : Math.min(1, state.delta * 7));
        const pulse = state.reduceMotion ? 1 : 1 + Math.sin(state.elapsed * 4 + marker.phase) * 0.08;
        const pop = Math.sin(marker.state * Math.PI) * 0.35;
        marker.issue.material.opacity = 1 - marker.state;
        marker.issue.scale.setScalar(MARKER_SIZE * pulse * (1 - marker.state * 0.6));
        marker.fixed.material.opacity = marker.state;
        marker.fixed.scale.setScalar(Math.max(0.001, MARKER_SIZE * (marker.state + pop)));
      });
    }
  };
}