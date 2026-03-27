import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/site-metadata";
import { siteConfig } from "@/data/site";

export const metadata = createMetadata({
  title: "Контакт",
  description:
    "Изпрати запитване за сайт, дизайн, визуално обновяване, QA преглед или консултация за дигитален проект.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакт"
        title="Изпрати запитване за сайт, дизайн, обновяване или дигитално решение."
        description="Разкажи ми накратко от какво имаш нужда — нов сайт, редизайн, бранд визия, визуално подобрение, QA преглед или консултация."
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <article className="surface p-6 sm:p-8">
                <span className="eyebrow">Запитване</span>
                <h2 className="mt-4 text-2xl font-semibold leading-tight text-white">
                  Подходящо за нови сайтове, визуално обновяване, поддръжка и
                  QA-oriented подобрения
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  Можеш да се свържеш с мен за нови проекти, подобрения по
                  съществуващи сайтове, визуално обновяване, manual QA услуги или
                  съдействие при стартиране на дигитален проект.
                </p>
              </article>

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

            <div className="space-y-6 self-start">
              <ContactForm />

              <article className="surface p-6 sm:p-8">
                <span className="eyebrow">Какво можеш да изпратиш</span>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <p>• Какъв тип проект имаш</p>
                  <p>• Нов сайт, редизайн или подобрение</p>
                  <p>• Бранд, UI или визуално обновяване</p>
                  <p>• QA преглед или pre-launch проверка</p>
                  <p>• Нужда от консултация и насока</p>
                </div>
              </article>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}