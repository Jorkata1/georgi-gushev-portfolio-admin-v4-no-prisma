import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  LayoutGrid,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Tag,
  Target
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/data/site";

export const metadata = createMetadata({
  title: "За мен",
  description:
    "Дизайн, дигитално мислене и QA-oriented подход с фокус върху яснота, визия и practical execution.",
  path: "/about"
});

const strengths = [
  "Аналитично мислене",
  "Внимание към детайла",
  "Логическо мислене",
  "Критично мислене",
  "Комуникативност",
  "Адаптивност",
  "Research mindset",
  "QA-oriented подход"
];

const valuePoints = [
  {
    title: "Дизайн и структура",
    text: "Търся баланс между добра визия, ясна йерархия и practical съдържание.",
    icon: LayoutGrid
  },
  {
    title: "QA mindset",
    text: "Гледам на проектите не само визуално, а и през логиката на реалното използване.",
    icon: ShieldCheck
  },
  {
    title: "Дигитален подход",
    text: "Подхождам към сайтове и брандове като към цялостни дигитални решения.",
    icon: Sparkles
  }
];

const focusAreas = [
  "Уеб дизайн и визуална структура",
  "UI посока за сайтове и интерфейси",
  "Бранд идентичност и консистентност",
  "Визуално обновяване и поддръжка",
  "QA manual преглед и user flow проверка",
  "Консултации за структура и дигитална посока"
];

const resultPoints = [
  "По-ясна комуникация",
  "По-подредена структура",
  "По-професионално дигитално присъствие"
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/6">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 top-[-8rem] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(87,166,255,0.18),transparent_56%)]" />

        <Container className="section-padding relative">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="eyebrow">
                <Sparkles size={14} />
                За мен / Подход / Дигитално мислене
              </span>

              <h1 className="display-title mt-5 max-w-4xl text-balance">
                Дизайн, дигитално мислене и QA логика в един по-подреден и practical подход.
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-slate-300">
                Работя в пресечната точка между дизайн, дигитални решения и
                функционално мислене. Подхождам към проектите с внимание към
                детайла, визуална култура и ясна логика, за да се стига до
                резултати, които изглеждат по-добре и работят по-добре.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button>
                    Изпрати запитване
                    <ArrowRight size={16} />
                  </Button>
                </Link>

                <Link href="/portfolio">
                  <Button variant="secondary">Разгледай проекти</Button>
                </Link>
              </div>
            </div>

            <div className="surface-strong relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(87,166,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(216,171,98,0.10),transparent_25%)]" />

              <div className="relative grid gap-4">
                {valuePoints.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
                    >
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                        <Icon size={18} />
                      </div>

                      <h2 className="mt-4 text-xl font-semibold text-white">
                        {item.title}
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <article className="surface-strong p-8 sm:p-10 lg:p-12">
            <span className="eyebrow">Подход, полезност и резултат</span>

            <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="section-title text-balance">
                  Добрата визия работи най-добре, когато е част от ясна структура и реално полезно изживяване.
                </h2>

                <div className="mt-6 space-y-4 text-slate-300">
                  <p>
                    Харесвам проекти, при които визуалната посока не е самоцел,
                    а помага на един сайт или бранд да се усеща по-подреден,
                    по-ясен и по-професионален.
                  </p>

                  <p>
                    Затова подхождам едновременно с дизайнерски поглед и с логика
                    към структурата, съдържанието, използваемостта и малките
                    детайли, които определят качеството на крайния резултат.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {resultPoints.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <span className="eyebrow">С какво мога да бъда полезен</span>

                  <div className="mt-5 space-y-4">
                    {focusAreas.map((item) => (
                      <div key={item} className="flex gap-3 text-sm text-slate-300">
                        <CheckCircle2
                          className="mt-0.5 shrink-0 text-primaryGlow"
                          size={18}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <span className="eyebrow">Какво носи този подход</span>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Когато дизайнът, структурата и функционалността вървят заедно,
                    резултатът не просто изглежда по-добре — той комуникира
                    по-уверено и работи по-ефективно.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <article className="surface self-start p-7 sm:p-8">
                <span className="eyebrow">Силни страни</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Подход, изграден върху внимание към детайла и practical мислене
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {strengths.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-white/10 bg-white/[0.05] px-4 py-4 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>

              <article className="surface p-7 sm:p-8">
                <span className="eyebrow">Професионална основа</span>

                <div className="mt-4 flex items-center gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                    <BriefcaseBusiness size={18} />
                  </div>

                  <h2 className="text-2xl font-semibold text-white">
                    Опит, който подкрепя работата ми по дигитални проекти
                  </h2>
                </div>

                <div className="mt-5 space-y-4 text-slate-300">
                  <p>
                    Професионалният ми опит включва работа с дигитални приложения,
                    поддръжка, съдействие при потребителски затруднения, докладване
                    на проблеми и участие в процеси, при които яснотата и
                    надеждността са важни.
                  </p>

                  <p>
                    Това ми помага да гледам на дигиталните проекти не само
                    визуално, а и през логиката на реалното използване,
                    потребителските затруднения и качеството на крайния резултат.
                  </p>
                </div>
              </article>
            </div>

            <article className="surface-strong p-7 sm:p-8">
              <span className="eyebrow">Кратка информация</span>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                    <MapPin size={16} />
                  </div>

                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-400">
                    Локация и езици
                  </p>

                  <p className="mt-3 text-sm leading-7 text-white">
                    {siteConfig.location}
                  </p>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm text-white">Български — майчин език</p>
                    <p className="mt-1 text-sm text-white">Английски — B2</p>
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                    <Target size={16} />
                  </div>

                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-400">
                    Подходящо за
                  </p>

                  <p className="mt-3 text-sm leading-7 text-white">
                    Нови сайтове, визуално обновяване, бранд посока, UI идеи,
                    поддръжка и QA-oriented подобрения
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                    <Tag size={16} />
                  </div>

                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-400">
                    Фокус
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Дизайн", "Уеб", "Бранд", "QA"].map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                    <Mail size={16} />
                  </div>

                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-400">
                    Контакт
                  </p>

                  <p className="mt-3 break-words text-sm text-white">
                    {siteConfig.email}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-white">
                    <Phone size={14} className="text-primaryGlow" />
                    <span>{siteConfig.phone}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}