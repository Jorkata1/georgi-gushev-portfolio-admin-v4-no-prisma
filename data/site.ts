import { FolderOpen, Mail, Phone, UserRound } from "lucide-react";
import type { NavItem, SocialLink } from "@/types";

export const siteConfig = {
  name: "Георги Гушев",
  shortName: "GG",
  title: "Георги Гушев — Graphic Design / Digital Applications / QA-Oriented Professional",
  description:
    "Премиум personal brand portfolio сайт за Георги Гушев — графичен дизайн, дигитални приложения, QA мислене и техническа дисциплина.",
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  email: "g.gushevwork@gmail.com",
  phone: "+359 888 9797 39",
  linkedin: "#",
  location: "Стара Загора / София, България",
  heroTagline: "Graphic Design / Digital Applications / QA-Oriented Professional"
};

export const navItems: NavItem[] = [
  { href: "/", label: "Начало" },
  { href: "/about", label: "За мен" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/experience", label: "Опит" },
  { href: "/education", label: "Образование" },
  { href: "/contact", label: "Контакт" }
];

export const socialLinks: SocialLink[] = [
  { label: "Имейл", href: `mailto:${siteConfig.email}` },
  { label: "Телефон", href: `tel:${siteConfig.phone.replace(/\s+/g, "")}` },
  { label: "LinkedIn", href: siteConfig.linkedin }
];

export const quickFacts = [
  {
    label: "Дизайн + технология",
    value: "Хибриден профил",
    description: "Комбинация от визуално мислене, системност и QA логика."
  },
  {
    label: "Професионален опит",
    value: "2+ роли",
    description: "Работа в банкова среда и софтуерна/техническа поддръжка."
  },
  {
    label: "Фокус",
    value: "Детайл и качество",
    description: "Силен усет към консистентност, проверка и ясна структура."
  }
];

export const whatIDo = [
  {
    title: "Графичен дизайн",
    text: "Визуални концепции, композиция, бранд присъствие и чисто професионално изпълнение.",
    icon: UserRound
  },
  {
    title: "Дигитални приложения",
    text: "Подкрепа на потребители, разбиране на продуктови потоци и работа с реални дигитални среди.",
    icon: FolderOpen
  },
  {
    title: "QA мислене",
    text: "Наблюдение на детайли, докладване на проблеми и мислене за функционалност и надеждност.",
    icon: Mail
  },
  {
    title: "Техническа поддръжка",
    text: "Системна проверка, стабилност, документация и комуникация при проблеми и подобрения.",
    icon: Phone
  }
];

export const futureServices = [
  {
    title: "Дигитални продукти",
    description: "Подготвена основа за бъдещи UI шаблони, assets и downloadable ресурси."
  },
  {
    title: "Мини case studies",
    description: "Структура за по-дълбоко представяне на процес, решения и визуални резултати."
  },
  {
    title: "Freelance услуги",
    description: "Възможност за добавяне на услуги в сфери като дизайн, поддръжка и QA support."
  }
];
