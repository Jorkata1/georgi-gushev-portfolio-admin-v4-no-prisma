import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { getAboutContent } from "@/lib/content";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "За мен",
  description:
    "Научи повече за Георги Гушев — background в графичния дизайн, интерес към дигитални приложения, QA и техническа поддръжка.",
  path: "/about"
});

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      <PageHero
        eyebrow="За мен"
        title={content.heroTitle}
        description={content.heroDescription}
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <article className="surface p-7 sm:p-8">
              <span className="eyebrow">Професионален профил</span>
              <h2 className="section-title mt-4">{content.profileTitle}</h2>
              <div className="mt-6 space-y-4 text-slate-300">
                {content.profileParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <article className="surface p-7 sm:p-8">
              <span className="eyebrow">Начин на работа</span>
              <h2 className="section-title mt-4">{content.workTitle}</h2>
              <div className="mt-6 space-y-4 text-slate-300">
                {content.workParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="surface p-7 sm:p-8">
              <span className="eyebrow">Силни страни</span>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {content.strengths.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-primaryGlow" />
                      <span className="text-sm font-medium text-slate-200">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface p-7 sm:p-8">
              <span className="eyebrow">Езици</span>
              <div className="mt-6 space-y-4">
                {content.languages.map((item) => (
                  <div
                    key={`${item.name}-${item.level}`}
                    className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.name}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{item.level}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
