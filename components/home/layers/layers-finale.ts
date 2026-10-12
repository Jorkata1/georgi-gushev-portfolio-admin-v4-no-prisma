/** Plate size in stack units (px at scale 1). */
const PLATE_WIDTH = 560;
const PLATE_HEIGHT = 350;
/** Gap between a label and the edge of the site it points at. */
const LABEL_GAP = 28;
/** Below this scene width the labels give way to numbered dots on the site. */
const WIDE_MIN_WIDTH = 640;
const MAX_FINALE_FIT = 1.45;
const MIN_FINALE_FIT = 0.2;
const STAGGER_MS = 80;
/** On phones the site menu slides in on the finale; keep the assembled site clear of it. */
const HEADER_RESERVE = 76;

export type FinalePose = { fit: number; x: number; y: number };

type LabelSide = "left" | "top" | "bottom";

function svgLine(x1: number, y1: number, x2: number, y2: number, delayMs: number): string {
  return `<line pathLength="1" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="transition-delay:${delayMs}ms"/>`;
}

function svgDot(x: number, y: number, radius: number, delayMs: number): string {
  return `<circle cx="${x}" cy="${y}" r="${radius}" style="transition-delay:${delayMs}ms"/>`;
}

function svgNumber(x: number, y: number, label: number, delayMs: number): string {
  return `<text class="gl-co-num" x="${x}" y="${y + 3}" text-anchor="middle" style="transition-delay:${delayMs}ms">${label}</text>`;
}

/**
 * Lays out the finale: how large the assembled site grows and where it moves (so the five layer
 * labels fit beside it), plus the label positions and leader lines. Pure measurement and markup;
 * the engine applies the returned pose while it renders.
 */
export function layoutFinale(scene: HTMLElement, callouts: HTMLElement, finaleCopy: HTMLElement | undefined): FinalePose {
  const lines = callouts.querySelector<SVGSVGElement>("[data-gl-callout-lines]");
  const labels = Array.from(callouts.querySelectorAll<HTMLElement>(".gl-co"));
  const width = scene.clientWidth;
  const height = scene.clientHeight;
  const isWide = width >= WIDE_MIN_WIDTH;
  callouts.classList.toggle("is-compact", !isWide);

  const leftLabels = labels.filter((label) => label.dataset.side === "left");
  const labelWidth = isWide ? Math.max(0, ...leftLabels.map((label) => label.offsetWidth)) : 0;
  const labelHeight = isWide && labels[0] ? labels[0].offsetHeight : 0;

  /* On phones the finale copy can reach up into the scene: the site then sits in the space above it. */
  const sceneBox = scene.getBoundingClientRect();
  const copyBox = finaleCopy?.getBoundingClientRect();
  const isStacked =
    !!copyBox && copyBox.top < sceneBox.bottom - 1 && copyBox.left < sceneBox.right - 1 && copyBox.right > sceneBox.left + 1;
  const freeHeight = copyBox ? Math.min(height, copyBox.top - sceneBox.top - 24) : height;

  const roomWidth = isWide ? width - labelWidth - LABEL_GAP - 8 : width - 24;
  const roomHeight = isWide ? height * 0.86 - 2 * (labelHeight + LABEL_GAP) : isStacked ? freeHeight - HEADER_RESERVE - 8 : height * 0.82;
  const fit = Math.max(MIN_FINALE_FIT, Math.min(roomWidth / PLATE_WIDTH, roomHeight / PLATE_HEIGHT, MAX_FINALE_FIT));
  const siteWidth = PLATE_WIDTH * fit;
  const siteHeight = PLATE_HEIGHT * fit;
  const centreX = isWide ? width - 8 - siteWidth / 2 : width / 2;
  const centreY = isStacked
    ? HEADER_RESERVE + Math.max(0, (freeHeight - HEADER_RESERVE - siteHeight) / 2) + siteHeight / 2
    : height / 2;
  const left = centreX - siteWidth / 2;
  const top = centreY - siteHeight / 2;
  const bottom = centreY + siteHeight / 2;

  let markup = "";
  labels.forEach((label, index) => {
    const pointX = left + Number(label.dataset.x) * fit;
    const pointY = top + Number(label.dataset.y) * fit;
    const delay = index * STAGGER_MS;
    if (!isWide) {
      markup += svgDot(pointX, pointY, 9, delay) + svgNumber(pointX, pointY, index + 1, delay);
      return;
    }
    const side = (label.dataset.side ?? "left") as LabelSide;
    let labelX = pointX - label.offsetWidth / 2;
    let labelY = bottom + LABEL_GAP;
    let lineX = pointX;
    let lineY = bottom + LABEL_GAP - 4;
    if (side === "left") {
      labelX = left - LABEL_GAP - label.offsetWidth;
      labelY = pointY - labelHeight / 2;
      lineX = left - LABEL_GAP + 4;
      lineY = pointY;
    } else if (side === "top") {
      labelY = top - LABEL_GAP - labelHeight;
      lineY = top - LABEL_GAP + 4;
    }
    label.style.setProperty("--gl-co-x", `${labelX.toFixed(1)}px`);
    label.style.setProperty("--gl-co-y", `${labelY.toFixed(1)}px`);
    label.style.transitionDelay = `${delay}ms`;
    markup += svgLine(lineX, lineY, pointX, pointY, 150 + delay) + svgDot(pointX, pointY, 3.5, 450 + delay);
  });
  if (lines) lines.innerHTML = markup;

  return { fit, x: centreX - width / 2, y: centreY - height / 2 };
}