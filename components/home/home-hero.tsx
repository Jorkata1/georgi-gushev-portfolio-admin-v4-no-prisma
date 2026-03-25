import Link from "next/link";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { quickFacts, siteConfig } from "@/data/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/6">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-x-0 top-[-8rem] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(87,166,255,0.24),transparent_56%)]" />

      <Container className="section-padding relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="eyebrow">
              <Sparkles size={14} />
              Личен бранд / портфолио
            </span>

            <h1 className="hero-title mt-6 text-balance">
              Георги Гушев —
              <span className="block text-gradient">
                дизайн, дигитални приложения и QA мислене
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Георги Гушев е млад професионалист с интереси в графичния дизайн,
              дигиталните приложения и QA мисленето, с фокус върху яснота,
              последователност и внимание към детайла.
            </p>

            <p className="mt-4 max-w-2xl text-base text-slate-400">
              {siteConfig.heroTagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/portfolio">
                <Button>
                  Виж портфолио
                  <ArrowRight size={16} />
                </Button>
              </Link>

              <Link href="/contact">
                <Button variant="secondary">Свържи се с мен</Button>
              </Link>

              <a href="/Georgi-Gushev-CV.pdf" download>
                <Button variant="ghost">
                  Изтегли CV
                  <Download size={16} />
                </Button>
              </a>
            </div>
          </div>

          <div className="surface-strong relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(87,166,255,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(216,171,98,0.12),transparent_25%)]" />

            <div className="relative grid gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Позициониране
                </p>

                <p className="mt-3 text-2xl font-semibold text-white">
                  Junior Graphic Designer / Digital Applications Specialist
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {quickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4"
                  >
                    {fact.label === "Професионален опит" ? (
                      <p className="text-[9px] uppercase tracking-[0.06em] leading-[1.35] text-slate-400 sm:text-[10px]">
                        <span className="block whitespace-nowrap">
                          Професионален
                        </span>
                        <span className="block whitespace-nowrap">опит</span>
                      </p>
                    ) : (
                      <p className="text-[9px] uppercase tracking-[0.08em] leading-[1.35] text-slate-400 sm:text-[10px]">
                        {fact.label}
                      </p>
                    )}

                    <p className="mt-3 min-w-0 break-words text-lg font-semibold leading-tight text-white">
                      {fact.value}
                    </p>

                    <p className="mt-2 min-w-0 break-words text-sm leading-6 text-slate-400">
                      {fact.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}