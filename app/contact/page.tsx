import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/data/site";

export const metadata = createMetadata({
  title: "Контакт",
  description:
    "Свържи се с Георги Гушев за работа, стаж, freelance възможности или професионален разговор.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакт"
        title="Нека започнем професионален разговор."
        description=""
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <article className="surface p-6 sm:p-8">
                <span className="eyebrow">Контактна информация</span>
                <div className="mt-6 space-y-4">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 hover:border-primary/30"
                  >
                    <Mail className="mt-1 text-primaryGlow" size={18} />
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                        Имейл
                      </p>
                      <p className="mt-1 text-white">{siteConfig.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                    className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 hover:border-primary/30"
                  >
                    <Phone className="mt-1 text-primaryGlow" size={18} />
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                        Телефон
                      </p>
                      <p className="mt-1 text-white">{siteConfig.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4">
                    <MapPin className="mt-1 text-primaryGlow" size={18} />
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                        Локация
                      </p>
                      <p className="mt-1 text-white">{siteConfig.location}</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}