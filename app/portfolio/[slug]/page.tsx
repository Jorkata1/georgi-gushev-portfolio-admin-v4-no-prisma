import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/data/site";

type ProjectPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Проектът не е намерен"
    };
  }

  const url = `${siteConfig.siteUrl}/portfolio/${project.slug}`;

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url,
      type: "article"
    }
  };
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="section-padding border-b border-white/6">
        <Container>
          <Link
            href="/portfolio"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Назад към портфолио
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <span className="eyebrow">{project.category}</span>
              <h1 className="display-title mt-5 text-balance">{project.title}</h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-300">{project.summary}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="surface p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm uppercase tracking-[0.25em] text-slate-400">
                  Година
                </span>
                <span className="text-sm font-medium text-white">{project.year}</span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Цели</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {project.goals.length}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Стъпки</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {project.process.length}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Резултати</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {project.outcome.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid gap-6">
            <div className="surface overflow-hidden">
              <div className="relative min-h-[340px] sm:min-h-[460px]">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  unoptimized
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((image, index) => (
                <div key={`${image}-${index}`} className="surface overflow-hidden">
                  <div className="relative min-h-[260px]">
                    <Image
                      src={image}
                      alt={`${project.title} gallery ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="surface p-6">
              <h2 className="text-xl font-semibold text-white">Цели</h2>
              <ul className="mt-4 space-y-3">
                {project.goals.map((item) => (
                  <li key={item} className="text-sm text-slate-300">
                    • {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="surface p-6">
              <h2 className="text-xl font-semibold text-white">Процес</h2>
              <ul className="mt-4 space-y-3">
                {project.process.map((item) => (
                  <li key={item} className="text-sm text-slate-300">
                    • {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="surface p-6">
              <h2 className="text-xl font-semibold text-white">Резултат</h2>
              <ul className="mt-4 space-y-3">
                {project.outcome.map((item) => (
                  <li key={item} className="text-sm text-slate-300">
                    • {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-10 surface-strong p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="eyebrow">Следваща стъпка</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  По-детайлни case studies и разширяване на project stories.
                </h2>
                <p className="mt-3 max-w-2xl text-slate-300">
                  Структурата на този сайт е готова за добавяне на нови проекти, по-богати
                  визуални галерии и задълбочени описания.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primaryGlow"
              >
                Нека поговорим
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
