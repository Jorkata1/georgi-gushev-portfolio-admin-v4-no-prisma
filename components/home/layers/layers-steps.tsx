import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { LayersCopy, LayersHeading, LayersStepCopy } from "@/components/home/layers/layers-copy";
import type { Project } from "@/types";

const CONTACT_HREF = "/contact";
const SITE_CHECK_HREF = "https://check.gdxstudio.com";
const CONTACT_EMAIL = "business@gdxstudio.com";
/** How many recent projects the finale shows. */
export const FINALE_PROJECT_COUNT = 3;

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

/** Small project cards under the finale buttons: proof that the five layers turn into real sites. */
function RecentProjects({ label, projects }: { label: string; projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <div className="gl-recent">
      <p className="gl-recent-label">{label}</p>
      <div className="gl-recent-row">
        {projects.map((project) => (
          <Link key={project.id} className="gl-recent-card" href={`/portfolio/${project.slug}`} tabIndex={-1}>
            <span className="gl-recent-img">
              <Image src={project.heroImage} alt="" fill sizes="(max-width: 820px) 30vw, 160px" className="gl-recent-pic" />
            </span>
            <span className="gl-recent-name">{project.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** The copy column: the hero, five layer steps and the finale, stacked in one grid cell. */
export function LayersSteps({ copy, projects }: { copy: LayersCopy; projects: Project[] }) {
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
        <RecentProjects label={copy.finale.recentLabel} projects={projects.slice(0, FINALE_PROJECT_COUNT)} />
        <p className="gl-trust">
          <i aria-hidden="true" />
          {copy.finale.reply} ·{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} tabIndex={-1}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </Step>
    </div>
  );
}