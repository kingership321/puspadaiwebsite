"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, getDictionary } from "./i18n";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (typeof translations)["en"];
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ja",
  setLang: () => {},
  toggleLang: () => {},
  t: translations.ja,
});

export function LanguageProvider({
  children,
  initialLang = "ja",
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLangState] = useState<Language>(initialLang);

  useEffect(() => {
    // Read cookie or local storage
    const match = document.cookie.match(new RegExp("(^| )haven_lang=([^;]+)"));
    if (match && (match[2] === "en" || match[2] === "ja")) {
      setLangState(match[2] as Language);
    } else {
      const saved = localStorage.getItem("haven_lang");
      if (saved === "en" || saved === "ja") {
        setLangState(saved);
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.cookie = `haven_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem("haven_lang", newLang);
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const toggleLang = () => {
    const next = lang === "ja" ? "en" : "ja";
    setLang(next);
  };

  const t = getDictionary(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
