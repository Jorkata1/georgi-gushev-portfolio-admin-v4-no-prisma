/**
 * All words of the homepage layers story, in both site languages.
 * Headings are split into plain and accent (italic gold) parts.
 */

export type LayersLocale = "bg" | "en";

export type LayersHeading = { plain: string; accent: string };

export type LayersStepCopy = {
  number: string;
  label: string;
  heading: LayersHeading;
  lead: string;
  proof?: readonly [string, string, string];
};

export type LayersMetricCopy = {
  label: string;
  /** "from:to" or "from:to:decimals" for the animated counter */
  count: string;
  start: string;
  unit: string;
  was: string;
};

export type LayersCopy = {
  ariaLabel: string;
  railLabel: string;
  decimalSeparator: string;
  /** Characters the eyebrow labels decode from */
  glyphs: string;
  intro: { eyebrowBrand: string; eyebrow: string; heading: LayersHeading; lead: string; hint: string };
  steps: readonly [LayersStepCopy, LayersStepCopy, LayersStepCopy, LayersStepCopy, LayersStepCopy];
  metrics: readonly [LayersMetricCopy, LayersMetricCopy, LayersMetricCopy];
  wasLabel: string;
  metricsNote: string;
  finale: { eyebrowBrand: string; eyebrow: string; heading: LayersHeading; lead: string; primary: string; secondary: string };
  plates: {
    tags: readonly [string, string, string, string, string];
    brand: string;
    nav: string;
    navCta: string;
    headlinePlain: string;
    headlineAccent: string;
    body: string;
    cta: string;
    cards: readonly [string, string, string];
    textSpec: string;
    codeHeadline: string;
    codeButton: string;
    speedRows: readonly [string, string, string, string, string, string];
    speedValues: readonly [string, string, string, string, string, string];
  };
};

export const LAYERS_COPY: Record<LayersLocale, LayersCopy> = {
  bg: {
    ariaLabel: "Как се строи сайт",
    railLabel: "Стъпки",
    decimalSeparator: ",",
    glyphs: "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЮЯ0123456789#/<>_",
    intro: {
      eyebrowBrand: "GDX STUDIO",
      eyebrow: "Уеб дизайн и изработка",
      heading: { plain: "Всеки сайт има ", accent: "слоеве." },
      lead: "Посетителите виждат само повърхността. Ето какво има под нея и защо точно то ги кара да ви пишат.",
      hint: "СКРОЛНЕТЕ ↓",
    },
    steps: [
      {
        number: "01",
        label: "Думи",
        heading: { plain: "Казва го ", accent: "от първия ред." },
        lead: "За три секунди посетителят разбира какво предлагате и защо точно вие. Без да чете романи.",
        proof: ["ясно заглавие", "кратки абзаци", "чете се и на телефон"],
      },
      {
        number: "02",
        label: "Визия",
        heading: { plain: "Красиво, ", accent: "но с цел." },
        lead: "Цветовете на вашия бранд, а погледът сам стига до бутона за поръчка.",
        proof: ["вашите цветове", "лесно за четене", "леки снимки"],
      },
      {
        number: "03",
        label: "Подредба",
        heading: { plain: "Всичко ", accent: "на мястото си." },
        lead: "Като добре подредена витрина: посетителят знае къде да гледа и какво да натисне.",
        proof: ["ясен ред", "едно главно действие", "нищо излишно"],
      },
      {
        number: "04",
        label: "Основа",
        heading: { plain: "Работи. ", accent: "Навсякъде." },
        lead: "На всеки телефон и компютър. Google го разбира, а вие не мислите за техника.",
        proof: ["телефон и компютър", "намира се в Google", "удобно за всеки"],
      },
      {
        number: "05",
        label: "Скорост",
        heading: { plain: "Отваря се, ", accent: "преди да се откажат." },
        lead: "Всяка секунда чакане гони клиенти. Затова скоростта я мерим, не я обещаваме.",
      },
    ],
    metrics: [
      { label: "Оценка от Google", count: "42:100", start: "42", unit: " / 100", was: "42" },
      { label: "Зареждане", count: "4.8:0.8:1", start: "4,8", unit: " s", was: "4,8 s" },
      { label: "Тегло", count: "3200:410", start: "3200", unit: " KB", was: "3,2 MB" },
    ],
    wasLabel: "беше",
    metricsNote: "ПРИМЕРНИ ЧИСЛА ОТ ПРЕРАБОТЕН САЙТ",
    finale: {
      eyebrowBrand: "GDX STUDIO",
      eyebrow: "Готово",
      heading: { plain: "Пет слоя. ", accent: "Един сайт." },
      lead: "Разкажете ми за бизнеса си. До 24 часа ще имате отговор и първи идеи.",
      primary: "Изпрати запитване →",
      secondary: "Провери сайта си",
    },
    plates: {
      tags: ["ДУМИ", "ВИЗИЯ", "ПОДРЕДБА", "ОСНОВА", "СКОРОСТ"],
      brand: "Вашият бизнес",
      nav: "Услуги Цени Контакти",
      navCta: "Запитване",
      headlinePlain: "Сайт, който ",
      headlineAccent: "продава.",
      body: "Бърз, ясен и направен за вашите клиенти. На всеки екран.",
      cta: "Запитване →",
      cards: ["Скорост · 97", "SEO · 100", "Зареждане · 0,8 s"],
      textSpec: "ТЕКСТ · 16 px",
      codeHeadline: "Сайт, който продава.",
      codeButton: "Запитване",
      speedRows: ["Сървър", "Снимки", "Код", "Второ посещение", "Първи екран", "Оценка"],
      speedValues: ["24 ms", "−82%", "96 KB", "мигновено", "0,8 s", "100"],
    },
  },
  en: {
    ariaLabel: "How a website is built",
    railLabel: "Steps",
    decimalSeparator: ".",
    glyphs: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>_",
    intro: {
      eyebrowBrand: "GDX STUDIO",
      eyebrow: "Web design & development",
      heading: { plain: "Every website has ", accent: "layers." },
      lead: "Visitors only see the surface. Here is what lies beneath it, and why it is what makes them get in touch.",
      hint: "SCROLL ↓",
    },
    steps: [
      {
        number: "01",
        label: "Words",
        heading: { plain: "Says it ", accent: "from the first line." },
        lead: "In three seconds a visitor knows what you offer and why you. No novels to read.",
        proof: ["clear headline", "short paragraphs", "easy on a phone"],
      },
      {
        number: "02",
        label: "Visual",
        heading: { plain: "Beautiful, ", accent: "with a purpose." },
        lead: "Your brand's colours, and the eye finds its own way to the order button.",
        proof: ["your colours", "easy to read", "light images"],
      },
      {
        number: "03",
        label: "Layout",
        heading: { plain: "Everything ", accent: "in its place." },
        lead: "Like a well-arranged shop window: visitors know where to look and what to tap.",
        proof: ["clear order", "one main action", "nothing extra"],
      },
      {
        number: "04",
        label: "Foundation",
        heading: { plain: "It works. ", accent: "Everywhere." },
        lead: "On every phone and computer. Google understands it, and you never have to think about the tech.",
        proof: ["phone and desktop", "found on Google", "easy for everyone"],
      },
      {
        number: "05",
        label: "Speed",
        heading: { plain: "Opens ", accent: "before they give up." },
        lead: "Every second of waiting drives customers away. So we measure speed instead of promising it.",
      },
    ],
    metrics: [
      { label: "Google score", count: "42:100", start: "42", unit: " / 100", was: "42" },
      { label: "Load time", count: "4.8:0.8:1", start: "4.8", unit: " s", was: "4.8 s" },
      { label: "Page weight", count: "3200:410", start: "3200", unit: " KB", was: "3.2 MB" },
    ],
    wasLabel: "was",
    metricsNote: "SAMPLE FIGURES FROM A REBUILT SITE",
    finale: {
      eyebrowBrand: "GDX STUDIO",
      eyebrow: "Done",
      heading: { plain: "Five layers. ", accent: "One website." },
      lead: "Tell me about your business. Within 24 hours you will have a reply with first ideas.",
      primary: "Send an inquiry →",
      secondary: "Check your site",
    },
    plates: {
      tags: ["WORDS", "VISUAL", "LAYOUT", "FOUNDATION", "SPEED"],
      brand: "Your business",
      nav: "Services Pricing Contact",
      navCta: "Get a quote",
      headlinePlain: "A website that ",
      headlineAccent: "sells.",
      body: "Fast, clear and built for your customers. On every screen.",
      cta: "Get a quote →",
      cards: ["Speed · 97", "SEO · 100", "Load · 0.8 s"],
      textSpec: "TEXT · 16 px",
      codeHeadline: "A website that sells.",
      codeButton: "Get a quote",
      speedRows: ["Server", "Images", "Code", "Repeat visit", "First screen", "Score"],
      speedValues: ["24 ms", "−82%", "96 KB", "instant", "0.8 s", "100"],
    },
  },
};

export function getLayersCopy(locale: string): LayersCopy {
  return locale === "en" ? LAYERS_COPY.en : LAYERS_COPY.bg;
}