import * as THREE from "three";
import { CHAPTER_STATIONS } from "@/components/home/journey/journey-config";
import { proximity, type JourneyPath } from "@/components/home/journey/scene/journey-path";
import { SCENE_COLORS, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";

const STRUCTURE_U = CHAPTER_STATIONS[1] - 0.005;
const PAGE_WIDTH = 12;
const PAGE_HEIGHT = 7.5;
const COLUMN_GAP = 0.25;

/** Layouts the blocks cycle through, as [x, y, width, height] in page units (centre origin, y up). */
const LAYOUTS: number[][][] = [
  [[0, 3.3, 12, 0.7], [-2.6, 1.3, 6.4, 2.4], [3.4, 1.1, 4.8, 3.2], [-4.2, -0.95, 3.2, 0.8], [-0.9, -0.95, 2.6, 0.8], [-4, -2.75, 3.7, 1.5], [0, -2.75, 3.7, 1.5], [4, -2.75, 3.7, 1.5]],
  [[0, 3.3, 12, 0.7], [-2.9, 1.0, 6.2, 3.2], [3.4, 1.85, 4.8, 1.5], [3.4, 0.1, 4.8, 1.5], [-4.5, -2.45, 2.7, 2.0], [-1.5, -2.45, 2.7, 2.0], [1.5, -2.45, 2.7, 2.0], [4.5, -2.45, 2.7, 2.0]],
  [[0, 3.3, 12, 0.7], [0, 2.05, 8.4, 1.0], [0, 1.05, 6, 0.45], [0, 0.15, 3, 0.8], [-4, -2.1, 3.6, 2.6], [0, -2.1, 3.6, 2.6], [4, -2.1, 3.6, 2.6], [0, -3.55, 2.2, 0.25]]
];
const BLOCK_COUNT = LAYOUTS[0].length;
/** The gold block is the call to action. */
const ACCENT_BLOCK = 3;
/** Seconds each layout holds, and how long a block takes to travel. Runs on its own clock, not on scroll. */
const LAYOUT_HOLD = 2.2;
const LAYOUT_MOVE = 1.1;
const BLOCK_STAGGER = 0.07;
const LAYOUT_STEP = LAYOUT_HOLD + LAYOUT_MOVE + BLOCK_STAGGER * BLOCK_COUNT;
const FLASH_SECONDS = 0.6;

type Slot = { x: number; y: number; width: number; height: number; rotation: number; z: number };

function scatteredLayout(): number[][] {
  return Array.from({ length: BLOCK_COUNT }, () => [
    (Math.random() - 0.5) * 13,
    (Math.random() - 0.5) * 8,
    0.8 + Math.random() * 3.2,
    0.4 + Math.random() * 1.6,
    (Math.random() - 0.5) * 1.4,
    -1 + Math.random() * 3
  ]);
}

function slotOf(layout: number[][], index: number): Slot {
  const [x, y, width, height, rotation = 0, z = 0] = layout[index];
  return { x, y, width, height, rotation, z };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Chapter 02: a 12-column grid with layout blocks that keep arranging themselves:
 * scattered pieces fly into a landing page, reflow into two other layouts, then scatter again.
 */
export function createStructure(scene: THREE.Scene, path: JourneyPath, isSmallScreen: boolean): ScenePart {
  const group = new THREE.Group();
  const page = new THREE.Group();
  const columnMaterial = new THREE.MeshBasicMaterial({ color: SCENE_COLORS.gold, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false });
  const columnWidth = (PAGE_WIDTH - 11 * COLUMN_GAP) / 12;
  const columnGeometry = new THREE.PlaneGeometry(columnWidth, PAGE_HEIGHT);
  for (let i = 0; i < 12; i += 1) {
    const column = new THREE.Mesh(columnGeometry, columnMaterial);
    column.position.set(-PAGE_WIDTH / 2 + columnWidth / 2 + i * (columnWidth + COLUMN_GAP), 0, 0);
    page.add(column);
  }

  const blockGeometry = new THREE.PlaneGeometry(1, 1);
  const edgeGeometry = new THREE.EdgesGeometry(blockGeometry);
  const blocks = Array.from({ length: BLOCK_COUNT }, (_, index) => {
    const fill = new THREE.Mesh(
      blockGeometry,
      new THREE.MeshBasicMaterial({ color: index === ACCENT_BLOCK ? SCENE_COLORS.gold : SCENE_COLORS.blue, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false })
    );
    const outline = new THREE.LineSegments(edgeGeometry, new THREE.LineBasicMaterial({ color: SCENE_COLORS.blue, transparent: true }));
    const block = new THREE.Group();
    block.add(fill, outline);
    page.add(block);
    return { block, fill, outline };
  });

  // A portrait phone sees a narrow slice, so the page sits closer to the line and smaller.
  const lateral = isSmallScreen ? -1.6 : -5.5;
  path.placeFacingCamera(page, STRUCTURE_U, path.sideAt(STRUCTURE_U).multiplyScalar(lateral).add(new THREE.Vector3(0, isSmallScreen ? 3 : 3.6, 0)));
  page.scale.setScalar(isSmallScreen ? 0.55 : 1);
  group.add(page);

  const floorGrid = new THREE.GridHelper(80, 40, 0x2a3b58, 0x1c2e4a);
  floorGrid.position.copy(path.pointAt(STRUCTURE_U)).add(new THREE.Vector3(0, -2.6, 0));
  const gridMaterial = floorGrid.material as THREE.Material;
  gridMaterial.transparent = true;
  group.add(floorGrid);
  scene.add(group);

  const layoutSequence = [scatteredLayout(), ...LAYOUTS];
  let lastCycle = -1;
  const outlineColor = new THREE.Color();

  return {
    update(state: FrameState) {
      const visibility = proximity(state.cameraU, STRUCTURE_U, 0.12, 0.1);
      group.visible = visibility > 0.001;
      if (!group.visible) return;
      columnMaterial.opacity = visibility * 0.12;
      gridMaterial.opacity = visibility * 0.6;

      // Reduced motion: hold the first finished layout.
      const time = state.reduceMotion ? LAYOUT_STEP + LAYOUT_MOVE + 1 : state.elapsed;
      const step = Math.floor(time / LAYOUT_STEP);
      const cycle = Math.floor(step / layoutSequence.length);
      if (cycle !== lastCycle) {
        lastCycle = cycle;
        layoutSequence[0] = scatteredLayout();
      }
      const fromLayout = layoutSequence[(step + layoutSequence.length - 1) % layoutSequence.length];
      const toLayout = layoutSequence[step % layoutSequence.length];
      const isScattering = step % layoutSequence.length === 0;
      const local = time - step * LAYOUT_STEP;

      blocks.forEach(({ block, fill, outline }, index) => {
        const raw = THREE.MathUtils.clamp((local - index * BLOCK_STAGGER) / LAYOUT_MOVE, 0, 1);
        const t = easeInOutCubic(raw);
        const from = slotOf(fromLayout, index);
        const to = slotOf(toLayout, index);
        // Blocks lift towards the viewer mid-flight, then settle onto the grid.
        const arc = Math.sin(t * Math.PI) * 0.8;
        block.position.set(
          THREE.MathUtils.lerp(from.x, to.x, t),
          THREE.MathUtils.lerp(from.y, to.y, t),
          THREE.MathUtils.lerp(from.z, to.z, t) + arc + 0.03
        );
        block.scale.set(THREE.MathUtils.lerp(from.width, to.width, t), THREE.MathUtils.lerp(from.height, to.height, t), 1);
        block.rotation.z = THREE.MathUtils.lerp(from.rotation, to.rotation, t);

        // A short gold flash the moment a block snaps into its slot.
        const sinceArrival = local - index * BLOCK_STAGGER - LAYOUT_MOVE;
        const flash = raw >= 1 && !state.reduceMotion && !isScattering ? Math.max(0, 1 - sinceArrival / FLASH_SECONDS) : 0;
        const lineMaterial = outline.material as THREE.LineBasicMaterial;
        outlineColor.copy(isScattering && raw > 0.5 ? SCENE_COLORS.beige : SCENE_COLORS.blue).lerp(SCENE_COLORS.goldSoft, flash);
        lineMaterial.color.copy(outlineColor);
        lineMaterial.opacity = visibility;
        (fill.material as THREE.MeshBasicMaterial).opacity = visibility * (0.08 + flash * 0.25);
      });
    }
  };
}