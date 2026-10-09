import * as THREE from "three";
import type { JourneyPath } from "@/components/home/journey/scene/journey-path";
import { createCanvasTexture, smoothstep, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

export type FinalePart = ScenePart & { logo: THREE.Mesh };

/** Chapter 06: the line ends in the GDX mark, which turns to face the overview camera. */
export function createFinale(scene: THREE.Scene, path: JourneyPath, camera: THREE.Camera): FinalePart {
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    depthWrite: false,
    map: createCanvasTexture(1500, 600, (ctx, w, h) => {
      const glow = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2);
      glow.addColorStop(0, "rgba(232,164,74,0.28)");
      glow.addColorStop(1, "rgba(232,164,74,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      ctx.textAlign = "center";
      ctx.fillStyle = "#e8a44a";
      ctx.font = "700 300px Georgia, serif";
      ctx.fillText("GDX", w / 2, h * 0.62);
      ctx.fillStyle = "#eef2f8";
      ctx.font = "700 64px 'JetBrains Mono', monospace";
      ctx.fillText("S T U D I O", w / 2, h * 0.86);
    })
  });
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(18, 7.2), material);
  const endPoint = path.pointAt(1);
  const endTangent = path.tangentAt(1);
  logo.position.copy(endPoint).add(new THREE.Vector3(0, 4.2, 0)).add(endTangent.clone().multiplyScalar(2));
  logo.lookAt(logo.position.clone().sub(endTangent).add(new THREE.Vector3(0, 0.25, 0)));
  scene.add(logo);

  const baseQuaternion = logo.quaternion.clone();
  const facing = new THREE.Object3D();

  return {
    logo,
    update(state: FrameState) {
      material.opacity = smoothstep(state.progress, 0.74, 0.9);
      logo.scale.setScalar(1 + state.finale * 2.2);
      logo.quaternion.copy(baseQuaternion);
      if (state.finale <= 0) return;
      facing.position.copy(logo.position);
      facing.lookAt(camera.position);
      logo.quaternion.slerp(facing.quaternion, state.finale);
    }
  };
}

/** Faint stars scattered along the route for depth. */
export function createStars(scene: THREE.Scene, path: JourneyPath, isSmallScreen: boolean): ScenePart {
  const count = isSmallScreen ? 900 : 1800;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const point = path.pointAt(Math.random());
    positions[i * 3] = point.x + (Math.random() - 0.5) * 120;
    positions[i * 3 + 1] = point.y + (Math.random() - 0.3) * 60;
    positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 60;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  scene.add(new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x7fb6fa, size: 0.12, transparent: true, opacity: 0.55 })));
  return {};
}