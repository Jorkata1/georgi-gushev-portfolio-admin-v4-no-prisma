import type { Project } from "@/types";
import { projectCategories } from "@/types";

export { projectCategories };

export const seedProjects: Omit<Project, "id">[] = [
  {
    slug: "pulsebank-support-flow",
    title: "PulseBank Support Flow",
    shortTitle: "PulseBank",
    excerpt:
      "UI concept за по-ясен поток при сигнализиране на проблеми в мобилно банково приложение.",
    summary:
      "Концептуален проект, насочен към по-добра видимост на потребителски затруднения, по-бърза ориентация и по-структурирана комуникация между потребител и support среда.",
    category: "UI Concepts",
    tools: ["Figma", "UX Logic", "QA Thinking"],
    year: "2025",
    featured: true,
    heroImage: "/projects/project-1.svg",
    gallery: ["/projects/project-1.svg", "/projects/project-2.svg"],
    goals: [
      "Да се създаде ясен потребителски поток при сигнализиране на проблем.",
      "Да се намали объркването при navigation и избор на тип затруднение.",
      "Да се покаже комбинация от визуално и аналитично мислене."
    ],
    process: [
      "Структуриране на user flow и подреждане на екраните по логика на реално приложение.",
      "Избор на контрастна dark UI посока с ясно диференцирани стъпки.",
      "Добавяне на states за грешка, помощ и потвърждение."
    ],
    outcome: [
      "По-ясна последователност от действия за крайния потребител.",
      "Визуално решение, което комбинира премиум усещане и продуктова дисциплина.",
      "Силен пример за дизайн с QA насоченост."
    ]
  },
  {
    slug: "solaris-system-health-dashboard",
    title: "Solaris System Health Dashboard",
    shortTitle: "Solaris Dashboard",
    excerpt:
      "Dashboard concept за наблюдение на системна стабилност, статуси и отчетност.",
    summary:
      "Концепция за интерфейс, който обединява наблюдение на системни показатели, бърза ориентация при отклонения и визуална яснота за екипи по поддръжка и анализ.",
    category: "UI Concepts",
    tools: ["Figma", "Data Thinking", "System Monitoring"],
    year: "2024",
    featured: true,
    heroImage: "/projects/project-2.svg",
    gallery: ["/projects/project-2.svg", "/projects/project-3.svg"],
    goals: [
      "Да се представят ключови системни показатели по ясен начин.",
      "Да се даде приоритет на отклонения, аларми и отчетност.",
      "Да се покаже разбиране за продуктови и системни екрани."
    ],
    process: [
      "Организиране на информационна архитектура за dashboard среда.",
      "Избор на визуален език със силен контраст и премиум data cards.",
      "Изграждане на структура за trend cards, alerts и system logs."
    ],
    outcome: [
      "Визуално чист интерфейс с добър hierarchy за данни.",
      "Практична структура за по-късна реална имплементация.",
      "Подходящ пример за връзката между техническо мислене и дизайн."
    ]
  },
  {
    slug: "nova-brand-identity",
    title: "Nova Brand Identity",
    shortTitle: "Nova Identity",
    excerpt:
      "Концептуална бранд идентичност за модерен дигитален продукт с clean premium стил.",
    summary:
      "Branding проект, който изследва типография, форма, цвят и визуална система за по-силно и консистентно бранд присъствие.",
    category: "Branding",
    tools: ["Adobe Illustrator", "Photoshop", "Brand System"],
    year: "2024",
    heroImage: "/projects/project-3.svg",
    gallery: ["/projects/project-3.svg", "/projects/project-4.svg"],
    goals: [
      "Да се създаде ясна и разпознаваема бранд система.",
      "Да се изгради премиум усещане чрез минимализъм и детайл.",
      "Да се развие силна композиция за дигитални и статични носители."
    ],
    process: [
      "Работа върху символ, wordmark и цветови акценти.",
      "Подбор на композиционни правила и application примери.",
      "Тестове за адаптация в различни визуални контексти."
    ],
    outcome: [
      "Последователно визуално присъствие и силна идентичност.",
      "Готовност за използване в презентации, web и social assets.",
      "Добър showcase проект за бранд мислене."
    ]
  },
  {
    slug: "qa-task-companion",
    title: "QA Task Companion",
    shortTitle: "QA Companion",
    excerpt:
      "Practice проект за проследяване на QA задачи, статути и notes с clean интерфейсна логика.",
    summary:
      "Практически проект, който показва как могат да се структурират задачите, bug report notes и статуси в интерфейс, ориентиран към яснота и контрол.",
    category: "Practice Projects",
    tools: ["Figma", "Jira Logic", "HTML"],
    year: "2025",
    heroImage: "/projects/project-4.svg",
    gallery: ["/projects/project-4.svg", "/projects/project-1.svg"],
    goals: [
      "Да се организира работен интерфейс за QA-oriented процес.",
      "Да се съчетаят status logic, notes и простота на работа.",
      "Да се представи практически проект с ясна полезност."
    ],
    process: [
      "Картографиране на основните status states и task interactions.",
      "Избор на card-based layout с ясни приоритети.",
      "Фокус върху компактна, лесна за сканиране информация."
    ],
    outcome: [
      "Показва системно мислене и фокус върху детайлите.",
      "Подходящ проект за комбиниране на интерфейсна логика и QA mindset.",
      "Готова основа за бъдещо case study представяне."
    ]
  }
];
