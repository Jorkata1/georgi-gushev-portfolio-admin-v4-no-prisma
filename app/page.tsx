import { HomeHero } from "@/components/home/home-hero";
import { HomeSections } from "@/components/home/home-sections";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Начало",
  description:
    "Уеб дизайн, създаване на сайтове, бранд идентичност, визуално обновяване, поддръжка, QA manual услуги и консултации.",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeSections />
    </>
  );
}