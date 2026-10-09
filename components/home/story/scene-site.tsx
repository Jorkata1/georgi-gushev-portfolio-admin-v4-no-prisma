"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { StoryStageCopy } from "@/components/home/story/story-copy";
import { TIMELINE, useFadeWindow } from "@/components/home/story/story-timeline";
import { FadeText, MorphShape, hidden, shape, type ShapeKeyframes, type ShapeState } from "@/components/home/story/morph-primitives";

/** Browser viewport size in design pixels. */
const VIEW_WIDTH = 720;
const VIEW_HEIGHT = 476;

/** Morph checkpoints in scene progress: old site → wireframe → finished site. */
const { oldEnd: OLD_END, wireframeReady: WIRE, wireframeEnd: WIRE_END, siteReady: BUILT } = TIMELINE.morph;
const MORPH_STAGGER = 0.006;
const TEXT_FADE = 0.04;

const ACCENT = "#E8A44A";
const INK = "#060E1A";
const WIRE_LINE = "#3A4F70";
const WIRE_BLOCK = "#2A3B58";
const WIRE_SOFT = "#1C2E4A";
const SURFACE = "#0B1627";
const SERIF_STACK = "Georgia, Cambria, 'Times New Roman', serif";
const MONO_STACK = "ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, monospace";

/** The same element as an old-site piece, a wireframe block and a finished part, in that order. */
function morph(oldState: ShapeState, wireState: ShapeState, builtState: ShapeState, order = 0): ShapeKeyframes {
  const shift = order * MORPH_STAGGER;
  return [
    [OLD_END + shift, oldState],
    [WIRE + shift, wireState],
    [WIRE_END + shift, wireState],
    [BUILT + shift, builtState]
  ];
}

/** An element the old site did not have: it fades in as part of the wireframe. */
function appear(wireState: ShapeState, builtState: ShapeState, order = 0): ShapeKeyframes {
  const shift = order * MORPH_STAGGER;
  return [
    [WIRE - 0.05 + shift, hidden(wireState)],
    [WIRE + shift, wireState],
    [WIRE_END + shift, wireState],
    [BUILT + shift, builtState]
  ];
}

function splitInTwoLines(text: string): [string, string] {
  const words = text.split(" ");
  const middle = Math.ceil(words.length / 2);
  return [words.slice(0, middle).join(" "), words.slice(middle).join(" ")];
}

const NAV_COUNT = 3;
const CARD_COUNT = 3;

const BACKGROUND: ShapeKeyframes = morph(
  shape(0, 0, VIEW_WIDTH, VIEW_HEIGHT, { fill: "#D9D4C7" }),
  shape(0, 0, VIEW_WIDTH, VIEW_HEIGHT, { fill: "#08121F" }),
  shape(0, 0, VIEW_WIDTH, VIEW_HEIGHT, { fill: INK })
);

const LOGO = morph(
  shape(28, 22, 96, 28, { fill: "#9A8F78" }),
  shape(28, 22, 104, 26, { rx: 6, stroke: WIRE_LINE }),
  shape(28, 22, 128, 26, { rx: 6, stroke: "rgba(58, 79, 112, 0)" })
);

const navShape = (index: number) =>
  morph(
    shape(548 + index * 56, 31, 48, 10, { fill: "#B5AC98" }),
    shape(468 + index * 64, 31, 52, 10, { rx: 4, fill: WIRE_BLOCK }),
    shape(468 + index * 64, 31, 52, 10, { rx: 4, fill: "rgba(42, 59, 88, 0)" }),
    1 + index
  );

/** The jumping banner of the old site becomes the image area. */
const BANNER = morph(
  shape(58, 80, 560, 144, { fill: "#A69C86", stroke: "#F87171" }),
  shape(452, 96, 240, 196, { rx: 12, fill: "rgba(8, 18, 31, 0)", stroke: WIRE_LINE }),
  shape(452, 84, 240, 190, { rx: 14, fill: "#0E1B30", stroke: "rgba(58, 79, 112, 0)" }),
  2
);

/** The old site's grey text lines become the headline and description. */
const TEXT_LINES: ShapeKeyframes[] = [
  morph(
    shape(28, 262, 380, 8, { fill: "#C3BAA6" }),
    shape(28, 112, 380, 24, { rx: 4, fill: WIRE_BLOCK }),
    shape(28, 104, 390, 30, { rx: 4, fill: "rgba(42, 59, 88, 0)" }),
    3
  ),
  morph(
    shape(28, 278, 336, 8, { fill: "#C3BAA6" }),
    shape(28, 144, 280, 24, { rx: 4, fill: WIRE_BLOCK }),
    shape(28, 138, 300, 30, { rx: 4, fill: "rgba(42, 59, 88, 0)" }),
    4
  ),
  morph(
    shape(28, 294, 266, 8, { fill: "#C3BAA6" }),
    shape(28, 186, 340, 8, { rx: 4, fill: WIRE_SOFT }),
    shape(28, 186, 360, 10, { rx: 4, fill: "rgba(28, 46, 74, 0)" }),
    5
  )
];

const SECOND_DESCRIPTION_LINE = appear(
  shape(28, 202, 260, 8, { rx: 4, fill: WIRE_SOFT }),
  shape(28, 202, 260, 8, { rx: 4, fill: "rgba(28, 46, 74, 0)" }),
  5
);

/** The cookie banner slides in on the old site, then becomes the inquiry form. */
const COOKIE_BAR_STATE = shape(0, 420, VIEW_WIDTH, 56, { fill: "#3B3B3B" });
const FORM_BOX: ShapeKeyframes = [
  [TIMELINE.cookieBarIn[0], { ...COOKIE_BAR_STATE, y: VIEW_HEIGHT }],
  [TIMELINE.cookieBarIn[1], COOKIE_BAR_STATE],
  ...morph(
    COOKIE_BAR_STATE,
    shape(28, 312, 664, 74, { rx: 12, stroke: WIRE_BLOCK }),
    shape(28, 306, 664, 80, { rx: 14, fill: SURFACE, stroke: WIRE_SOFT }),
    6
  )
];

const COOKIE_TEXT_STATE = shape(22, 444, 560, 8, { fill: "#6B6B6B" });
const FORM_TITLE: ShapeKeyframes = [
  [TIMELINE.cookieBarIn[0], { ...COOKIE_TEXT_STATE, y: VIEW_HEIGHT + 24 }],
  [TIMELINE.cookieBarIn[1], COOKIE_TEXT_STATE],
  ...morph(
    COOKIE_TEXT_STATE,
    shape(44, 326, 150, 10, { rx: 4, fill: WIRE_BLOCK }),
    shape(44, 322, 170, 14, { rx: 4, fill: "rgba(42, 59, 88, 0)" }),
    7
  )
];

/** The cookie "accept" button travels up and turns into the main call to action. */
const COOKIE_BUTTON_STATE = shape(604, 434, 92, 28, { fill: "#8A8A8A" });
const ACCENT_BUTTON = shape(28, 230, 128, 38, { rx: 9, fill: ACCENT, stroke: ACCENT });
const PRIMARY_BUTTON: ShapeKeyframes = [
  [TIMELINE.cookieBarIn[0], { ...COOKIE_BUTTON_STATE, y: VIEW_HEIGHT + 14 }],
  [TIMELINE.cookieBarIn[1], COOKIE_BUTTON_STATE],
  [OLD_END + 0.02, COOKIE_BUTTON_STATE],
  [WIRE, shape(28, 230, 128, 38, { rx: 9, stroke: WIRE_LINE })],
  [TIMELINE.accentFill[0], shape(28, 230, 128, 38, { rx: 9, stroke: WIRE_LINE })],
  [TIMELINE.accentFill[1], ACCENT_BUTTON]
];

const SECONDARY_BUTTON = appear(
  shape(166, 230, 132, 38, { rx: 9, stroke: WIRE_LINE }),
  shape(166, 230, 132, 38, { rx: 9, stroke: WIRE_BLOCK }),
  6
);

const formInput = (x: number, width: number, order: number, isButton = false) =>
  appear(
    shape(x, 344, width, 28, { rx: 7, stroke: WIRE_BLOCK }),
    shape(x, 344, width, 28, { rx: 7, fill: isButton ? WIRE_BLOCK : INK, stroke: WIRE_BLOCK }),
    order
  );

const cardShape = (index: number) =>
  appear(
    shape(28 + index * 226, 404, 212, 52, { rx: 10, stroke: WIRE_BLOCK }),
    shape(28 + index * 226, 402, 212, 56, { rx: 12, fill: SURFACE, stroke: WIRE_SOFT }),
    8 + index
  );

function GridColumns({ progress }: { progress: MotionValue<number> }) {
  const opacity = useFadeWindow(progress, TIMELINE.wireframe);
  const height = useTransform(progress, TIMELINE.gridColumns, [0, VIEW_HEIGHT]);
  const columnWidth = (VIEW_WIDTH - 56 - 11 * 12) / 12;

  return (
    <motion.g opacity={opacity}>
      {Array.from({ length: 12 }, (_, index) => (
        <motion.rect key={index} x={28 + index * (columnWidth + 12)} y={0} width={columnWidth} height={height} fill="rgba(232, 164, 74, 0.07)" />
      ))}
    </motion.g>
  );
}

type SceneSiteProps = {
  progress: MotionValue<number>;
  copy: StoryStageCopy;
};

/** One website that morphs: slow old site (01) → structure (02) → finished, fast site (03–05). */
export function SceneSite({ progress, copy }: SceneSiteProps) {
  const bannerJump = useTransform(progress, TIMELINE.bannerJump, [0, 40, -8, 26, 6, 0]);
  const heroImageOpacity = useTransform(progress, [BUILT - 0.02, BUILT + 0.03], [0, 1]);
  const [titleLineOne, titleLineTwo] = splitInTwoLines(copy.heroTitle);
  const builtText = (order: number) => [BUILT - TEXT_FADE + order * MORPH_STAGGER, BUILT + order * MORPH_STAGGER];
  const wireLabel = [WIRE - 0.03, WIRE, WIRE_END, WIRE_END + 0.03];

  return (
    <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="story-hero-glow-blue" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="rgba(127, 182, 250, 0.45)" />
          <stop offset="100%" stopColor="rgba(127, 182, 250, 0)" />
        </radialGradient>
        <radialGradient id="story-hero-glow-gold" cx="80%" cy="80%" r="55%">
          <stop offset="0%" stopColor="rgba(232, 164, 74, 0.4)" />
          <stop offset="100%" stopColor="rgba(232, 164, 74, 0)" />
        </radialGradient>
      </defs>

      <MorphShape progress={progress} keyframes={BACKGROUND} strokeWidth={0} />
      <GridColumns progress={progress} />

      <MorphShape progress={progress} keyframes={LOGO} />
      {Array.from({ length: NAV_COUNT }, (_, index) => (
        <MorphShape key={index} progress={progress} keyframes={navShape(index)} />
      ))}

      <motion.g style={{ y: bannerJump }}>
        <MorphShape progress={progress} keyframes={BANNER} strokeWidth={2} />
      </motion.g>
      <motion.g opacity={heroImageOpacity}>
        <rect x={452} y={84} width={240} height={190} rx={14} fill="url(#story-hero-glow-blue)" />
        <rect x={452} y={84} width={240} height={190} rx={14} fill="url(#story-hero-glow-gold)" />
      </motion.g>

      {TEXT_LINES.map((keyframes, index) => (
        <MorphShape key={index} progress={progress} keyframes={keyframes} strokeWidth={0} />
      ))}
      <MorphShape progress={progress} keyframes={SECOND_DESCRIPTION_LINE} strokeWidth={0} />

      <MorphShape progress={progress} keyframes={FORM_BOX} />
      <MorphShape progress={progress} keyframes={FORM_TITLE} strokeWidth={0} />
      <MorphShape progress={progress} keyframes={formInput(44, 290, 7)} />
      <MorphShape progress={progress} keyframes={formInput(346, 230, 8)} />
      <MorphShape progress={progress} keyframes={formInput(588, 88, 9, true)} />

      <MorphShape progress={progress} keyframes={PRIMARY_BUTTON} />
      <MorphShape progress={progress} keyframes={SECONDARY_BUTTON} />

      {Array.from({ length: CARD_COUNT }, (_, index) => (
        <MorphShape key={index} progress={progress} keyframes={cardShape(index)} />
      ))}

      <FadeText progress={progress} window={wireLabel} x={28} y={100} fontSize={11} fill="#7FB6FA" fontFamily={MONO_STACK}>
        {copy.messageLabel}
      </FadeText>
      <FadeText progress={progress} window={wireLabel} x={44} y={398} fontSize={11} fill="#7FB6FA" fontFamily={MONO_STACK}>
        {copy.proofLabel}
      </FadeText>
      <FadeText progress={progress} window={[WIRE - 0.03, WIRE, TIMELINE.accentFill[0], TIMELINE.accentFill[1]]} x={92} y={253} fontSize={11} fill="#EEF2F8" fontFamily={MONO_STACK} textAnchor="middle">
        {copy.actionLabel}
      </FadeText>

      <FadeText progress={progress} window={builtText(0)} x={28} y={41} fontSize={16} fontWeight={700} fill="#FFFFFF" fontFamily={SERIF_STACK}>
        {copy.brand}
      </FadeText>
      {copy.nav.map((item, index) => (
        <FadeText key={item} progress={progress} window={builtText(1 + index)} x={468 + index * 64} y={41} fontSize={12} fill="#A9B6C9">
          {item}
        </FadeText>
      ))}
      <FadeText progress={progress} window={builtText(3)} x={28} y={128} fontSize={30} fontWeight={700} fill="#FFFFFF" fontFamily={SERIF_STACK}>
        {titleLineOne}
      </FadeText>
      <FadeText progress={progress} window={builtText(4)} x={28} y={162} fontSize={30} fontWeight={700} fill="#FFFFFF" fontFamily={SERIF_STACK}>
        {titleLineTwo}
      </FadeText>
      <FadeText progress={progress} window={builtText(5)} x={28} y={204} fontSize={13} fill="#A9B6C9">
        {copy.heroText}
      </FadeText>
      <FadeText progress={progress} window={[TIMELINE.accentFill[0], TIMELINE.accentFill[1]]} x={92} y={254} fontSize={12} fontWeight={700} fill={INK} textAnchor="middle">
        {copy.primaryAction}
      </FadeText>
      <FadeText progress={progress} window={builtText(6)} x={232} y={254} fontSize={12} fontWeight={600} fill="#FFFFFF" textAnchor="middle">
        {copy.secondaryAction}
      </FadeText>
      <FadeText progress={progress} window={builtText(7)} x={44} y={334} fontSize={14} fontWeight={700} fill="#FFFFFF">
        {copy.formTitle}
      </FadeText>
    </svg>
  );
}