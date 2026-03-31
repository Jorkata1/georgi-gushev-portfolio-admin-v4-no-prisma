"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/6">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <Container className="section-padding relative">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          className="display-title mt-5 max-w-4xl text-balance"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {title}
        </motion.h1>

        {description ? (
          <motion.p
            className="mt-6 max-w-2xl text-lg text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {description}
          </motion.p>
        ) : null}
      </Container>
    </section>
  );
}