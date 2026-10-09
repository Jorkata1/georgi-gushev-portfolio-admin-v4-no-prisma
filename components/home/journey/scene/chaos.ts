import * as THREE from "three";
import type { JourneySceneCopy } from "@/components/home/journey/journey-copy";
import type { JourneyPath } from "@/components/home/journey/scene/journey-path";
import { getChaosFragments } from "@/components/home/journey/scene/chaos-fragments";
import { createCanvasTexture, roundRect, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

/** Chapter 01: tilted fragments of old websites float around a torn, wobbling line. */
export function createChaos(scene: THREE.Scene, path: JourneyPath, copy: JourneySceneCopy, isSmallScreen: boolean): ScenePart {
  const group = new THREE.Group();
  const fragments = getChaosFragments(copy).map((fragment) => ({
    texture: createCanvasTexture(fragment.width, fragment.height, fragment.draw),
    aspect: fragment.width / fragment.height
  }));
  const panels: Array<{ mesh: THREE.Mesh; spin: number }> = [];

  const panelCount = isSmallScreen ? 22 : 38;
  for (let i = 0; i < panelCount; i += 1) {
    const u = 0.015 + Math.random() * 0.14;
    const lateral = (Math.random() < 0.5 ? -1 : 1) * (3.6 + Math.random() * 7);
    const offset = path.sideAt(u).multiplyScalar(lateral).add(new THREE.Vector3(0, -1.5 + Math.random() * 7, 0));
    const fragment = fragments[i % fragments.length];
    const height = 0.9 + Math.random() * 1.4;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(height * fragment.aspect, height),
      new THREE.MeshBasicMaterial({ map: fragment.texture, transparent: true, opacity: 0.95, side: THREE.DoubleSide })
    );
    path.placeFacingCamera(mesh, u, offset);
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
  path.placeFacingCamera(warning, 0.1, path.sideAt(0.1).multiplyScalar(-3.5).add(new THREE.Vector3(0, 2.6, 0)));
  group.add(warning);
  scene.add(group);

  return {
    update(state: FrameState) {
      if (state.reduceMotion) return;
      panels.forEach((panel) => panel.mesh.rotateZ(panel.spin * state.delta));
    }
  };
}