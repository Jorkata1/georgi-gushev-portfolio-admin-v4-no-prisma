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

const primaryService = {
  label: "Водеща услуга",
  title: "Уеб дизайн и създаване на сайтове",
  description:
    "Създавам clean и модерни сайтове с фокус върху ясна структура, силна визуална посока и работещо потребителско изживяване. Подходящо за лични брандове, услуги, малки бизнеси и проекти, които имат нужда от по-професионално онлайн присъствие.",
  highlights: [
    "Представителни сайтове",
    "Portfolio сайтове",
    "Landing pages",
    "Редизайн на съществуващи сайтове",
    "Responsive адаптация",
    "По-добра визуална йерархия и CTA логика"
  ]
};

const services: ServiceCard[] = [
  {
    label: "UI / UX",
    title: "UI дизайн за сайтове и приложения",
    description:
      "Екранни концепции, визуална структура и по-добър user flow с clean интерфейси и ясен визуален ритъм.",
    includes: [
      "Screen layouts",
      "Визуална йерархия",
      "UI секции и компоненти",
      "Подобряване на navigation flow"
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

const valuePoints = [
  "Ясна визуална посока",
  "Практична структура",
  "QA-oriented внимание към детайла"
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
      <section className="relative overflow-hidden border-b border-white/6">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 top-[-8rem] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(87,166,255,0.22),transparent_56%)]" />

        <Container className="section-padding relative">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="eyebrow">
                <Sparkles size={14} />
                Услуги / Дигитални решения
              </span>

              <h1 className="display-title mt-5 max-w-4xl text-balance">
                Премиум дигитални услуги с фокус върху визия, яснота и работещ резултат.
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-slate-300">
                Работя по проекти, при които добрата визия, правилната структура и
                работещото потребителско изживяване трябва да вървят заедно — от
                дизайн и изграждане на сайтове до бранд идентичност, QA прегледи и
                визуално обновяване.
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

              <div className="mt-8 flex flex-wrap gap-3">
                {valuePoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-strong relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(87,166,255,0.2),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(216,171,98,0.12),transparent_25%)]" />

              <div className="relative">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
                  <span className="eyebrow">Какво получаваш</span>
                  <h2 className="mt-4 text-2xl font-semibold text-white">
                    Дизайн, структура и по-професионално дигитално присъствие
                  </h2>
                  <p className="mt-4 text-sm text-slate-300">
                    Подходящо за лични брандове, малки бизнеси и нови проекти,
                    които имат нужда от clean визия, по-ясна комуникация и
                    по-добро онлайн представяне.
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
                      Уеб и сайтове
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      Дизайн и изработка
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Сайтове, редизайн и подобрения.
                    </p>
                  </div>

                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
                      Бранд и визия
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      Лице на бранда
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      По-силен облик и ясна посока.
                    </p>
                  </div>

                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
                      QA и детайл
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      Проверка и яснота
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Функционален преглед и usability фокус.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <article className="surface-strong p-8 sm:p-10">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                <Globe size={24} />
              </div>

              <div className="mt-6">
                <span className="eyebrow">{primaryService.label}</span>
                <h2 className="section-title mt-4 text-balance">
                  {primaryService.title}
                </h2>
                <p className="mt-5 max-w-3xl text-slate-300">
                  {primaryService.description}
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {primaryService.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="surface p-8">
              <span className="eyebrow">Подходящо за</span>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                Проекти, които имат нужда от повече от просто добра визия
              </h3>

              <div className="mt-6 space-y-4">
                {[
                  "Лични брандове",
                  "Малки бизнеси",
                  "Представителни сайтове",
                  "Portfolio сайтове",
                  "Landing pages",
                  "Редизайн на съществуващи сайтове"
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-slate-300">
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-primaryGlow"
                      size={18}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-300">
                  Целта не е само сайтът да изглежда по-добре, а да бъде по-ясен,
                  по-подреден и по-полезен за реалната комуникация с клиента.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-padding border-y border-white/6 bg-white/[0.015]">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">Останали услуги</span>
            <h2 className="section-title mt-4">
              Допълващи услуги за по-силен и по-пълен дигитален резултат
            </h2>
            <p className="mt-5 max-w-2xl text-slate-300">
              Освен създаване на сайтове, предлагам и услуги, които помагат на
              един проект да изглежда по-добре, да работи по-добре и да се
              представя по-професионално.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article key={service.title} className="surface card-hover h-full p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
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
          <div className="max-w-3xl">
            <span className="eyebrow">Процес</span>
            <h2 className="section-title mt-4">
              Подреден процес от първоначалната идея до финалния резултат
            </h2>
            <p className="mt-5 max-w-2xl text-slate-300">
              Независимо дали става дума за нов сайт, редизайн, визуално
              обновяване или QA преглед, работя с ясен ритъм и practical фокус.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {process.map((item) => (
              <article key={item.step} className="surface relative h-full p-6">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primaryGlow">
                  {item.step}
                </div>

                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{item.text}</p>
              </article>
            ))}
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