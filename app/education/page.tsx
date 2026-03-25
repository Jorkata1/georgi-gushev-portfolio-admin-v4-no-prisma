import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { getCertificationItems, getEducationItems } from "@/lib/content";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Образование и сертификати",
  description:
    "Образование, квалификации и сертификати на Георги Гушев — графичен дизайн, QA курс и практическа подготовка.",
  path: "/education"
});

export default async function EducationPage() {
  const education = await getEducationItems();
  const certifications = await getCertificationItems();

  return (
    <>
      <PageHero
        eyebrow="Образование и сертификати"
        title="Фундамент от графичен дизайн, техническа дисциплина и последователно QA развитие."
        description="Страницата събира на едно място образованието, курсовете и сертификатите, които оформят професионалния профил."
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <article className="surface p-7 sm:p-8">
              <span className="eyebrow">Образование</span>
              <div className="mt-6 space-y-5">
                {education.map((item, index) => (
                  <div
                    key={item.id ?? `${item.institution}-${item.degree}-${index}`}
                    className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-amber">{item.period}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">{item.degree}</h2>
                    <p className="mt-2 text-sm font-medium text-slate-200">{item.institution}</p>
                    <p className="mt-3 text-sm text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface p-7 sm:p-8">
              <span className="eyebrow">Сертификати и практика</span>
              <div className="mt-6 space-y-4">
                {certifications.map((item, index) => {
                  const content = (
                    <>
                      <div>
                        <p className="text-lg font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {item.issuer} · {item.year}
                        </p>
                      </div>
                      <ArrowUpRight className="text-primaryGlow" size={18} />
                    </>
                  );

                  return item.href ? (
                    <a
                      key={item.id ?? `${item.title}-${item.year}-${index}`}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/10 bg-white/5 p-5 hover:border-primary/30 hover:bg-white/[0.08]"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={item.id ?? `${item.title}-${item.year}-${index}`}
                      className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/10 bg-white/5 p-5"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-[1.4rem] border border-primary/20 bg-primary/10 p-5">
                <p className="text-sm text-primaryGlow">
                  Секцията е подготвена така, че лесно да се добавят нови сертификати,
                  курсове, achievements и външни proof links.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
