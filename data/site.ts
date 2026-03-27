import {
  Bug,
  Globe,
  MessageSquare,
  Palette,
  PenTool,
  Wrench
} from "lucide-react";
import type { NavItem, SocialLink } from "@/types";

export const siteConfig = {
  name: "Георги Гушев",
  shortName: "GG",
  title:
    "GDX Studio — Дизайн, сайтове и дигитални решения с фокус върху яснота, визия и функционалност.",
  description:
    "Уеб дизайн, създаване на сайтове, бранд идентичност, визуално обновяване, поддръжка, QA manual услуги и консултации.",
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  email: "g.gushevwork@gmail.com",
  phone: "+359 888 9797 39",
  linkedin:
    "https://www.linkedin.com/in/georgi-gushev-82953417a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  facebook: "https://www.facebook.com/share/1B1Q5fxTZM/?mibextid=wwXIfr",
  instagram:
    "https://www.instagram.com/goshkataaaa?igsh=dG9pbzQ2NGc2dGZz&utm_source=qr",
  location: "Стара Загора / София, България",
  heroTagline:
    "Практичен подход, внимание към детайла и баланс между добра визия, ясна структура и работещо потребителско изживяване.",
  shortAbout:
    "Работя в пресечната точка между дизайн, дигитални решения и функционално мислене. Подхождам към проектите с внимание към детайла, визуална култура и practical mindset, за да се стига до по-чисти, по-ясни и по-професионални резултати онлайн."
};

export const navItems: NavItem[] = [
  { href: "/", label: "Начало" },
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Проекти" },
  { href: "/about", label: "За мен" },
  { href: "/contact", label: "Контакт" }
];

export const socialLinks: SocialLink[] = [
  { label: "Имейл", href: `mailto:${siteConfig.email}` },
  { label: "Телефон", href: `tel:${siteConfig.phone.replace(/\s+/g, "")}` },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "Facebook", href: siteConfig.facebook },
  { label: "Instagram", href: siteConfig.instagram }
];

export const quickFacts = [
  {
    label: "Уеб и дигитални решения",
    value: "Сайтове и редизайн",
    description:
      "Изграждане, обновяване и подобрения за по-професионално онлайн присъствие."
  },
  {
    label: "Бранд и визуална посока",
    value: "Дизайн и идентичност",
    description:
      "По-ясна визия, по-силен облик и последователна визуална комуникация."
  },
  {
    label: "QA и внимание към детайла",
    value: "Проверка и яснота",
    description:
      "Функционален и визуален преглед с фокус върху usability и качество."
  }
];

export const whatIDo = [
  {
    title: "Уеб дизайн и сайтове",
    text: "Дизайн и изграждане на представителни сайтове, portfolio сайтове, landing pages и решения за лични брандове, услуги и малки бизнеси.",
    icon: Globe
  },
  {
    title: "UI дизайн",
    text: "Екранни концепции, по-добра визуална йерархия, структура и clean интерфейси за уеб и дигитални продукти.",
    icon: PenTool
  },
  {
    title: "Бранд идентичност",
    text: "Лого посока, цветова система, типография и визуален стил за по-разпознаваем и последователен бранд.",
    icon: Palette
  },
  {
    title: "Поддръжка и обновяване",
    text: "Визуално освежаване, updates, content промени и подобрения по съществуващи сайтове и дигитални среди.",
    icon: Wrench
  },
  {
    title: "QA Manual услуги",
    text: "Ръчно тестване, user flow проверки, bug reporting, responsive check и pre-launch преглед на сайт или функционалност.",
    icon: Bug
  },
  {
    title: "Консултации и съдействие",
    text: "Помощ при планиране на сайт, структура, съдържание, визуална посока и следваща правилна стъпка за проекта.",
    icon: MessageSquare
  }
];

export const helpCases = [
  "Имаш нужда от нов сайт за услуга, бизнес или личен бранд.",
  "Сайтът ти изглежда остарял и има нужда от визуално и функционално обновяване.",
  "Искаш по-професионална визия и по-ясно онлайн представяне.",
  "Търсиш по-добра структура, по-силна визуална йерархия и по-добър user experience.",
  "Имаш нужда от QA преглед преди пускане на сайт или нова функционалност.",
  "Искаш съдействие при стартиране на нов дигитален проект."
];

export const workProcess = [
  {
    title: "Разговор и уточняване",
    text: "Изясняваме какво е нужно, каква е целта на проекта и какъв резултат трябва да се постигне."
  },
  {
    title: "Структура и посока",
    text: "Подреждаме съдържанието, визуалната линия и основата, върху която проектът ще се развие."
  },
  {
    title: "Дизайн, изработка или подобрения",
    text: "Работим по самото решение — дизайн, сайт, обновяване, визуални корекции или QA преглед."
  },
  {
    title: "Преглед и финализиране",
    text: "Минаваме през корекции, финален преглед и подготвяме по-чист, по-полезен и по-професионален краен резултат."
  }
];

export const reasonsToWork = [
  "Комбинирам дизайн и практическо дигитално мислене.",
  "Работя с внимание към малките детайли и цялостната консистентност.",
  "Подхождам с QA mindset, а не само с визуален фокус.",
  "Търся решения, които са едновременно clean, practical и usable.",
  "Държа на ясна комуникация и подреден процес.",
  "Подходящ съм за проекти, които имат нужда от визия и логика в едно."
];