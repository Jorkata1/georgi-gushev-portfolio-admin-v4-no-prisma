import * as THREE from "three";
import { CHAPTER_STATIONS, PROJECTS_CHAPTER } from "@/components/home/journey/journey-config";
import { proximity, type JourneyPath } from "@/components/home/journey/scene/journey-path";
import { FONTS, createCanvasTexture, roundRect, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

export type JourneyProject = {
  slug: string;
  title: string;
  category: string;
  image: string;
};

const PROJECTS_U = CHAPTER_STATIONS[PROJECTS_CHAPTER];
const MAX_PROJECTS = 3;
const CARD_CANVAS = { width: 1024, height: 1280 } as const;
const CARD_WIDTH = 4.4;
const CARD_HEIGHT = (CARD_WIDTH * CARD_CANVAS.height) / CARD_CANVAS.width;
const IMAGE_HEIGHT = 0.64;
/** Images go through Next's optimizer: same origin (no CORS for WebGL), resized and compressed. */
const IMAGE_WIDTH = 1080;

/** Left, centre (a little higher and further away), right. */
const CARD_SLOTS = [
  { side: -6, lift: 3.1, ahead: 0, turn: 0.28 },
  { side: 0, lift: 4.1, ahead: 0.012, turn: 0 },
  { side: 6, lift: 3.1, ahead: 0, turn: -0.28 }
] as const;

function optimizedImageUrl(src: string): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${IMAGE_WIDTH}&q=75`;
}

function drawCard(ctx: CanvasRenderingContext2D, project: JourneyProject, viewLabel: string, image: HTMLImageElement | null) {
  const { width: w, height: h } = CARD_CANVAS;
  const imageH = h * IMAGE_HEIGHT;
  ctx.clearRect(0, 0, w, h);
  roundRect(ctx, 6, 6, w - 12, h - 12, 48);
  ctx.fillStyle = "#0b1627";
  ctx.fill();
  ctx.save();
  roundRect(ctx, 6, 6, w - 12, h - 12, 48);
  ctx.clip();
  if (image) {
    // Cover-fit the project image into the top part of the card.
    const scale = Math.max(w / image.naturalWidth, imageH / image.naturalHeight);
    const drawW = image.naturalWidth * scale;
    const drawH = image.naturalHeight * scale;
    ctx.drawImage(image, (w - drawW) / 2, (imageH - drawH) / 2, drawW, drawH);
  } else {
    const placeholder = ctx.createLinearGradient(0, 0, w, imageH);
    placeholder.addColorStop(0, "#1d3a6b");
    placeholder.addColorStop(1, "#e8a44a");
    ctx.fillStyle = placeholder;
    ctx.fillRect(0, 0, w, imageH);
  }
  const fade = ctx.createLinearGradient(0, imageH - 160, 0, imageH);
  fade.addColorStop(0, "rgba(11,22,39,0)");
  fade.addColorStop(1, "rgba(11,22,39,1)");
  ctx.fillStyle = fade;
  ctx.fillRect(0, imageH - 160, w, 160);
  ctx.restore();

  roundRect(ctx, 6, 6, w - 12, h - 12, 48);
  ctx.strokeStyle = "rgba(232,164,74,0.55)";
  ctx.lineWidth = 6;
  ctx.stroke();

  const pad = 64;
  ctx.fillStyle = "#e8a44a";
  ctx.font = `700 44px ${FONTS.mono}`;
  ctx.fillText(project.category.toUpperCase(), pad, imageH + 84, w - pad * 2);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 96px ${FONTS.serif}`;
  ctx.fillText(project.title, pad, imageH + 200, w - pad * 2);
  ctx.fillStyle = "#f2c27a";
  ctx.font = `600 48px ${FONTS.sans}`;
  ctx.fillText(`${viewLabel} →`, pad, h - 72, w - pad * 2);
}

export type ProjectsPart = ScenePart & {
  /** Meshes the pointer can click; each carries the project link in userData.href. */
  pickables: THREE.Object3D[];
  setHovered: (object: THREE.Object3D | null) => void;
};

/** Chapter 06: three featured projects float above the line as cards that open the project. */
export function createProjects(
  scene: THREE.Scene,
  path: JourneyPath,
  projects: JourneyProject[],
  viewLabel: string,
  isSmallScreen: boolean
): ProjectsPart {
  const group = new THREE.Group();
  const sizeScale = isSmallScreen ? 0.62 : 1;
  const spreadScale = isSmallScreen ? 0.42 : 1;
  let hovered: THREE.Object3D | null = null;

  const cards = projects.slice(0, MAX_PROJECTS).map((project, index) => {
    const slot = CARD_SLOTS[projects.length === 1 ? 1 : index];
    const texture = createCanvasTexture(CARD_CANVAS.width, CARD_CANVAS.height, (ctx) => drawCard(ctx, project, viewLabel, null));
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      const canvas = texture.image as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      drawCard(ctx, project, viewLabel, image);
      texture.needsUpdate = true;
    };
    image.onerror = () => console.warn(`[journey] Could not load the image for project "${project.slug}"`);
    image.src = optimizedImageUrl(project.image);

    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, fog: false, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(CARD_WIDTH * sizeScale, CARD_HEIGHT * sizeScale), material);
    const u = PROJECTS_U + slot.ahead;
    const offset = path.sideAt(u).multiplyScalar(slot.side * spreadScale).add(new THREE.Vector3(0, slot.lift * sizeScale, 0));
    path.placeFacingCamera(mesh, u, offset);
    mesh.rotateY(slot.turn);
    mesh.userData.href = `/portfolio/${project.slug}`;
    group.add(mesh);
    return { mesh, material, base: mesh.position.clone(), phase: index * 1.7, hover: 0 };
  });
  scene.add(group);

  const float = new THREE.Vector3();
  return {
    pickables: cards.map((card) => card.mesh),
    setHovered(object) {
      hovered = object;
    },
    update(state: FrameState) {
      const visibility = proximity(state.cameraU, PROJECTS_U, 0.12, 0.09);
      group.visible = visibility > 0.001;
      if (!group.visible) return;
      cards.forEach((card) => {
        const target = card.mesh === hovered ? 1 : 0;
        card.hover += (target - card.hover) * Math.min(1, state.delta * 10);
        const bob = state.reduceMotion ? 0 : Math.sin(state.elapsed * 1.1 + card.phase) * 0.12;
        card.mesh.position.copy(card.base).add(float.set(0, bob - (1 - visibility) * 2.5, 0));
        card.mesh.scale.setScalar(1 + card.hover * 0.06);
        card.material.opacity = visibility;
      });
    }
  };
}