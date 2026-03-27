import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "За мен",
  description:
    "Подход към работа, комбиниращ дизайн, дигитални решения и QA-oriented мислене с фокус върху яснота, последователност и practical execution.",
  path: "/about"
});

const strengths = [
  "Аналитично мислене",
  "Логическо мислене",
  "Критично мислене",
  "Внимание към детайла",
  "Комуникативност",
  "Адаптивност",
  "Любопитство",
  "Желание за развитие",
  "Research mindset",
  "QA-oriented подход"
];

const focusAreas = [
  "Уеб дизайн и визуална структура за сайтове",
  "UI концепции за уеб и мобилни интерфейси",
  "Бранд идентичност и визуална последователност",
  "Поддръжка и визуално обновяване на сайтове",
  "QA manual преглед и проверка на user flow",
  "Консултации за структура, съдържание и дигитална посока"
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="За мен"
        title="Работя в пресечната точка между дизайн, дигитални решения и функционално мислене."
        description="Подхождам към проектите с внимание към детайла, визуална култура и practical mindset, за да се стига до решения, които изглеждат добре, работят добре и се представят по-професионално онлайн."
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <article className="surface p-7 sm:p-8">
                <span className="eyebrow">Подход</span>
                <h2 className="mt-4 text-3xl font-semibold text-white">
                  Комбинирам визуален подход, техническа дисциплина и желание за реално работещи резултати.
                </h2>

                <div className="mt-6 space-y-4 text-slate-300">
                  <p>
                    Интересите ми са свързани с графичния дизайн, уеб визията,
                    дигиталните приложения и качественото потребителско изживяване.
                    Харесвам проекти, при които добрата визия не е самоцел, а част
                    от по-ясна структура, по-добра логика и по-силно онлайн
                    представяне.
                  </p>

                  <p>
                    За мен добрият дигитален проект трябва да съчетава визия,
                    структура и функционалност. Затова подхождам не само с
                    естетически поглед, а и с логика към начина, по който един сайт,
                    интерфейс или бранд трябва да се усеща и използва.
                  </p>

                  <p>
                    Стремя се към clean решения, ясна визуална йерархия, подредено
                    съдържание и детайли, които правят крайния резултат по-професионален.
                    Подходът ми е спокоен, аналитичен и насочен към това един проект
                    да изглежда по-добре и да работи по-добре.
                  </p>
                </div>
              </article>

              <article className="surface p-7 sm:p-8">
                <span className="eyebrow">Професионална основа</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Опит, който подкрепя работата ми по дигитални проекти
                </h2>

                <div className="mt-6 space-y-4 text-slate-300">
                  <p>
                    Професионалният ми опит включва работа с дигитални приложения,
                    поддръжка, съдействие при потребителски затруднения, докладване
                    на проблеми и участие в процеси, при които яснотата и
                    надеждността са важни.
                  </p>

                  <p>
                    Това ми помага да гледам на дигиталните проекти не само визуално,
                    а и през логиката на реалното използване, потребителските
                    затруднения и качеството на крайния резултат.
                  </p>

                  <p>
                    Образованието и практическите ми проекти в графичния дизайн
                    допълват този подход с визуална култура, композиция, типография
                    и разбиране за цялостна идентичност.
                  </p>
                </div>
              </article>
            </div>

            <div className="space-y-6">
              <article className="surface p-7 sm:p-8">
                <span className="eyebrow">Фокус</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  С какво мога да бъда полезен
                </h2>

                <div className="mt-6 space-y-4">
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
              </article>

              <article className="surface p-7 sm:p-8">
                <span className="eyebrow">Силни страни</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Подход, изграден върху внимание към детайла и practical мислене
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {strengths.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>

              <article className="surface p-7 sm:p-8">
                <span className="eyebrow">Езици</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Комуникация и работа в различен контекст
                </h2>

                <div className="mt-6 space-y-3 text-slate-300">
                  <p>Български — майчин език</p>
                  <p>Английски — B2</p>
                </div>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="surface-strong max-w-4xl p-8 sm:p-10">
            <span className="eyebrow">Контакт</span>
            <h2 className="section-title mt-4 text-balance">
              Ако търсиш човек с комбинация от дизайн, дигитално мислене и QA-oriented подход, можем да започнем с кратък разговор.
            </h2>
            <p className="mt-5 max-w-2xl text-slate-300">
              Подходящо за нови сайтове, визуално обновяване, бранд посока,
              UI идеи, поддръжка или преглед на съществуващ проект.
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
        </Container>
      </section>
    </>
  );
}