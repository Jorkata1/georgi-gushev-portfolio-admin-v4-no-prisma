import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Brush,
  CheckCircle2,
  Globe,
  LayoutGrid,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Услуги",
  description:
    "Уеб дизайн, създаване на сайтове, UI дизайн, бранд идентичност, поддръжка, QA manual услуги и консултации.",
  path: "/services"
});

type ServiceCard = {
  label: string;
  title: string;
  description: string;
  includes: string[];
  icon: LucideIcon;
};

const services: ServiceCard[] = [
  {
    label: "Уеб",
    title: "Уеб дизайн и създаване на сайтове",
    description:
      "Създавам clean и модерни сайтове с фокус върху ясна структура, силна визуална посока и работещо потребителско изживяване.",
    includes: [
      "Представителни сайтове",
      "Portfolio сайтове",
      "Landing pages",
      "Редизайн на съществуващи сайтове"
    ],
    icon: Globe
  },
  {
    label: "UI / UX",
    title: "UI дизайн за сайтове и приложения",
    description:
      "Екранни концепции, визуална структура и по-добър user flow с clean интерфейси и ясен визуален ритъм.",
    includes: [
      "Screen layouts",
      "Визуална йерархия",
      "UI секции и компоненти",
      "Navigation flow"
    ],
    icon: LayoutGrid
  },
  {
    label: "Бранд",
    title: "Бранд идентичност",
    description:
      "Лого посока, цветова система, типография и визуален стил за по-разпознаваем и последователен бранд.",
    includes: [
      "Лого посока",
      "Цветова система",
      "Типография",
      "Визуален стил"
    ],
    icon: Brush
  },
  {
    label: "Подобрения",
    title: "Визуално и функционално обновяване",
    description:
      "Подобряване на съществуващи сайтове чрез по-чист дизайн, по-добра структура и по-професионално усещане.",
    includes: [
      "Редизайн на секции",
      "Подреждане на съдържание",
      "Mobile improvements",
      "UX и visual refresh"
    ],
    icon: Sparkles
  },
  {
    label: "Поддръжка",
    title: "Поддръжка и updates",
    description:
      "Текуща помощ за вече съществуващ сайт — съдържание, малки промени, updates и визуални подобрения.",
    includes: [
      "Смяна на текстове и изображения",
      "Нови секции",
      "Малки visual fixes",
      "Content updates"
    ],
    icon: Wrench
  },
  {
    label: "QA",
    title: "QA Manual услуги",
    description:
      "Ръчно тестване, user flow проверки, bug reporting, responsive check и pre-launch review.",
    includes: [
      "Manual testing",
      "Bug reporting",
      "User flow проверки",
      "Responsive check"
    ],
    icon: ShieldCheck
  },
  {
    label: "Консултации",
    title: "Консултации и съдействие",
    description:
      "Помощ при планиране на сайт, избор на структура, подобряване на съществуващ проект и дигитална посока.",
    includes: [
      "Структура на сайт",
      "Посока за съдържание",
      "Какво да се подобри първо",
      "Следваща правилна стъпка"
    ],
    icon: MessageSquareMore
  }
];

const suitableFor = [
  "Лични брандове",
  "Малки бизнеси",
  "Представителни сайтове",
  "Portfolio сайтове",
  "Landing pages",
  "Редизайн на съществуващи сайтове"
];

const process = [
  {
    step: "01",
    title: "Разговор и уточняване",
    text: "Изясняваме какво е нужно, каква е целта на проекта и какъв резултат трябва да се постигне."
  },
  {
    step: "02",
    title: "Структура и посока",
    text: "Подреждаме съдържанието, визуалната линия и основата, върху която проектът ще се развие."
  },
  {
    step: "03",
    title: "Дизайн, изработка или подобрения",
    text: "Работим по самото решение — дизайн, сайт, обновяване, визуални корекции или QA преглед."
  },
  {
    step: "04",
    title: "Преглед и финализиране",
    text: "Минаваме през корекции и финален преглед, за да стигнем до по-чист и по-професионален резултат."
  }
];

export default function ServicesPage() {
  return (
    <>
      <section className="section-padding pt-16">
        <Container>
          <div className="mx-auto max-w-6xl">
            <article className="surface-strong relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,156,247,0.12),transparent_45%),radial-gradient(circle_at_bottom,rgba(232,164,74,0.06),transparent_35%)]" />
              <div className="relative">
                <div className="mx-auto max-w-3xl text-center">
                  <span className="eyebrow justify-center">Подходящо за</span>

                  <h1 className="section-title mt-4 text-balance">
                    Проекти, които имат нужда от повече от просто добра визия
                  </h1>

                  <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                    Работя по сайтове, брандове и дигитални решения, при които
                    визията, структурата и функционалността трябва да вървят
                    заедно, за да се стигне до по-ясен, по-подреден и по-професионален резултат.
                  </p>
                </div>

                <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
                  {[
                    "Ясна визуална посока",
                    "Практична структура",
                    "По-силно дигитално присъствие"
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm text-accent"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {suitableFor.map((item) => (
                    <div
                      key={item}
                      className="group rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-5 py-5 transition hover:border-accent/30 hover:bg-white/[0.06]"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accentGlow">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-sm font-medium text-slate-200">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mx-auto mt-10 max-w-4xl rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 sm:p-7">
                  <p className="text-center text-base leading-7 text-slate-300 sm:text-lg">
                    Целта не е само сайтът да изглежда по-добре, а да бъде
                    <span className="font-medium text-white"> по-ясен</span>,
                    <span className="font-medium text-white"> по-подреден</span> и
                    <span className="font-medium text-white"> по-полезен</span> за
                    реалната комуникация с клиента.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-padding border-y border-white/6 bg-white/[0.015]">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">Услуги</span>
            <h2 className="section-title mt-4">
              Услуги за по-силен и по-пълен дигитален резултат
            </h2>
            <p className="mt-5 max-w-2xl text-slate-300">
              От уеб дизайн и изграждане на сайтове до бранд идентичност,
              поддръжка, QA преглед и консултации — всичко, което помага на
              един проект да изглежда по-добре и да работи по-добре.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="surface card-hover flex h-full flex-col p-6"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accentGlow">
                    <Icon size={20} />
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {service.label}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-300">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {service.includes.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-padding">
  <Container>
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-3xl text-center">
        <span className="eyebrow justify-center">Процес</span>
        <h2 className="section-title mt-4 text-balance">
          Подреден процес от първоначалната идея до финалния резултат
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Независимо дали става дума за нов сайт, редизайн, визуално
          обновяване или QA преглед, работя с ясен ритъм, practical фокус и
          внимание към всеки ключов етап.
        </p>
      </div>

      <div className="relative mt-12">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

        <div className="grid gap-6 lg:grid-cols-4">
          {process.map((item) => (
            <article
              key={item.step}
              className="group surface-strong relative h-full overflow-hidden p-6 transition hover:-translate-y-1 hover:border-accent/20"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,164,74,0.06),transparent_40%)] opacity-0 transition group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-sm font-semibold text-accentGlow shadow-[0_0_0_6px_rgba(232,164,74,0.04)]">
                    {item.step}
                  </div>

                  <div className="hidden h-px flex-1 bg-white/10 lg:block" />
                </div>

                <h3 className="text-xl font-semibold leading-snug text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </Container>
</section>

      <section className="pb-20">
        <Container>
          <div className="surface-strong overflow-hidden p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="eyebrow">Запитване</span>
                <h2 className="section-title mt-4 text-balance">
                  Имаш нужда от нов сайт, редизайн или по-силна дигитална визия?
                </h2>
                <p className="mt-5 max-w-2xl text-slate-300">
                  Изпрати запитване с кратка информация за проекта и ще обсъдим
                  най-подходящата посока за дизайн, структура, обновяване или
                  следваща правилна стъпка.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
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
          </div>
        </Container>
      </section>
    </>
  );
}