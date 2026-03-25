import { Container } from "@/components/shared/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/6">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <Container className="section-padding relative">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display-title mt-5 max-w-4xl text-balance">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">{description}</p>
      </Container>
    </section>
  );
}
