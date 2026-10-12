import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { LayersCopy, LayersHeading, LayersStepCopy } from "@/components/home/layers/layers-copy";

const CONTACT_HREF = "/contact";
const SITE_CHECK_HREF = "https://check.gdxstudio.com";

/** Splits a heading into words so they can rise in one after another; the accent part is italic gold. */
function HeadingWords({ heading }: { heading: LayersHeading }) {
  let wordIndex = 0;
  const renderWords = (text: string) =>
    text.split(/(\s+)/).map((part, partIndex) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return part;
      const style = { "--gl-i": wordIndex++ } as CSSProperties;
      return (
        <span key={`${part}-${partIndex}`} className="gl-w" style={style}>
          {part}
        </span>
      );
    });
  return (
    <>
      {renderWords(heading.plain)}
      <em>{renderWords(heading.accent)}</em>
    </>
  );
}

function Eyebrow({ lead, label }: { lead: string; label: string }) {
  return (
    <p className="gl-eyebrow">
      <b>{lead}</b>
      <i aria-hidden="true" />
      <span className="gl-dec" data-gl-decode={label}>
        {label}
      </span>
    </p>
  );
}

function Step({ index, initialState, children }: { index: number; initialState: "on" | "before"; children: ReactNode }) {
  return (
    <article className="gl-step" data-gl-step={index} data-state={initialState}>
      {children}
    </article>
  );
}

function LayerStep({ index, step }: { index: number; step: LayersStepCopy }) {
  return (
    <Step index={index} initialState="before">
      <Eyebrow lead={step.number} label={step.label} />
      <h2>
        <HeadingWords heading={step.heading} />
      </h2>
      <p className="gl-lead">{step.lead}</p>
      {step.proof ? (
        <ul className="gl-proof">
          {step.proof.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      ) : null}
    </Step>
  );
}

/** The copy column: the hero, five layer steps and the finale, stacked in one grid cell. */
export function LayersSteps({ copy }: { copy: LayersCopy }) {
  const [words, visual, layout, foundation, speed] = copy.steps;
  return (
    <div className="gl-copy">
      <Step index={0} initialState="on">
        <Eyebrow lead={copy.intro.eyebrowBrand} label={copy.intro.eyebrow} />
        <h1>
          <HeadingWords heading={copy.intro.heading} />
        </h1>
        <p className="gl-lead">{copy.intro.lead}</p>
        <p className="gl-hint" aria-hidden="true">
          {copy.intro.hint}
        </p>
      </Step>
      <LayerStep index={1} step={words} />
      <LayerStep index={2} step={visual} />
      <LayerStep index={3} step={layout} />
      <LayerStep index={4} step={foundation} />
      <Step index={5} initialState="before">
        <Eyebrow lead={speed.number} label={speed.label} />
        <h2>
          <HeadingWords heading={speed.heading} />
        </h2>
        <p className="gl-lead">{speed.lead}</p>
        <dl className="gl-metrics">
          {copy.metrics.map((metric) => (
            <div key={metric.label} className="gl-metric">
              <dt>{metric.label}</dt>
              <dd>
                <span data-gl-count={metric.count}>{metric.start}</span>
                <small>{metric.unit}</small>
              </dd>
              <p className="gl-was">
                {copy.wasLabel} <s>{metric.was}</s>
              </p>
            </div>
          ))}
        </dl>
        <p className="gl-note">{copy.metricsNote}</p>
      </Step>
      <Step index={6} initialState="before">
        <Eyebrow lead={copy.finale.eyebrowBrand} label={copy.finale.eyebrow} />
        <h2>
          <HeadingWords heading={copy.finale.heading} />
        </h2>
        <p className="gl-lead">{copy.finale.lead}</p>
        <div className="gl-cta">
          <Link className="gl-btn gl-btn-primary" href={CONTACT_HREF} tabIndex={-1}>
            {copy.finale.primary}
          </Link>
          <a className="gl-btn gl-btn-ghost" href={SITE_CHECK_HREF} tabIndex={-1}>
            {copy.finale.secondary}
          </a>
        </div>
      </Step>
    </div>
  );
}