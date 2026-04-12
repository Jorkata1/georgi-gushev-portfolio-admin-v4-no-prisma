import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Политика за бисквитки",
  description:
    "Политика за бисквитки на GDX Studio относно използването на технически, аналитични и маркетингови бисквитки.",
  path: "/cookie-policy"
});

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Правна информация"
        title="Политика за бисквитки"
        description="Информация относно видовете бисквитки, които сайтът може да използва, и начина, по който се управляват."
      />

      <section className="section-padding">
        <Container>
          <article className="surface max-w-5xl p-7 sm:p-10">
            <div className="space-y-10 text-slate-300">
              <section>
                <p className="text-sm text-slate-400">
                  За сайт, предлагащ услуги и използващ форма за контакт
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <p>Администратор/доставчик: Георги Гушев / GDX Studio</p>
                  <p>Домейн: https://www.gdxstudio.com</p>
                  <p>Контакт: g.gushevwork@gmail.com • +359 888 9797 39</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  1. Какво представляват бисквитките
                </h2>
                <p className="mt-4">
                  Бисквитките са малки текстови файлове, които се съхраняват на
                  устройството на посетителя при използване на уебсайт. Те
                  подпомагат основната работа на сайта, сигурността, запомнянето
                  на определени настройки и — при наличие на съответни инструменти —
                  анализа на трафика и поведението в сайта.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  2. Какви категории бисквитки могат да се използват
                </h2>

                <div className="mt-6 space-y-6">
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
                    <h3 className="text-lg font-semibold text-white">
                      2.1 Строго необходими бисквитки
                    </h3>
                    <p className="mt-3">
                      Тези бисквитки са необходими за основното функциониране на
                      сайта, сигурността, навигацията и техническата работа на
                      отделни елементи. Те не изискват предварително съгласие.
                    </p>
                  </div>

                  <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
                    <h3 className="text-lg font-semibold text-white">
                      2.2 Аналитични бисквитки
                    </h3>
                    <p className="mt-3">
                      Аналитичните бисквитки помагат да се разбере как се използва
                      сайтът, за да бъде подобряван. Те се активират само ако
                      посетителят е дал съгласие, когато това се изисква от закона.
                    </p>
                  </div>

                  <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
                    <h3 className="text-lg font-semibold text-white">
                      2.3 Маркетингови и tracking бисквитки
                    </h3>
                    <p className="mt-3">
                      Ако се използват рекламни, ремаркетинг или tracking
                      инструменти, такива бисквитки се поставят само след изрично
                      съгласие на посетителя.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  3. Какво използва сайтът към момента
                </h2>
                <div className="mt-4 space-y-4">
                  <p>
                    Към момента сайтът може да използва технически необходими
                    бисквитки за основно функциониране и сигурност.
                  </p>
                  <p>
                    Ако бъдат добавени аналитични или маркетингови инструменти
                    (например Google Analytics, Meta Pixel, Hotjar, Microsoft Clarity
                    и други), това следва да бъде отразено в настоящата политика,
                    а съответните скриптове следва да се активират само след валидно
                    съгласие.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  4. Управление на бисквитките
                </h2>
                <p className="mt-4">
                  Посетителят може да управлява, ограничава или изтрива
                  бисквитките чрез настройките на използвания браузър. Блокирането
                  на строго необходимите бисквитки може да доведе до некоректна
                  работа на части от сайта.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  5. Бисквитки на трети страни
                </h2>
                <p className="mt-4">
                  Когато в сайта са интегрирани външни услуги, вградени елементи
                  или социални мрежи, е възможно съответните доставчици да
                  използват свои бисквитки или сходни технологии съгласно
                  собствените си политики.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  6. Съгласие и банер за бисквитки
                </h2>
                <p className="mt-4">
                  Ако сайтът използва само технически необходими бисквитки, банер
                  за съгласие не е необходим. Ако се използват аналитични,
                  маркетингови или други non-essential бисквитки, преди поставянето
                  им трябва да се показва механизъм за избор и съгласие.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  7. Промени
                </h2>
                <p className="mt-4">
                  Настоящата политика може да бъде актуализирана при промяна на
                  използваните бисквитки, доставчици или правни изисквания.
                  Актуалната версия се публикува на сайта.
                </p>
              </section>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}