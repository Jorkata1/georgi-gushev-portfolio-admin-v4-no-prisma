import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Услуги",
  description:
    "Уеб дизайн, създаване на сайтове, UI дизайн, бранд идентичност, поддръжка, QA manual услуги и консултации.",
  path: "/services"
});

const services = [
  {
    title: "Уеб дизайн и създаване на сайтове",
    description:
      "Създаване на clean, modern и responsive сайтове с ясна структура, добра визуална йерархия и професионално представяне.",
    includes: [
      "Представителни сайтове",
      "Portfolio сайтове",
      "Landing pages",
      "Структура и layout",
      "Responsive адаптация"
    ]
  },
  {
    title: "UI дизайн за сайтове и приложения",
    description:
      "UI концепции и интерфейсни решения с фокус върху яснота, визуална последователност и по-добро потребителско изживяване.",
    includes: [
      "Screen layouts",
      "Визуална йерархия",
      "UI секции и компоненти",
      "Подобряване на user flow",
      "Clean visual direction"
    ]
  },
  {
    title: "Бранд идентичност",
    description:
      "Лого посока, цветова система, типография и визуален стил за по-разпознаваем и последователен бранд.",
    includes: [
      "Лого посока",
      "Цветова система",
      "Типографска посока",
      "Визуален стил",
      "Приложения върху реални носители"
    ]
  },
  {
    title: "Визуално и функционално обновяване на сайтове",
    description:
      "Подобряване на съществуващи сайтове чрез по-чист дизайн, по-добра структура и по-ясно съдържание.",
    includes: [
      "Редизайн на секции",
      "Подреждане на съдържание",
      "По-добра визуална йерархия",
      "Mobile improvements",
      "Визуален и функционален refresh"
    ]
  },
  {
    title: "Поддръжка и updates",
    description:
      "Текуща помощ за вече съществуващ сайт — съдържание, малки промени, updates и визуални подобрения.",
    includes: [
      "Смяна на текстове и изображения",
      "Добавяне на нови секции",
      "Малки visual fixes",
      "Content updates",
      "Текуща поддръжка"
    ]
  },
  {
    title: "QA Manual услуги",
    description:
      "Ръчно тестване, user flow проверки, bug reporting, responsive check и pre-launch review.",
    includes: [
      "Manual testing",
      "Bug reporting",
      "User flow проверки",
      "Responsive check",
      "Pre-launch review"
    ]
  },
  {
    title: "Консултации и съдействие",
    description:
      "Помощ при планиране на сайт, избор на структура, подобряване на съществуващ проект и насоки за по-силен дигитален образ.",
    includes: [
      "Какъв сайт е нужен",
      "Как да се подреди съдържанието",
      "Какво да се подобри първо",
      "Посока за по-професионална визия",
      "Следваща правилна стъпка"
    ]
  }
];

const process = [
  "Разговор и уточняване",
  "Структура и посока",
  "Изработка, подобрения или преглед",
  "Финализиране"
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Дигитални решения, дизайн и поддръжка с фокус върху яснота, визия и функционалност."
        description="Работя по проекти, при които добрата визия, правилната структура и работещото потребителско изживяване трябва да вървят заедно — от дизайн и изграждане на сайтове до бранд идентичност, QA прегледи и визуално обновяване."
      />

      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow="Какво предлагам"
            title="Услуги, насочени към по-добро онлайн представяне и по-качествено дигитално присъствие."
            description="Подходящи за лични брандове, малки бизнеси, нови проекти и хора, които имат нужда от по-подредена визия, по-ясна структура и по-професионално дигитално решение."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="surface h-full p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
                <p className="mt-4 text-sm text-slate-300">{service.description}</p>

                <ul className="mt-6 space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="text-sm text-slate-300">
                      • {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding border-y border-white/6 bg-white/[0.015]">
        <Container>
          <SectionHeading
            eyebrow="Процес"
            title="Подреден подход от първоначалната идея до финалния резултат."
            description="Независимо дали става дума за нов сайт, редизайн, визуално обновяване или QA преглед, работя с ясен процес и practical фокус."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {process.map((step, index) => (
              <article key={step} className="surface h-full p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-amber">
                  Стъпка {index + 1}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">{step}</h3>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 pt-20">
        <Container>
          <div className="surface-strong overflow-hidden p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="eyebrow">Запитване</span>
                <h2 className="section-title mt-4 text-balance">
                  Ако имаш идея, нужда от нов сайт или искаш да подобриш съществуващ проект, можем да започнем от ясен разговор.
                </h2>
                <p className="mt-5 max-w-2xl text-slate-300">
                  Изпрати запитване с кратка информация за това от какво имаш нужда и ще обсъдим най-подходящата посока.
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