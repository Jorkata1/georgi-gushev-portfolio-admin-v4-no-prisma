import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Design tools",
    description: "Инструменти за визуални концепции, графична обработка и интерфейсни идеи.",
    items: ["Figma", "Adobe Photoshop", "Adobe Illustrator"]
  },
  {
    title: "Technical / QA tools",
    description: "Инструменти и технологии за структурирана работа, тест мислене и поддръжка.",
    items: ["HTML", "Python", "Jira", "VirtualBox"]
  },
  {
    title: "Soft skills",
    description: "Качества, които правят работата последователна, внимателна и ориентирана към качество.",
    items: [
      "Аналитично мислене",
      "Логическо мислене",
      "Критично мислене",
      "Комуникативност",
      "Адаптивност",
      "Любопитство",
      "Желание за развитие",
      "Research mindset",
      "Внимание към детайла"
    ]
  }
];
