"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Wrench } from "lucide-react";
import { Container } from "@/components/shared/container";
import { useLanguage } from "@/lib/language-context";

export default function PortfolioPage() {
  const { locale } = useLanguage();

  const copy =
    locale === "bg"
      ? {
          eyebrow: "Профилактика",
          title: "Страницата в момента е в профилактика",
          description:
            "Работим по подобрения, за да заредим проектите по-бързо и качествено. Извиняваме се за причиненото неудобство.",
          backHome: "Върни се в началото",
          contact: "Свържи се с мен"
        }
      : {
          eyebrow: "Maintenance",
          title: "This page is currently under maintenance",
          description:
            "We're working on improvements to load projects faster and better. Sorry for the inconvenience.",
          backHome: "Back to home",
          contact: "Get in touch"
        };

  return (
    <section className="section-padding min-h-[70vh] flex items-center">
      <Container>
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Wrench size={28} className="text-accent" />
          </motion.div>

          <span className="eyebrow justify-center">{copy.eyebrow}</span>

          <h1 className="display-title mt-5 text-balance">{copy.title}</h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            {copy.description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-accent/30 hover:bg-accent/10 hover:text-white"
            >
              <ArrowLeft size={16} />
              {copy.backHome}
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accentGlow transition hover:bg-accent/20"
            >
              {copy.contact}
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}