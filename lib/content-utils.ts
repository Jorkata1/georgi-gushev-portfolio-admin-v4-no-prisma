import { joinLines, splitLines } from "@/lib/project-helpers";
import type { LanguageItem } from "@/types";

export function parseLanguageLines(value: string) {
  return splitLines(value)
    .map((line) => {
      const [name, ...rest] = line.split("|");
      const level = rest.join("|").trim();

      if (!name?.trim()) {
        return null;
      }

      return {
        name: name.trim(),
        level: level || "Ниво не е добавено"
      } satisfies LanguageItem;
    })
    .filter(Boolean) as LanguageItem[];
}

export function serializeLanguageLines(languages: LanguageItem[]) {
  return joinLines(languages.map((item) => `${item.name} | ${item.level}`));
}

export function serializeParagraphs(paragraphs: string[]) {
  return joinLines(paragraphs);
}
