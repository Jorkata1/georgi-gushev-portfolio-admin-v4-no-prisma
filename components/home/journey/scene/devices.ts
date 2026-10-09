import * as THREE from "three";
import { CHAPTER_STATIONS } from "@/components/home/journey/journey-config";
import type { JourneySceneCopy } from "@/components/home/journey/journey-copy";
import { proximity, type JourneyPath } from "@/components/home/journey/scene/journey-path";
import { drawSite } from "@/components/home/journey/scene/device-site";
import { SCENE_COLORS, createCanvasTexture, roundRect, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

const LAUNCH_U = CHAPTER_STATIONS[4] + 0.005;
const BODY = "#121925";

type DeviceSpec = {
  width: number;
  side: number;
  raise: number;
  canvas: [number, number];
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, copy: JourneySceneCopy) => void;
};

function drawBody(ctx: CanvasRenderingContext2D, w: number, h: number, radius: number, rim: number) {
  roundRect(ctx, 4, 4, w - 8, h - 8, radius);
  ctx.fillStyle = BODY;
  ctx.fill();
  ctx.strokeStyle = `rgba(255,255,255,${rim})`;
  ctx.lineWidth = 5;
  ctx.stroke();
}

const DEVICES: DeviceSpec[] = [
  {
    width: 9.4, side: 0, raise: 0, canvas: [2048, 1480],
    draw(ctx, w, h, copy) {
      const screenH = h * 0.78;
      ctx.fillStyle = "#151b26";
      ctx.fillRect(w * 0.42, screenH, w * 0.16, h * 0.15);
      roundRect(ctx, w * 0.3, h * 0.93, w * 0.4, h * 0.05, h * 0.02);
      ctx.fillStyle = "#1d2533";
      ctx.fill();
      roundRect(ctx, 4, 4, w - 8, screenH, 36);
      ctx.fillStyle = BODY;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 4;
      ctx.stroke();
      drawSite(ctx, copy, 34, 34, w - 68, screenH - 68, "wide");
    }
  },
  {
    width: 4.3, side: -8.6, raise: 1.1, canvas: [1200, 1640],
    draw(ctx, w, h, copy) {
      drawBody(ctx, w, h, 90, 0.16);
      ctx.fillStyle = "#2a3446";
      ctx.beginPath();
      ctx.arc(w / 2, 34, 9, 0, Math.PI * 2);
      ctx.fill();
      drawSite(ctx, copy, 58, 64, w - 116, h - 128, "narrow");
    }
  },
  {
    width: 2.3, side: 8.2, raise: 0.8, canvas: [760, 1560],
    draw(ctx, w, h, copy) {
      drawBody(ctx, w, h, 120, 0.18);
      drawSite(ctx, copy, 30, 30, w - 60, h - 60, "narrow");
      roundRect(ctx, w / 2 - 90, 54, 180, 48, 24);
      ctx.fillStyle = "#000000";
      ctx.fill();
    }
  }
];

/** Chapter 05: the line splits into three glowing threads that plug into desktop, tablet and phone. */
export function createDevices(scene: THREE.Scene, path: JourneyPath, copy: JourneySceneCopy, renderer: THREE.WebGLRenderer, isSmallScreen: boolean): ScenePart {
  // On a portrait phone the three devices are drawn smaller and closer together so all fit.
  const sizeScale = isSmallScreen ? 0.6 : 1;
  const spreadScale = isSmallScreen ? 0.48 : 1;
  const group = new THREE.Group();
  const glowTexture = createCanvasTexture(256, 256, (ctx, w, h) => {
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    gradient.addColorStop(0, "rgba(127,182,250,0.45)");
    gradient.addColorStop(0.5, "rgba(232,164,74,0.16)");
    gradient.addColorStop(1, "rgba(6,14,26,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  });
  const branchCore = new THREE.MeshBasicMaterial({ color: SCENE_COLORS.goldSoft, transparent: true });
  const branchHalo = new THREE.MeshBasicMaterial({ color: SCENE_COLORS.gold, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false });

  const devices = DEVICES.map((spec, index) => {
    const [canvasWidth, canvasHeight] = spec.canvas;
    const width = spec.width * sizeScale;
    const height = (width * canvasHeight) / canvasWidth;
    const texture = createCanvasTexture(canvasWidth, canvasHeight, (ctx, w, h) => spec.draw(ctx, w, h, copy));
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const screenMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, fog: false });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), screenMaterial);
    const glowMaterial = new THREE.MeshBasicMaterial({ map: glowTexture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(width * 2.2, height * 1.9), glowMaterial);
    glow.position.z = -0.15;
    mesh.add(glow);

    const offset = path.sideAt(LAUNCH_U).multiplyScalar(spec.side * spreadScale).add(new THREE.Vector3(0, height / 2 + spec.raise * sizeScale, 0));
    path.placeFacingCamera(mesh, LAUNCH_U, offset);
    const base = mesh.position.clone();
    group.add(mesh);

    if (spec.side !== 0) {
      const start = path.pointAt(LAUNCH_U - 0.05).add(new THREE.Vector3(0, 0.02, 0));
      const end = base.clone().add(new THREE.Vector3(0, -height / 2 + 0.05, 0));
      const control = start.clone().lerp(end, 0.55);
      control.y = start.y - 0.1;
      const curve = new THREE.QuadraticBezierCurve3(start, control, end);
      group.add(
        new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.035, 10, false), branchCore),
        new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.16, 10, false), branchHalo)
      );
    }
    return { mesh, base, screenMaterial, glowMaterial, index };
  });
  scene.add(group);

  const lift = new THREE.Vector3();
  return {
    update(state: FrameState) {
      const visibility = proximity(state.cameraU, LAUNCH_U, 0.1, 0.5);
      group.visible = visibility > 0.001;
      if (!group.visible) return;
      devices.forEach((device) => {
        const float = state.reduceMotion ? 0 : Math.sin(state.elapsed * 1.2 + device.index) * 0.12;
        device.mesh.position.copy(device.base).add(lift.set(0, float - (1 - visibility) * 3, 0));
        device.screenMaterial.opacity = visibility;
        device.glowMaterial.opacity = visibility * 0.9;
      });
      branchCore.opacity = visibility;
      branchHalo.opacity = visibility * 0.22;
    }
  };
}