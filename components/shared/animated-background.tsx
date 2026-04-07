"use client";

import { motion } from "framer-motion";

const blobs = [
  {
    color: "rgba(79, 156, 247, 0.18)",
    size: 550,
    left: "5%",
    top: "2%",
    animate: {
      x: ["0%", "15%", "-8%", "10%", "0%"],
      y: ["0%", "20%", "8%", "-10%", "0%"],
    },
    duration: 28,
  },
  {
    color: "rgba(232, 164, 74, 0.14)",
    size: 500,
    left: "65%",
    top: "10%",
    animate: {
      x: ["0%", "-18%", "8%", "-12%", "0%"],
      y: ["0%", "15%", "-8%", "18%", "0%"],
    },
    duration: 32,
  },
  {
    color: "rgba(79, 156, 247, 0.12)",
    size: 480,
    left: "40%",
    top: "50%",
    animate: {
      x: ["0%", "20%", "-12%", "8%", "0%"],
      y: ["0%", "-15%", "10%", "-18%", "0%"],
    },
    duration: 35,
  },
  {
    color: "rgba(232, 164, 74, 0.10)",
    size: 420,
    left: "10%",
    top: "70%",
    animate: {
      x: ["0%", "-12%", "18%", "-6%", "0%"],
      y: ["0%", "12%", "-15%", "8%", "0%"],
    },
    duration: 30,
  },
  {
    color: "rgba(79, 156, 247, 0.10)",
    size: 380,
    left: "80%",
    top: "60%",
    animate: {
      x: ["0%", "12%", "-15%", "8%", "0%"],
      y: ["0%", "-18%", "6%", "14%", "0%"],
    },
    duration: 26,
  },
];

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Static base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(87,166,255,0.12),transparent_24%),radial-gradient(circle_at_80%_15%,rgba(216,171,98,0.09),transparent_18%)]" />

      {/* Floating blobs */}
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.left,
            top: blob.top,
            background: `radial-gradient(circle, ${blob.color}, transparent 65%)`,
            filter: "blur(60px)",
            willChange: "transform",
          }}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
}
