import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { getExperienceItems } from "@/lib/content";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Опит",
  description:
    "Професионален опит на Георги Гушев — дигитални приложения, техническа поддръжка, системни проверки и QA ориентация.",
  path: "/experience"
});

export default async function ExperiencePage() {
  const experience = await getExperienceItems();

  return (
    <>
      <PageHero
        eyebrow="Професионален опит"
        title="Работа в среди, в които качеството, яснотата и отговорността имат пряка стойност."
        description="Професионален опит с фокус върху дигитални приложения, системна поддръжка, клиентска комуникация и аналитичен подход към работата."
      />

      <section className="section-padding">
        <Container>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-white/10 md:block" />

            <div className="space-y-6">
              {experience.map((item, index) => (
                <article
                  key={item.id ?? `${item.company}-${item.role}-${index}`}
                  className="grid gap-5 md:grid-cols-[40px_1fr]"
                >
                  <div className="hidden md:flex">
                    <span className="mt-6 inline-flex h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_rgba(87,166,255,0.7)]" />
                  </div>
                  <div className="surface p-7 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-amber">
                          {item.company}
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">
                          {item.role}
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                          {item.location}
                        </p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-300">
                        {item.period}
                      </div>
                    </div>

                    <p className="mt-5 max-w-3xl text-slate-300">{item.summary}</p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {item.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-300"
                        >
                          {bullet}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}