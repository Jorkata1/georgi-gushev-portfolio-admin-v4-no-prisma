"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { getLayersCopy, type LayersCopy } from "@/components/home/layers/layers-copy";
import { createLayersEngine } from "@/components/home/layers/layers-engine";
import { layersMonoFont } from "@/components/home/layers/layers-font";
import { LayersCallouts, LayersIntro, LayersPlates } from "@/components/home/layers/layers-plates";
import { LayersSteps } from "@/components/home/layers/layers-steps";
import { HOME_CHROME_RULES, useHomeChrome } from "@/components/home/layers/use-home-chrome";
import type { Project } from "@/types";
import "@/components/home/layers/layers.css";

/* Without JavaScript the story cannot run: show the hero as a static page and keep the menu reachable. */
const NO_SCRIPT_STYLES =
  "<style>.gl-stage.is-intro .gl-copy, .gl-stage.is-intro .gl-rail, .gl-stage.is-intro-stack .gl-stack { opacity: 1; }" +
  " body header { transform: none !important; visibility: visible !important; }</style>";

type LayersStoryProps = {
  copy: LayersCopy;
  projects: Project[];
  onChromeChange: (isVisible: boolean) => void;
};

/**
 * The story markup. Memoised: after mount the engine owns the classes and states it toggles,
 * so this must not re-render while the engine runs (a language change remounts it instead).
 */
const LayersStory = memo(function LayersStory({ copy, projects, onChromeChange }: LayersStoryProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    try {
      return createLayersEngine({
        root,
        glyphs: copy.glyphs,
        decimalSeparator: copy.decimalSeparator,
        onChromeChange,
      });
    } catch (error) {
      console.error("[home-layers] The story could not start; showing it without motion.", error);
      root.querySelector("[data-gl-stage]")?.classList.remove("is-intro", "is-intro-stack");
      onChromeChange(true);
      return undefined;
    }
  }, [copy, onChromeChange]);

  return (
    <div ref={rootRef} className={`gl-root ${layersMonoFont.variable}`}>
      <noscript dangerouslySetInnerHTML={{ __html: NO_SCRIPT_STYLES }} />
      <section className="gl-track" data-gl-track="" aria-label={copy.ariaLabel}>
        <div className="gl-stage is-intro is-intro-stack" data-gl-stage="">
          <div className="gl-spot" data-gl-spot="" aria-hidden="true" />
          <LayersSteps copy={copy} projects={projects} />
          <div className="gl-scene" aria-hidden="true">
            <LayersPlates copy={copy} />
            <LayersCallouts copy={copy} />
            <LayersIntro />
          </div>
          <nav className="gl-rail" data-gl-rail="" aria-label={copy.railLabel}>
            {copy.steps.map((step) => (
              <button key={step.number} type="button" aria-label={`${step.number} ${step.label}`} />
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
});

/**
 * Homepage story: a website split into its five layers (words, visual, layout, foundation, speed),
 * one scroll step at a time, with an assembling intro on the first visit of a session.
 */
export function HomeLayers({ featuredProjects }: { featuredProjects: Project[] }) {
  const { locale } = useLanguage();
  const copy = getLayersCopy(locale);
  const [isChromeVisible, setIsChromeVisible] = useState(false);
  useHomeChrome(isChromeVisible);
  return (
    <>
      {/* In the server HTML, so the menu is already hidden on the first paint. */}
      <style dangerouslySetInnerHTML={{ __html: HOME_CHROME_RULES }} />
      <LayersStory key={locale === "en" ? "en" : "bg"} copy={copy} projects={featuredProjects} onChromeChange={setIsChromeVisible} />
    </>
  );
}