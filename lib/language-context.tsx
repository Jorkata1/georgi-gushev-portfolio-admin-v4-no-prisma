"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

type Locale = "bg" | "en";

type LanguageContextType = {
  locale: Locale;
  isChanging: boolean;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "bg",
  isChanging: false,
  toggleLocale: () => {}
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("bg");
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "bg" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setIsChanging(true);

    setTimeout(() => {
      setLocale((prev) => {
        const next = prev === "bg" ? "en" : "bg";
        localStorage.setItem("locale", next);
        document.documentElement.lang = next;
        return next;
      });

      setTimeout(() => {
        setIsChanging(false);
      }, 150);
    }, 150);
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, isChanging, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useT() {
  const { locale } = useLanguage();
  return useCallback(
    (bg: string, en: string) => (locale === "bg" ? bg : en),
    [locale]
  );
}