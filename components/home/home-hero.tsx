import Image from "next/image";
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
              Дигитални решения / Дизайн / Уеб
            </span>

            <h1 className="hero-title mt-6 text-balance">
              Дизайн, сайтове и дигитални решения
              <span className="mt-1 block text-gradient">
                с фокус върху яснота, визия и функционалност.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Помагам на лични брандове, малки бизнеси и нови проекти с уеб дизайн,
              изграждане на сайтове, бранд идентичност, визуално обновяване,
              поддръжка и QA-oriented подобрения.
            </p>

            <p className="mt-4 max-w-2xl text-base text-slate-400">
              {siteConfig.heroTagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/services">
                <Button>
                  Виж услугите
                  <ArrowRight size={16} />
                </Button>
              </Link>

              <Link href="/portfolio">
                <Button variant="secondary">Разгледай проекти</Button>
              </Link>

              <Link href="/contact">
                <Button variant="ghost">Изпрати запитване</Button>
              </Link>

              <a href="/Georgi-Gushev-CV.pdf" download>
                <Button variant="ghost">
                  Изтегли CV
                  <Download size={16} />
                </Button>
              </a>
            </div>
          </div>

          <div className="relative pt-10 lg:pt-16">
            <div className="pointer-events-none absolute -top-16 right-0 z-20 hidden w-[210px] select-none lg:block xl:-top-20 xl:w-[280px]">
  <Image
    src="/hero/georgi-hero.png"
    alt="Георги Гушев"
    width={900}
    height={1400}
    priority
    className="h-auto w-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
  />
</div>

            <div className="surface-strong relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(87,166,255,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(216,171,98,0.12),transparent_25%)]" />

              <div className="relative grid gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 pr-20 lg:pr-28 xl:pr-36">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Какво предлагам
                  </p>

                  <p className="mt-3 text-2xl font-semibold text-white">
                    Уеб дизайн, сайтове, бранд идентичност и дигитални подобрения
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
  {quickFacts.map((fact) => (
    <div
      key={fact.label}
      className="flex h-full min-w-0 flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4"
    >
      <p className="text-[10px] uppercase tracking-[0.14em] leading-[1.3] text-slate-400">
        {fact.label}
      </p>

      <p className="mt-3 text-base font-semibold leading-snug text-white sm:text-lg">
        {fact.value}
      </p>

      <p className="mt-2 text-sm leading-5 text-slate-400">
        {fact.description}
      </p>
    </div>
  ))}
</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}