export type JourneyLocale = "bg" | "en";

export type JourneyChapterCopy = {
  label: string;
  title: string;
  text: string;
};

/** Text painted inside the 3D scene (signs, screens, the old-site fragments). */
export type JourneySceneCopy = {
  loading: string;
  visitorLeft: string;
  underConstruction: [string, string];
  welcome: string;
  oldNav: [string, string, string, string];
  lastUpdated: string;
  visitorNumber: string;
  brokenImage: string;
  newsletter: [string, string];
  newsletterYes: string;
  newsletterNo: string;
  priceRows: Array<[string, string, string]>;
  cookies: string;
  aboutTitle: string;
  aboutLine: string;
  loadingPercent: string;
  clickHere: string;
  promo: string;
  siteBrand: string;
  siteNav: [string, string, string];
  siteCta: string;
  siteEyebrow: string;
  siteTitle: [string, string];
  siteText: string;
  siteSecondary: string;
  siteStats: Array<[string, string]>;
};

export type JourneyCopy = {
  intro: { eyebrow: string; title: string; titleAccent: string; text: string; scrollHint: string };
  /** In order: chaos, structure, code, testing, launch, projects, finale. */
  chapters: JourneyChapterCopy[];
  controls: { skip: string; restart: string; chapters: string; loading: string };
  projects: { viewProject: string; viewAll: string; listLabel: string };
  cta: { inquiry: string; projects: string; siteCheck: string };
  scene: JourneySceneCopy;
};

export const JOURNEY_COPY: Record<JourneyLocale, JourneyCopy> = {
  bg: {
    intro: {
      eyebrow: "GDX Studio · уеб дизайн и изработка",
      title: "Как се ражда",
      titleAccent: "един сайт.",
      text: "Една линия минава през стъпките, по които правя всеки проект: от хаоса на стария сайт до готовия, бърз сайт на всеки екран.",
      scrollHint: "Скролнете, за да тръгнете"
    },
    chapters: [
      { label: "Хаосът", title: "Повечето сайтове започват така.", text: "Бавни, объркани, сглобени на парче. Посетителят се губи още в първите три секунди." },
      { label: "Структурата", title: "Първо ред. После красота.", text: "Подреждам какво трябва да види клиентът и в какъв ред, върху мрежа от 12 колони." },
      { label: "Кодът", title: "Бързина, вградена в основата.", text: "Модерни технологии, оптимизирани снимки и само кодът, който наистина е нужен." },
      { label: "Тестът", title: "Всяка грешка спира тук.", text: "Формуляри, мобилни екрани, достъпност и скорост. Проверявам всичко, преди да го видят клиентите ви." },
      { label: "Пускането", title: "Един сайт. Всеки екран.", text: "Еднакво добре на телефон, таблет и компютър, от първия ден." },
      { label: "Проектите", title: "Същият път, истински проекти.", text: "Три от проектите, направени точно така. Изберете един, за да видите как е създаден." },
      { label: "GDX Studio", title: "Вашият сайт е следващата спирка.", text: "Разкажете ми за проекта си и ще ви покажа как изглежда пътят до него." }
    ],
    controls: { skip: "Пропусни до края", restart: "Отначало", chapters: "Глави", loading: "Подготвяме пътя" },
    projects: { viewProject: "Виж проекта", viewAll: "Всички проекти", listLabel: "Избрани проекти" },
    cta: { inquiry: "Изпрати запитване", projects: "Вижте проектите", siteCheck: "Провери сайта си безплатно" },
    scene: {
      loading: "Зарежда се… 4,8 s",
      visitorLeft: "Посетителят вече затвори",
      underConstruction: ["САЙТЪТ Е В ПРОЦЕС", "НА ИЗРАБОТКА!!!"],
      welcome: "Добре дошли!!!",
      oldNav: ["Начало", "За нас", "Галерия", "Контакти"],
      lastUpdated: "Последна актуализация: 12.03.2011",
      visitorNumber: "Вие сте посетител номер:",
      brokenImage: "(изображението не може да се зареди)",
      newsletter: ["Абонирайте се за", "нашия бюлетин!!!"],
      newsletterYes: "ДА!!!",
      newsletterNo: "не, благодаря",
      priceRows: [["Продукт", "Цена", ""], ["Услуга 1", "25 лв", "ПРОМО!!!"], ["Услуга 2", "", "обадете се"], ["Пакет", "??? лв", "НОВО"]],
      cookies: "Този сайт използва бисквитки. Продължавайки…",
      aboutTitle: "За нас",
      aboutLine: "Ние сме лидер в бранша с дългогодишен опит и качество",
      loadingPercent: "Зареждане… 47%",
      clickHere: "КЛИКНИ ТУК!!!",
      promo: "*** НОВО! Промоции до 31.12.2009 ***",
      siteBrand: "Вашият бизнес",
      siteNav: ["Услуги", "Цени", "Контакти"],
      siteCta: "Запитване",
      siteEyebrow: "УЕБ ДИЗАЙН · 2026",
      siteTitle: ["Сайт, който", "продава."],
      siteText: "Бърз, ясен и направен за вашите клиенти.",
      siteSecondary: "Услуги",
      siteStats: [["97", "Скорост"], ["100", "SEO"], ["0,8 s", "Зареждане"]]
    }
  },
  en: {
    intro: {
      eyebrow: "GDX Studio · web design and development",
      title: "How a website",
      titleAccent: "comes to life.",
      text: "One line runs through the steps I follow on every project: from the chaos of an old site to a finished, fast site on every screen.",
      scrollHint: "Scroll to begin"
    },
    chapters: [
      { label: "Chaos", title: "Most websites start like this.", text: "Slow, confusing, patched together. Visitors are lost within the first three seconds." },
      { label: "Structure", title: "Order first. Beauty second.", text: "I decide what your client needs to see and in what order, on a 12-column grid." },
      { label: "Code", title: "Speed built into the foundation.", text: "Modern technology, optimized images and only the code that is actually needed." },
      { label: "Testing", title: "Every bug stops here.", text: "Forms, mobile screens, accessibility and speed. I check everything before your clients see it." },
      { label: "Launch", title: "One site. Every screen.", text: "Equally good on phone, tablet and desktop, from day one." },
      { label: "Projects", title: "Same road, real projects.", text: "Three projects built exactly this way. Pick one to see how it was made." },
      { label: "GDX Studio", title: "Your website is the next stop.", text: "Tell me about your project and I will show you the road to it." }
    ],
    controls: { skip: "Skip to the end", restart: "Start over", chapters: "Chapters", loading: "Preparing the road" },
    projects: { viewProject: "View project", viewAll: "All projects", listLabel: "Selected projects" },
    cta: { inquiry: "Send an inquiry", projects: "See the projects", siteCheck: "Check your site for free" },
    scene: {
      loading: "Loading… 4.8 s",
      visitorLeft: "The visitor already left",
      underConstruction: ["THIS SITE IS", "UNDER CONSTRUCTION!!!"],
      welcome: "Welcome!!!",
      oldNav: ["Home", "About", "Gallery", "Contact"],
      lastUpdated: "Last updated: 12.03.2011",
      visitorNumber: "You are visitor number:",
      brokenImage: "(the image could not be loaded)",
      newsletter: ["Subscribe to our", "newsletter!!!"],
      newsletterYes: "YES!!!",
      newsletterNo: "no, thanks",
      priceRows: [["Product", "Price", ""], ["Service 1", "$25", "PROMO!!!"], ["Service 2", "", "call us"], ["Bundle", "$???", "NEW"]],
      cookies: "This site uses cookies. By continuing…",
      aboutTitle: "About us",
      aboutLine: "We are industry leaders with years of experience and quality",
      loadingPercent: "Loading… 47%",
      clickHere: "CLICK HERE!!!",
      promo: "*** NEW! Deals until 31.12.2009 ***",
      siteBrand: "Your business",
      siteNav: ["Services", "Pricing", "Contact"],
      siteCta: "Get a quote",
      siteEyebrow: "WEB DESIGN · 2026",
      siteTitle: ["A site that", "sells."],
      siteText: "Fast, clear and made for your clients.",
      siteSecondary: "Services",
      siteStats: [["97", "Speed"], ["100", "SEO"], ["0.8 s", "Load"]]
    }
  }
};