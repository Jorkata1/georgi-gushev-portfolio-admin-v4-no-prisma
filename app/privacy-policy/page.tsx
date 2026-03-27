import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Политика за поверителност",
  description:
    "Политика за поверителност на GDX Studio относно обработването на лични данни чрез сайта и формата за контакт.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Правна информация"
        title="Политика за поверителност"
        description="Информация относно обработването на лични данни при използване на сайта и формата за контакт."
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
                  1. Кой обработва личните данни
                </h2>
                <div className="mt-4 space-y-3">
                  <p>
                    Администратор на лични данни по смисъла на приложимото
                    законодателство е Георги Гушев / GDX Studio, свързан със
                    сайта https://www.gdxstudio.com.
                  </p>
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5 text-sm">
                    <p>Администратор: Георги Гушев / GDX Studio</p>
                    <p>Домейн: https://www.gdxstudio.com</p>
                    <p>Имейл: g.gushevwork@gmail.com</p>
                    <p>Телефон: +359 888 9797 39</p>
                    <p>Адрес за кореспонденция: Бул. Георги Димитров 26</p>
                    <p>ЕИК/Булстат: —</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  2. Какви лични данни се събират
                </h2>
                <ul className="mt-4 space-y-3 text-sm sm:text-base">
                  <li>• име и имейл адрес, предоставени чрез формата за контакт;</li>
                  <li>• телефонен номер, ако доброволно бъде предоставен от посетителя;</li>
                  <li>
                    • съдържание на съобщения, запитвания и приложена от посетителя информация;
                  </li>
                  <li>
                    • технически данни, свързани със сигурността и работата на сайта,
                    като IP адрес, дата, час и логове на заявките.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  3. Цели на обработването
                </h2>
                <ul className="mt-4 space-y-3 text-sm sm:text-base">
                  <li>• отговор на изпратени запитвания и последваща комуникация;</li>
                  <li>• подготовка на оферта, обсъждане на услуги, проект или сътрудничество;</li>
                  <li>• поддръжка и сигурност на сайта;</li>
                  <li>
                    • предотвратяване на злоупотреба, неоторизиран достъп или технически проблеми;
                  </li>
                  <li>• изпълнение на приложими законови задължения.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  4. Правно основание
                </h2>
                <ul className="mt-4 space-y-3 text-sm sm:text-base">
                  <li>
                    • преддоговорни действия — когато посетителят изпраща запитване за услуга или проект;
                  </li>
                  <li>
                    • легитимен интерес — за сигурност на сайта, водене на технически логове и защита при злоупотреба;
                  </li>
                  <li>
                    • законово задължение — когато законът изисква съхранение или предоставяне на определени данни;
                  </li>
                  <li>
                    • съгласие — когато е необходимо, например при определени бисквитки или tracking инструменти.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  5. Срок на съхранение
                </h2>
                <p className="mt-4">
                  Личните данни се съхраняват само за срок, необходим за целите,
                  за които са събрани, освен ако закон не изисква по-дълъг срок.
                </p>
                <ul className="mt-4 space-y-3 text-sm sm:text-base">
                  <li>
                    • данни от контактната форма — до приключване на комуникацията и за разумен период след това при необходимост от проследяване;
                  </li>
                  <li>
                    • технически логове — за разумен срок с цел сигурност, диагностика и защита на сайта;
                  </li>
                  <li>
                    • данни, необходими за счетоводни или правни цели — за сроковете, изисквани от закона.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  6. Получатели на данните
                </h2>
                <ul className="mt-4 space-y-3 text-sm sm:text-base">
                  <li>• доставчици на хостинг, инфраструктура, база данни или имейл услуги;</li>
                  <li>
                    • технически подизпълнители само доколкото това е необходимо за поддръжка на сайта или комуникацията;
                  </li>
                  <li>• компетентни органи, когато това се изисква по закон.</li>
                </ul>
                <p className="mt-4">Личните данни не се продават на трети лица.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  7. Международни трансфери
                </h2>
                <p className="mt-4">
                  Когато се използват доставчици, които съхраняват или обработват данни
                  извън Европейския съюз/ЕИП, това се извършва при наличие на приложими
                  гаранции съгласно действащото законодателство.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  8. Права на субектите на данни
                </h2>
                <ul className="mt-4 space-y-3 text-sm sm:text-base">
                  <li>• право на достъп до личните данни;</li>
                  <li>• право на коригиране на неточни данни;</li>
                  <li>• право на изтриване, когато това е приложимо;</li>
                  <li>• право на ограничаване на обработването;</li>
                  <li>• право на възражение срещу обработването в предвидените от закона случаи;</li>
                  <li>• право на преносимост на данните, когато е приложимо;</li>
                  <li>• право на оттегляне на съгласие, когато обработването се основава на съгласие.</li>
                </ul>
                <p className="mt-4">
                  За упражняване на правата си посетителят може да се свърже на:
                  {" "}g.gushevwork@gmail.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  9. Жалби и сигурност
                </h2>
                <p className="mt-4">
                  Лицето има право да подаде жалба до компетентния надзорен орган
                  по защита на личните данни. Прилагат се разумни технически и
                  организационни мерки за защита на данните от неразрешен достъп,
                  загуба, унищожаване или неправомерно разкриване.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white">
                  10. Промени
                </h2>
                <p className="mt-4">
                  Настоящата политика може да бъде актуализирана при промяна на
                  законовите изисквания, на използваните услуги или на начина на
                  обработване. Актуалната версия се публикува на сайта.
                </p>
              </section>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}