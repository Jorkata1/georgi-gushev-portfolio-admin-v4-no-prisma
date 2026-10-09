export type StoryLocale = "bg" | "en";

export type StoryChapter = {
  label: string;
  title: string;
  text: string;
};

export type StoryStageCopy = {
  url: string;
  brand: string;
  nav: [string, string, string];
  heroTitle: string;
  heroText: string;
  primaryAction: string;
  secondaryAction: string;
  formTitle: string;
  loading: string;
  visitorLeft: string;
  layoutShift: string;
  gridLabel: string;
  messageLabel: string;
  actionLabel: string;
  proofLabel: string;
  colorsLabel: string;
  fontLabel: string;
  speedLabel: string;
  checklistTitle: string;
  checks: [string, string, string, string, string];
  checkDone: string;
  checkPending: string;
  chips: [string, string, string];
};

export type StoryIntroCopy = {
  lead: string;
  scrollHint: string;
};

export type StoryFinaleCopy = {
  eyebrow: string;
  title: string;
  text: string;
  viewProject: string;
  allProjects: string;
  inquiry: string;
  siteCheck: string;
  projectsLabel: string;
};

export type StoryCopy = {
  intro: StoryIntroCopy;
  finale: StoryFinaleCopy;
  sectionTitle: string;
  eyebrow: string;
  chapterNavLabel: string;
  goToChapter: string;
  viewProjects: string;
  chapters: [StoryChapter, StoryChapter, StoryChapter, StoryChapter, StoryChapter];
  stage: StoryStageCopy;
};

export const STORY_COPY: Record<StoryLocale, StoryCopy> = {
  bg: {
    intro: {
      lead: "Ето как един сайт стига от „бавен и объркан“ до „готов и бърз“, в пет стъпки.",
      scrollHint: "Скролнете, за да видите как работя"
    },
    finale: {
      eyebrow: "Избрани проекти",
      title: "Същият процес, истински проекти.",
      text: "Разгледайте какво съм направил или ми пишете за вашия сайт.",
      viewProject: "Виж проекта",
      allProjects: "Всички проекти",
      inquiry: "Изпрати запитване",
      siteCheck: "Провери сайта си безплатно",
      projectsLabel: "Избрани проекти"
    },
    sectionTitle: "Как работя",
    eyebrow: "Процесът",
    chapterNavLabel: "Глави от процеса",
    goToChapter: "Към глава",
    viewProjects: "Вижте проектите",
    chapters: [
      {
        label: "Проблемът",
        title: "Клиентите ви решават за 3 секунди.",
        text: "Бавен сайт, който подскача, докато се зарежда, губи посетителя още преди да е прочел какво предлагате."
      },
      {
        label: "Дизайнът",
        title: "Започвам от структурата, не от украсата.",
        text: "Първо подреждам какво трябва да види клиентът и в какъв ред. Цветовете и шрифтовете идват, след като пътят е ясен."
      },
      {
        label: "Изработката",
        title: "Код, който е бърз по подразбиране.",
        text: "Пиша сайта на модерни технологии, с оптимизирани снимки и само кода, който наистина е нужен. Скоростта не се добавя накрая."
      },
      {
        label: "Тестването",
        title: "Тествам всичко, преди да го видят клиентите ви.",
        text: "С опит в тестването на софтуер проверявам формуляри, мобилни екрани, достъпност и скорост. Грешките остават при мен, не при клиентите ви."
      },
      {
        label: "Резултатът",
        title: "Готов сайт, който работи навсякъде.",
        text: "Еднакво добре на телефон, таблет и компютър. Ето какво се получава, когато процесът е подреден."
      }
    ],
    stage: {
      url: "vashiat-biznes.bg",
      brand: "[Вашият бизнес]",
      nav: ["Услуги", "Цени", "Контакти"],
      heroTitle: "Ясно заглавие, което казва какво правите",
      heroText: "Кратко описание за кого е услугата и защо да изберат вас.",
      primaryAction: "Запитване",
      secondaryAction: "Вижте услугите",
      formTitle: "Формуляр за запитване",
      loading: "Зарежда се…",
      visitorLeft: "Посетителят вече затвори",
      layoutShift: "Елементите подскачат при зареждане",
      gridLabel: "Мрежа от 12 колони",
      messageLabel: "Основно послание",
      actionLabel: "Действие",
      proofLabel: "Доказателства",
      colorsLabel: "Цветове",
      fontLabel: "Шрифт",
      speedLabel: "Скорост",
      checklistTitle: "Проверка преди пускане",
      checks: ["Мобилна версия", "Контраст", "Скорост", "Формуляр", "Достъпност"],
      checkDone: "готово",
      checkPending: "проверява се",
      chips: ["Скорост 97", "Тестван", "3 екрана"]
    }
  },
  en: {
    intro: {
      lead: "Here is how a website goes from slow and confusing to finished and fast, in five steps.",
      scrollHint: "Scroll to see how I work"
    },
    finale: {
      eyebrow: "Selected work",
      title: "Same process, real projects.",
      text: "Look through what I have built, or write to me about your website.",
      viewProject: "View project",
      allProjects: "All projects",
      inquiry: "Send an inquiry",
      siteCheck: "Check your website for free",
      projectsLabel: "Selected projects"
    },
    sectionTitle: "How I work",
    eyebrow: "The process",
    chapterNavLabel: "Process chapters",
    goToChapter: "Go to chapter",
    viewProjects: "See the projects",
    chapters: [
      {
        label: "The problem",
        title: "Your clients decide in 3 seconds.",
        text: "A slow site that jumps around while loading loses visitors before they even read what you offer."
      },
      {
        label: "Design",
        title: "I start with structure, not decoration.",
        text: "First I decide what your client needs to see and in what order. Colors and fonts come once the path is clear."
      },
      {
        label: "Build",
        title: "Code that is fast by default.",
        text: "Built on modern technology, with optimized images and only the code that is actually needed. Speed is not bolted on at the end."
      },
      {
        label: "Testing",
        title: "I test everything before your clients see it.",
        text: "With a background in software testing I check forms, mobile screens, accessibility and speed. Bugs stay with me, not with your clients."
      },
      {
        label: "The result",
        title: "A finished site that works everywhere.",
        text: "Equally good on phone, tablet and desktop. This is what an organized process delivers."
      }
    ],
    stage: {
      url: "your-business.com",
      brand: "[Your business]",
      nav: ["Services", "Pricing", "Contact"],
      heroTitle: "A clear headline that says what you do",
      heroText: "A short line on who the service is for and why to choose you.",
      primaryAction: "Get a quote",
      secondaryAction: "See services",
      formTitle: "Inquiry form",
      loading: "Loading…",
      visitorLeft: "The visitor already left",
      layoutShift: "Elements jump while loading",
      gridLabel: "12-column grid",
      messageLabel: "Key message",
      actionLabel: "Action",
      proofLabel: "Proof",
      colorsLabel: "Colors",
      fontLabel: "Font",
      speedLabel: "Speed",
      checklistTitle: "Pre-launch check",
      checks: ["Mobile layout", "Contrast", "Speed", "Form", "Accessibility"],
      checkDone: "done",
      checkPending: "checking",
      chips: ["Speed 97", "Tested", "3 screens"]
    }
  }
};