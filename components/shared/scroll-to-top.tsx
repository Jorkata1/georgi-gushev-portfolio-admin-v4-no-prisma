"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-background/80 text-accent backdrop-blur-md transition-all duration-300 hover:bg-accent/15 hover:text-accentGlow hover:shadow-[0_0_20px_rgba(232,164,74,0.2)] sm:bottom-8 sm:right-8 sm:h-12 sm:w-12"
          aria-label="Нагоре"
        >
          <ArrowUp size={16} className="sm:hidden" />
          <ArrowUp size={18} className="hidden sm:block" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}