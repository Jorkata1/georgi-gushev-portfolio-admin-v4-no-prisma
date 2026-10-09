import * as THREE from "three";
import type { JourneySceneCopy } from "@/components/home/journey/journey-copy";
import type { JourneyPath } from "@/components/home/journey/scene/journey-path";
import { getChaosFragments } from "@/components/home/journey/scene/chaos-fragments";
import { createCanvasTexture, roundRect, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

/** Minimum space between two panels, in world units. */
const PANEL_GAP = 0.35;
const PLACEMENT_ATTEMPTS = 40;

/** Chapter 01: tilted fragments of old websites float around a torn, wobbling line. */
export function createChaos(scene: THREE.Scene, path: JourneyPath, copy: JourneySceneCopy, isSmallScreen: boolean): ScenePart {
  const group = new THREE.Group();
  const fragments = getChaosFragments(copy).map((fragment) => ({
    texture: createCanvasTexture(fragment.width, fragment.height, fragment.draw),
    aspect: fragment.width / fragment.height
  }));
  const panels: Array<{ mesh: THREE.Mesh; spin: number }> = [];

  // Each panel claims a sphere around its centre; a new panel is only placed where it cannot touch
  // another one, however it is tilted or spun. The warning sign claims its space first.
  const warningU = 0.1;
  const warningOffset = path.sideAt(warningU).multiplyScalar(-3.5).add(new THREE.Vector3(0, 2.6, 0));
  const occupied: Array<{ center: THREE.Vector3; radius: number }> = [
    { center: path.pointAt(warningU).add(warningOffset), radius: 3.3 }
  ];
  const isFree = (center: THREE.Vector3, radius: number) =>
    occupied.every((other) => other.center.distanceTo(center) > other.radius + radius + PANEL_GAP);

  const panelCount = isSmallScreen ? 20 : 32;
  for (let i = 0; i < panelCount; i += 1) {
    const fragment = fragments[i % fragments.length];
    const height = 0.9 + Math.random() * 1.2;
    const radius = (height * Math.hypot(fragment.aspect, 1)) / 2;
    let placement: { u: number; offset: THREE.Vector3; center: THREE.Vector3 } | null = null;
    for (let attempt = 0; attempt < PLACEMENT_ATTEMPTS && !placement; attempt += 1) {
      const u = 0.015 + Math.random() * 0.14;
      const lateral = (Math.random() < 0.5 ? -1 : 1) * (3.6 + radius + Math.random() * 7);
      const offset = path.sideAt(u).multiplyScalar(lateral).add(new THREE.Vector3(0, -1.5 + Math.random() * 7, 0));
      const center = path.pointAt(u).add(offset);
      if (isFree(center, radius)) placement = { u, offset, center };
    }
    if (!placement) continue;
    occupied.push({ center: placement.center, radius });

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(height * fragment.aspect, height),
      // Front side only: once the camera has passed a panel, its mirrored back is not shown.
      new THREE.MeshBasicMaterial({ map: fragment.texture, transparent: true, opacity: 0.95 })
    );
    path.placeFacingCamera(mesh, placement.u, placement.offset);
    // Facing the visitor, but knocked off balance like a page that never got laid out.
    mesh.rotateX(Math.random() * 0.7 - 0.35);
    mesh.rotateY(Math.random() * 0.9 - 0.45);
    mesh.rotateZ(Math.random() * 0.7 - 0.35);
    panels.push({ mesh, spin: (Math.random() - 0.5) * 0.25 });
    group.add(mesh);
  }

  const warning = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 2.2),
    new THREE.MeshBasicMaterial({
      transparent: true,
      map: createCanvasTexture(768, 280, (ctx, w, h) => {
        roundRect(ctx, 8, 8, w - 16, h - 16, 36);
        ctx.fillStyle = "rgba(11,22,39,0.92)";
        ctx.fill();
        ctx.strokeStyle = "rgba(248,113,113,0.7)";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fillStyle = "#f87171";
        ctx.font = "700 44px 'JetBrains Mono', monospace";
        ctx.fillText(copy.loading, 56, 120, w - 100);
        ctx.fillStyle = "#eef2f8";
        ctx.font = "600 40px system-ui, sans-serif";
        ctx.fillText(copy.visitorLeft, 56, 200, w - 100);
      })
    })
  );
  path.placeFacingCamera(warning, warningU, warningOffset);
  group.add(warning);
  scene.add(group);

  return {
    update(state: FrameState) {
      if (state.reduceMotion) return;
      panels.forEach((panel) => panel.mesh.rotateZ(panel.spin * state.delta));
    }
  };
}