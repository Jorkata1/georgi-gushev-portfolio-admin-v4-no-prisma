import * as THREE from "three";
import { CAMERA_LEAD, CHAPTER_STATIONS } from "@/components/home/journey/journey-config";
import type { JourneySceneCopy } from "@/components/home/journey/journey-copy";
import { chapterBuild, staggered, type JourneyPath } from "@/components/home/journey/scene/journey-path";
import { drawSite } from "@/components/home/journey/scene/device-site";
import { SCENE_COLORS, createCanvasTexture, roundRect, smoothstep, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

const LAUNCH_CHAPTER = 4;
const LAUNCH_U = CHAPTER_STATIONS[LAUNCH_CHAPTER] + 0.005;
/**
 * The desktop stands right on the line, so the devices leave before the camera reaches them:
 * they fade out between these two points, the desktop rising over the camera, the others sliding aside.
 */
const LEAVE_START = LAUNCH_U - CAMERA_LEAD + 0.012;
const LEAVE_END = LAUNCH_U - 0.012;
const LEAVE_RISE = 4;
const LEAVE_SPREAD = 3;
/** Share of the build each part takes: the branches grow first, then the device lights up. */
const BRANCH_SHARE = 0.55;
/** A device starts this much smaller and lower, then settles into place. */
const START_SCALE = 0.86;
const START_DROP = 1.4;
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

  /** Branch tubes grow from the main line towards their device as the scene builds. */
  const branches: Array<{ index: number; core: THREE.TubeGeometry; halo: THREE.TubeGeometry }> = [];
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
      branches.push({
        index,
        core: new THREE.TubeGeometry(curve, 64, 0.035, 10, false),
        halo: new THREE.TubeGeometry(curve, 64, 0.16, 10, false)
      });
      const latest = branches[branches.length - 1];
      group.add(new THREE.Mesh(latest.core, branchCore), new THREE.Mesh(latest.halo, branchHalo));
    }
    const outward = path.sideAt(LAUNCH_U).multiplyScalar(Math.sign(spec.side));
    return { mesh, base, outward, screenMaterial, glowMaterial, index };
  });
  scene.add(group);

  const lift = new THREE.Vector3();
  const growBranch = (geometry: THREE.TubeGeometry, amount: number) => {
    const total = geometry.index?.count ?? 0;
    // Whole tube segments only (each one is radialSegments quads × 6 indices).
    const segment = geometry.parameters.radialSegments * 6;
    geometry.setDrawRange(0, Math.round((total * amount) / segment) * segment);
  };

  return {
    update(state: FrameState) {
      const build = chapterBuild(state.cameraU, LAUNCH_CHAPTER);
      const leave = smoothstep(state.cameraU, LEAVE_START, LEAVE_END);
      const fade = 1 - leave;
      group.visible = build > 0.001 && fade > 0.001;
      if (!group.visible) return;

      // Desktop first, then tablet and phone; each device lights up once its branch has reached it.
      const reveals = devices.map((device) => staggered(build, device.index, devices.length));
      branches.forEach((branch) => {
        const grow = Math.min(1, reveals[branch.index] / BRANCH_SHARE);
        growBranch(branch.core, grow);
        growBranch(branch.halo, grow);
      });
      branchCore.opacity = fade;
      branchHalo.opacity = fade * 0.22;

      devices.forEach((device) => {
        const isBranched = device.index !== 0;
        const raw = reveals[device.index];
        const appear = isBranched ? Math.max(0, (raw - BRANCH_SHARE * 0.6) / (1 - BRANCH_SHARE * 0.6)) : raw;
        const float = state.reduceMotion ? 0 : Math.sin(state.elapsed * 1.2 + device.index) * 0.12;
        const rise = isBranched ? 0 : leave * LEAVE_RISE;
        device.mesh.position
          .copy(device.base)
          .add(lift.set(0, float - (1 - appear) * START_DROP + rise, 0))
          .addScaledVector(device.outward, leave * LEAVE_SPREAD);
        device.mesh.scale.setScalar(START_SCALE + (1 - START_SCALE) * appear);
        device.screenMaterial.opacity = appear * fade;
        device.glowMaterial.opacity = appear * fade * 0.9;
      });
    }
  };
}