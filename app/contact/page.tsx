"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";

export default function ContactPage() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const c = t.contactPage;

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        description={c.description}
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <article className="surface p-6 sm:p-8">
                <span className="eyebrow">{c.inquiryEyebrow}</span>
                <h2 className="mt-4 text-2xl font-semibold leading-tight text-white">
                  {c.inquiryTitle}
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  {c.inquiryDescription}
                </p>
              </article>

              <article className="surface p-6 sm:p-8">
                <span className="eyebrow">{c.contactInfo}</span>
                <div className="mt-6 space-y-4">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 hover:border-primary/30"
                  >
                    <Mail className="mt-1 text-primaryGlow" size={18} />
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                        {c.email}
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
                        {c.phone}
                      </p>
                      <p className="mt-1 text-white">{siteConfig.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4">
                    <MapPin className="mt-1 text-primaryGlow" size={18} />
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                        {c.locationLabel}
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
                <span className="eyebrow">{c.whatToSend}</span>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  {c.whatToSendItems.map((item) => (
                    <p key={item}>• {item}</p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}