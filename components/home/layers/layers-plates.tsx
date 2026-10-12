import type { CSSProperties } from "react";
import type { LayersCopy } from "@/components/home/layers/layers-copy";

/** Inline styles with custom properties (animation delay `--gl-d`). */
function style(values: Record<string, string | number>): CSSProperties {
  return values as CSSProperties;
}

const SPEED_BARS = [96, 88, 78, 100, 92, 100] as const;
const PALETTE = ["E8A44A", "7FB6FA", "13264A", "0B1627"] as const;
const STRUCTURE_BOXES = [
  { name: "NAV", left: 24, top: 16, width: 512, height: 32 },
  { name: "H1", left: 24, top: 76, width: 270, height: 76 },
  { name: "P", left: 24, top: 164, width: 250, height: 40 },
  { name: "CTA", left: 24, top: 220, width: 128, height: 38, isCta: true },
  { name: "IMG", left: 318, top: 76, width: 218, height: 182 },
  { name: "CARD", left: 24, top: 282, width: 160, height: 48 },
  { name: "CARD", left: 200, top: 282, width: 160, height: 48 },
  { name: "CARD", left: 376, top: 282, width: 160, height: 48 },
] as const;
const CARD_LEFTS = [24, 200, 376] as const;
const CARD_TEXT_LEFTS = [38, 214, 390] as const;

function Tag({ number, label }: { number: string; label: string }) {
  return (
    <span className="gl-tag">
      <b>{number}</b>
      {label}
    </span>
  );
}

function SpeedPlate({ copy }: { copy: LayersCopy }) {
  return (
    <div className="gl-plate gl-p-speed" data-gl-layer="5">
      <Tag number="05" label={copy.plates.tags[4]} />
      {copy.plates.speedRows.map((row, index) => (
        <div key={row} className="gl-srow">
          <span>{row}</span>
          <span className="gl-bar">
            <span className="gl-a gl-a-grow" style={style({ width: `${SPEED_BARS[index]}%`, "--gl-d": `${230 + index * 110}ms` })} />
          </span>
          <span className="gl-v">{copy.plates.speedValues[index]}</span>
        </div>
      ))}
    </div>
  );
}

function CodePlate({ copy }: { copy: LayersCopy }) {
  const line = (highlighted = false) => `gl-ln${highlighted ? " gl-hl" : ""} gl-a gl-a-type`;
  const delay = (ms: number) => style({ "--gl-d": `${ms}ms` });
  return (
    <div className="gl-plate gl-p-code" data-gl-layer="4">
      <Tag number="04" label={copy.plates.tags[3]} />
      <span className={line()} style={delay(150)}>
        <span className="gl-k">export default</span> <span className="gl-k">function</span> <span className="gl-t">Hero</span>() {"{"}
      </span>
      <span className={line()} style={delay(290)}>
        {"  "}
        <span className="gl-k">return</span> (
      </span>
      <span className={line(true)} style={delay(430)}>
        {"    <"}
        <span className="gl-t">section</span> aria-labelledby=<span className="gl-s">&quot;hero-title&quot;</span>
        {">"}
      </span>
      <span className={line()} style={delay(570)}>
        {"      <"}
        <span className="gl-t">h1</span> id=<span className="gl-s">&quot;hero-title&quot;</span>
        {">"}
        {copy.plates.codeHeadline}
        {"</"}
        <span className="gl-t">h1</span>
        {">"}
      </span>
      <span className={line()} style={delay(710)}>
        {"      <"}
        <span className="gl-t">Image</span> src={"{hero}"} priority sizes=<span className="gl-s">&quot;50vw&quot;</span> {"/>"}
      </span>
      <span className={line()} style={delay(850)}>
        {"      <"}
        <span className="gl-t">Button</span> href=<span className="gl-s">&quot;/contact&quot;</span>
        {">"}
        {copy.plates.codeButton}
        {"</"}
        <span className="gl-t">Button</span>
        {">"}
      </span>
      <span className={line()} style={delay(990)}>
        {"    </"}
        <span className="gl-t">section</span>
        {">"}
      </span>
      <span className={line()} style={delay(1130)}>
        {"  );"}
      </span>
      <span className={line()} style={delay(1270)}>
        {"}"}
      </span>
      <span className={line()} style={delay(1410)}>
        <span className="gl-c">{"// next build ✓ compiled · 0 errors"}</span>
        <i className="gl-caret" />
      </span>
    </div>
  );
}

function StructurePlate({ copy }: { copy: LayersCopy }) {
  return (
    <div className="gl-plate gl-p-structure" data-gl-layer="3">
      <Tag number="03" label={copy.plates.tags[2]} />
      <div className="gl-cols gl-a gl-a-fade" style={style({ "--gl-d": "0ms" })}>
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      {STRUCTURE_BOXES.map((box, index) => (
        <div
          key={`${box.name}-${index}`}
          className={`gl-box${"isCta" in box ? " gl-box-cta" : ""} gl-a gl-a-draw`}
          data-name={box.name}
          style={style({ left: box.left, top: box.top, width: box.width, height: box.height, "--gl-d": `${210 + index * 110}ms` })}
        />
      ))}
    </div>
  );
}

function VisualPlate({ copy }: { copy: LayersCopy }) {
  const fill = (values: Record<string, string | number>, delay: number) => style({ ...values, "--gl-d": `${delay}ms` });
  return (
    <div className="gl-plate gl-glass gl-p-visual" data-gl-layer="2">
      <Tag number="02" label={copy.plates.tags[1]} />
      <div className="gl-palette gl-a gl-a-fade" style={style({ "--gl-d": "120ms" })}>
        {PALETTE.map((hex) => (
          <span key={hex}>
            <i style={{ background: `#${hex}` }} />
            {hex}
          </span>
        ))}
      </div>
      <div className="gl-fill gl-a gl-a-pop" style={fill({ left: 24, top: 220, width: 128, height: 38, borderRadius: 999, background: "var(--gl-gold)" }, 240)} />
      <div className="gl-fill gl-a gl-a-pop" style={fill({ left: 318, top: 76, width: 218, height: 182, background: "#13264a", overflow: "hidden" }, 360)}>
        <div className="gl-orb gl-orb-a" />
        <div className="gl-orb gl-orb-b" />
      </div>
      {CARD_LEFTS.map((left, index) => (
        <div key={left} className="gl-fill gl-a gl-a-pop" style={fill({ left, top: 282, width: 160, height: 48, background: "#13213a" }, 480 + index * 120)} />
      ))}
      <div className="gl-fill gl-a gl-a-pop" style={fill({ left: 24, top: 22, width: 20, height: 20, borderRadius: 6, background: "var(--gl-gold)" }, 840)} />
      <div className="gl-fill gl-a gl-a-pop" style={fill({ left: 452, top: 20, width: 84, height: 24, borderRadius: 999, background: "var(--gl-gold)" }, 960)} />
    </div>
  );
}

function TextPlate({ copy }: { copy: LayersCopy }) {
  const text = (values: Record<string, string | number>, delay: number) => style({ ...values, "--gl-d": `${delay}ms` });
  const body = "var(--gl-font-body)";
  return (
    <div className="gl-plate gl-glass gl-p-type" data-gl-layer="1">
      <Tag number="01" label={copy.plates.tags[0]} />
      <div className="gl-spec gl-a gl-a-fade" style={text({ left: 24, top: 58 }, 600)}>
        H1 · 34/38
      </div>
      <div className="gl-spec gl-a gl-a-fade" style={text({ left: 24, top: 205 }, 800)}>
        {copy.plates.textSpec}
      </div>
      <div className="gl-tx gl-a gl-a-type" style={text({ left: 52, top: 23, font: `600 13px/18px ${body}` }, 250)}>
        {copy.plates.brand}
      </div>
      <div className="gl-tx gl-a gl-a-type" style={text({ left: 250, top: 24, font: `500 11px/16px ${body}`, color: "var(--gl-muted)", wordSpacing: 14 }, 400)}>
        {copy.plates.nav}
      </div>
      <div className="gl-tx gl-a gl-a-type" style={text({ left: 466, top: 24, font: `700 11px/16px ${body}`, color: "var(--gl-ink)" }, 550)}>
        {copy.plates.navCta}
      </div>
      <div className="gl-tx gl-a gl-a-type" style={text({ left: 24, top: 76, width: 280, font: "600 34px/38px var(--gl-font-display)" }, 700)}>
        {copy.plates.headlinePlain}
        <span style={{ color: "var(--gl-gold)", fontStyle: "italic" }}>{copy.plates.headlineAccent}</span>
        <i className="gl-caret" />
      </div>
      <div className="gl-tx gl-a gl-a-type" style={text({ left: 24, top: 166, width: 250, font: `400 12px/18px ${body}`, color: "var(--gl-muted)" }, 850)}>
        {copy.plates.body}
      </div>
      <div className="gl-tx gl-a gl-a-type" style={text({ left: 44, top: 231, font: `700 13px/16px ${body}`, color: "var(--gl-ink)" }, 1000)}>
        {copy.plates.cta}
      </div>
      {copy.plates.cards.map((card, index) => (
        <div key={card} className="gl-tx gl-a gl-a-type" style={text({ left: CARD_TEXT_LEFTS[index], top: 298, font: `600 12px/16px ${body}` }, 1150 + index * 150)}>
          {card}
        </div>
      ))}
    </div>
  );
}

/** The five layers of a website, bottom → top, plus the data beams between them. */
export function LayersPlates({ copy }: { copy: LayersCopy }) {
  return (
    <div className="gl-stack" data-gl-stack="">
      <SpeedPlate copy={copy} />
      <CodePlate copy={copy} />
      <StructurePlate copy={copy} />
      <VisualPlate copy={copy} />
      <TextPlate copy={copy} />
      <span className="gl-beam" style={{ left: 0, top: 0 }} />
      <span className="gl-beam" style={{ left: 560, top: 0 }} />
      <span className="gl-beam" style={{ left: 0, top: 350 }} />
      <span className="gl-beam" style={{ left: 560, top: 350 }} />
    </div>
  );
}

/** Where each layer is called out on the assembled site (plate units) and on which side its label sits. */
const CALLOUTS = [
  { side: "left", x: 16, y: 114 },
  { side: "top", x: 430, y: 76 },
  { side: "left", x: 16, y: 239 },
  { side: "bottom", x: 280, y: 330 },
  { side: "bottom", x: 456, y: 330 },
] as const;

/** Finale: labels with leader lines from each of the five layers to the part of the finished site it shapes. */
export function LayersCallouts({ copy }: { copy: LayersCopy }) {
  return (
    <div className="gl-callouts" data-gl-callouts="" aria-hidden="true">
      <svg className="gl-co-lines" data-gl-callout-lines="" />
      {copy.steps.map((step, index) => (
        <span key={step.number} className="gl-co" data-side={CALLOUTS[index].side} data-x={CALLOUTS[index].x} data-y={CALLOUTS[index].y}>
          <b>{step.number}</b>
          {step.label}
        </span>
      ))}
    </div>
  );
}

/** Five outlined layers that assemble into the hero on the first visit of a session. */
export function LayersIntro() {
  return (
    <>
      <div className="gl-intro" data-gl-intro="" hidden>
        {[5, 4, 3, 2].map((layer) => (
          <div key={layer} className="gl-iplate" data-intro-layer={layer}>
            <b>0{layer}</b>
          </div>
        ))}
        <div className="gl-iplate is-first" data-intro-layer="1">
          <b>01</b>
          <span className="gl-fill" data-intro-fill="" />
          <svg viewBox="0 0 562 352" preserveAspectRatio="none" aria-hidden="true">
            <rect x="1" y="1" width="560" height="350" rx="14" pathLength={1} strokeDasharray="0 1" />
          </svg>
          <span className="gl-isweep" data-intro-sweep="" />
        </div>
      </div>
      <p className="gl-intro-label" data-gl-intro-label="">
        <span>GDX STUDIO</span>
        <i />
      </p>
    </>
  );
}