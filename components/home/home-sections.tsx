"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whatIDo } from "@/data/site";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/shared/tilt-card";
import { ToolsMarquee } from "@/components/shared/tools-marquee";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
export function HomeSections() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const s = t.sections;

  return (
    <>
      {/* Services — with TiltCard hover */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow={s.services.eyebrow}
            title={s.services.title}
            description={s.services.description}
          />

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {t.whatIDo.map((item, index) => {
              const originalItem = whatIDo[index];
              const Icon = originalItem?.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <TiltCard className="h-full">
                    <article className="surface h-full p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow sm:p-6">
                      {Icon && (
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accentGlow sm:h-12 sm:w-12 sm:rounded-2xl">
                          <Icon size={16} className="sm:hidden" />
                          <Icon size={20} className="hidden sm:block" />
                        </div>
                      )}
                      <h3 className="mt-3 text-sm font-semibold text-white sm:mt-5 sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 hidden text-xs leading-relaxed text-slate-300 sm:mt-3 sm:block sm:text-sm">
                        {item.text}
                      </p>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-10">
            <Link href="/services">
              <Button variant="secondary">
                {s.services.viewAll}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Tools marquee */}
      <ToolsMarquee />

      {/* CTA */}
      <section className="section-padding-sm pb-20 sm:pb-24">
        <Container>
          <div className="surface-strong overflow-hidden p-6 sm:p-10 lg:p-12">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="eyebrow">{s.cta.eyebrow}</span>
                <h2 className="section-title mt-3 text-balance sm:mt-4">{s.cta.title}</h2>
                <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:mt-5 sm:text-base">
                  {s.cta.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-end">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">
                    {s.cta.sendInquiry}
                    <ArrowRight size={16} />
                  </Button>
                </Link>

                <Link href="/portfolio" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {s.cta.viewProjects}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}