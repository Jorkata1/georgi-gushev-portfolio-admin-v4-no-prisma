"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function AnimatedDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="flex justify-center py-2">
      <motion.div
        className="relative h-px w-full max-w-xs overflow-hidden"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, #e8a44a, #4f9cf7, #e8a44a, transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
}
