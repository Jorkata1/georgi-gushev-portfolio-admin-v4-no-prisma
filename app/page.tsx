import { HomeHero } from "@/components/home/home-hero";
import { HomeSections } from "@/components/home/home-sections";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Начало",
  description:
    "Premium personal brand portfolio на Георги Гушев — графичен дизайн, дигитални приложения, QA мислене и техническа дисциплина.",
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
