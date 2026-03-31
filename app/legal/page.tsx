import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Правна информация",
  description:
    "Правна информация и данни за доставчика на сайта GDX Studio.",
  path: "/legal"
});

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Правна информация"
        title="Правна информация"
        description="Идентификация на доставчика и базова информация за сайта."
      />

      <section className="section-padding">
        <Container>
          <article className="surface max-w-5xl p-7 sm:p-10">
            <div className="space-y-10 text-slate-300">
              <section>
                <div className="space-y-2 text-sm">
                  <p>Администратор/доставчик: Георги Гушев / GDX Studio</p>
                  <p>Домейн: https://www.gdxstudio.com</p>
                  <p>Контакт: g.gushevwork@gmail.com • +359 888 9797 39</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  1. Данни за доставчика
                </h2>
                <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/5 p-5 text-sm">
                  <p>Име / търговско наименование: Георги Гушев / GDX Studio</p>
                  <p>Домейн: https://www.gdxstudio.com</p>
                  <p>Имейл: g.gushevwork@gmail.com</p>
                  <p>Телефон: +359 888 9797 39</p>
                  <p>Адрес за кореспонденция: Бул. Георги Димитров 26</p>
                  <p>ЕИК/Булстат: —</p>
                  <p>Физическо/юридическо лице: —</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  2. Предмет на дейност
                </h2>
                <p className="mt-4">
                  Сайтът представя услуги в сферата на уеб дизайн, създаване и
                  обновяване на сайтове, UI/UX, бранд идентичност, визуални
                  решения, поддръжка, QA manual услуги и консултации.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  3. Контакт за запитвания
                </h2>
                <ul className="mt-4 space-y-3 text-sm sm:text-base">
                  <li>• Имейл: g.gushevwork@gmail.com</li>
                  <li>• Телефон: +359 888 9797 39</li>
                  <li>• Форма за контакт: налична на https://www.gdxstudio.com/contact</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  4. Авторски права
                </h2>
                <p className="mt-4">
                  Всички права върху съдържанието на сайта, освен ако изрично не е
                  посочено друго, са запазени. Използването на текстове, графики,
                  изображения, концепции или други елементи от сайта без
                  предварително писмено съгласие не е разрешено, освен в случаите,
                  предвидени от закона.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  5. Допълнителни бележки
                </h2>
                <p className="mt-4">
                  При работа чрез регистрирано дружество следва да бъдат добавени
                  пълните фирмени данни, правната форма, ЕИК/Булстат, адресът на
                  управление и всички други задължителни реквизити, приложими за
                  дейността и модела на предоставяне на услуги.
                </p>
              </section>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}