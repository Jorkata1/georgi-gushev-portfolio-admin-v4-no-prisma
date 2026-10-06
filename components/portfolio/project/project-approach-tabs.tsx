"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { EASE_OUT } from "./motion-presets";

export interface ApproachTab {
  key: "goals" | "process" | "outcome";
  label: string;
  items: string[];
}

function TabItem({ tabKey, item, index }: { tabKey: ApproachTab["key"]; item: string; index: number }) {
  if (tabKey === "process") {
    return (
      <>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 font-mono text-[11px] font-semibold text-accentGlow">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="pt-0.5 text-sm leading-relaxed text-slate-200">{item}</span>
      </>
    );
  }
  if (tabKey === "outcome") {
    return (
      <>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accentGlow">
          <Check size={13} aria-hidden="true" />
        </span>
        <span className="text-sm leading-relaxed text-slate-200">{item}</span>
      </>
    );
  }
  return (
    <>
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span className="text-sm leading-relaxed text-slate-200">{item}</span>
    </>
  );
}

export function ProjectApproachTabs({ tabs }: { tabs: ApproachTab[] }) {
  const baseId = useId();
  const [activeKey, setActiveKey] = useState(tabs[0]?.key);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  if (!active) return null;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const current = tabs.findIndex((tab) => tab.key === active.key);
    const next = (current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActiveKey(tabs[next].key);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        onKeyDown={handleKeyDown}
        className="inline-flex gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.key === active.key;
          return (
            <button
              key={tab.key}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`${baseId}-tab-${tab.key}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveKey(tab.key)}
              className={`relative h-10 rounded-full px-4 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                isActive ? "text-background" : "text-slate-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.key}`}
        className="mt-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={active.key}
            className="grid gap-x-8 gap-y-4 sm:grid-cols-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            {active.items.map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <TabItem tabKey={active.key} item={item} index={index} />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
