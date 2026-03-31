import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Общи условия",
  description:
    "Общи условия за използване на сайта и за изпращане на запитвания за услуги към GDX Studio.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Правна информация"
        title="Общи условия"
        description="Условия за използване на сайта, разглеждане на съдържанието и изпращане на запитвания за услуги."
      />

      <section className="section-padding">
        <Container>
          <article className="surface max-w-5xl p-7 sm:p-10">
            <div className="space-y-10 text-slate-300">
              <section>
                <p className="text-sm text-slate-400">
                  За използване на сайта и за изпращане на запитвания за услуги
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <p>Администратор/доставчик: Георги Гушев / GDX Studio</p>
                  <p>Домейн: https://www.gdxstudio.com</p>
                  <p>Контакт: g.gushevwork@gmail.com • +359 888 9797 39</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  1. Общи положения
                </h2>
                <p className="mt-4">
                  Настоящите Общи условия уреждат ползването на сайта
                  https://www.gdxstudio.com и отношенията между Георги Гушев /
                  GDX Studio и лицата, които посещават сайта, разглеждат
                  публикувано съдържание или изпращат запитвания чрез контактните форми.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  2. Данни за доставчика
                </h2>
                <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/5 p-5 text-sm">
                  <p>Наименование: Георги Гушев / GDX Studio</p>
                  <p>Домейн: https://www.gdxstudio.com</p>
                  <p>Имейл: g.gushevwork@gmail.com</p>
                  <p>Телефон: +359 888 9797 39</p>
                  <p>Адрес за кореспонденция: Бул. Георги Димитров 26</p>
                  <p>ЕИК/Булстат: —</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  3. Предмет на сайта
                </h2>
                <p className="mt-4">
                  Сайтът представя информация за предлагани услуги, проекти,
                  визуални материали, професионален профил и възможности за
                  контакт и запитване. Информацията има общ и представителен
                  характер, освен ако изрично не е посочено друго.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  4. Запитвания и услуги
                </h2>
                <ul className="mt-4 space-y-3 text-sm sm:text-base">
                  <li>• Изпращането на запитване чрез сайта не създава автоматично договорни отношения.</li>
                  <li>
                    • Конкретните услуги, срокове, цена, обхват, ревизии, достъпи и условия за изпълнение се договарят индивидуално.
                  </li>
                  <li>
                    • Публикуваната информация не представлява задължителна оферта, освен ако изрично не е посочено друго.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  5. Допустимо ползване
                </h2>
                <ul className="mt-4 space-y-3 text-sm sm:text-base">
                  <li>• Посетителят не следва да използва сайта за незаконни цели.</li>
                  <li>
                    • Не е позволен опит за неоторизиран достъп, нарушаване на сигурността или въвеждане на зловреден код.
                  </li>
                  <li>
                    • Не е допустимо изпращане на подвеждащо, обидно, неправомерно или спам съдържание чрез формите за контакт.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  6. Интелектуална собственост
                </h2>
                <p className="mt-4">
                  Всички текстове, изображения, графики, елементи на дизайна,
                  проекти и съдържание на сайта, освен ако не е посочено друго,
                  са обект на закрила по приложимото право. Копиране,
                  възпроизвеждане, използване или разпространяване без
                  предварително писмено съгласие не е разрешено, освен в случаите,
                  предвидени от закона.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  7. Ограничение на отговорността
                </h2>
                <ul className="mt-4 space-y-3 text-sm sm:text-base">
                  <li>
                    • Полагат се разумни усилия информацията в сайта да бъде актуална и коректна, но не се гарантира, че е изчерпателна или непрекъснато актуална.
                  </li>
                  <li>
                    • Не се носи отговорност за вреди, причинени от временно недостъпен сайт, външни услуги, технически неизправности, хостинг проблеми или действия на трети лица извън разумния контрол.
                  </li>
                  <li>
                    • Външните линкове към трети сайтове и социални мрежи се ползват на отговорност на посетителя.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  8. Лични данни и бисквитки
                </h2>
                <p className="mt-4">
                  Обработването на лични данни се извършва съгласно публикуваната
                  Политика за поверителност, а използването на бисквитки —
                  съгласно публикуваната Политика за бисквитки.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  9. Приложимо право
                </h2>
                <p className="mt-4">
                  За всички неуредени въпроси се прилага действащото право на
                  Република България и приложимото право на Европейския съюз.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  10. Промени
                </h2>
                <p className="mt-4">
                  Общите условия могат да бъдат актуализирани при промяна на
                  съдържанието на сайта, на предлаганите услуги или на законовите
                  изисквания. Актуалната версия се публикува на сайта.
                </p>
              </section>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}