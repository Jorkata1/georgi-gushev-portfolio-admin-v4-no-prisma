import { Mail, MapPin, Phone, Send } from "lucide-react";
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
        description="Страницата е подготвена за директен контакт при възможности за работа, стаж, collaboration или freelance ангажименти."
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

              <article className="surface p-6 sm:p-8">
                <span className="eyebrow">Подходящо за</span>
                <ul className="mt-5 space-y-3 text-sm text-slate-300">
                  <li>• Junior / entry-level позиции в дизайн, QA или support среди.</li>
                  <li>• Freelance разговори и малки визуални или UI задачи.</li>
                  <li>• Възможности за стаж, растеж и работа по реални дигитални продукти.</li>
                </ul>

                <div className="mt-6 rounded-[1.25rem] border border-primary/20 bg-primary/10 px-4 py-4 text-sm text-primaryGlow">
                  <div className="flex items-center gap-3">
                    <Send size={16} />
                    <span>Изпращането на формата работи след конфигуриране на SMTP данните.</span>
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
