"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { SPRING } from "./motion-presets";
import { useProjectCopy } from "./use-project-copy";

interface LivePreviewDialogProps {
  url: string;
  title: string;
  isOpen: boolean;
  openTabLabel: string;
  onClose: () => void;
}

export function LivePreviewDialog({ url, title, isOpen, openTabLabel, onClose }: LivePreviewDialogProps) {
  const copy = useProjectCopy();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      returnFocus?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${copy.livePreview} — ${title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="surface flex h-full max-h-[860px] w-full max-w-6xl flex-col overflow-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={SPRING}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/8 bg-white/[0.03] px-4 py-3">
              <div className="flex flex-1 items-center rounded-md border border-white/8 bg-white/5 px-3 py-1.5">
                <span className="truncate text-xs text-slate-400">{url.replace(/^https?:\/\//, "")}</span>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 text-xs font-semibold text-accentGlow transition hover:bg-accent/20"
              >
                <ExternalLink size={12} />
                {openTabLabel}
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={copy.close}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                <X size={16} />
              </button>
            </div>
            <iframe
              src={url}
              title={`${copy.livePreview} — ${title}`}
              className="h-full w-full flex-1 border-0 bg-slate-950"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
