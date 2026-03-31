"use client";

import {
  createContext,
  useCallback,
  useContext,
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

  const toggleLocale = useCallback(() => {
    setIsChanging(true);
    const next = locale === "bg" ? "en" : "bg";
    setTimeout(() => {
      setLocale(next);
      setTimeout(() => setIsChanging(false), 100);
    }, 150);
  }, [locale]);

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