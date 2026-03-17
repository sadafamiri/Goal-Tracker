import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    const dir = language === "fa" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const changeLanguage = (lang) => setLanguage(lang);

  const translations = {
    en: {
      dashboard: "Dashboard",
      goals: "Goals",
      categories: "Categories",
      settings: "Settings",
      theme: "Theme",
      currentTheme: "Current Theme",
      toggleTheme: "Toggle Theme",
      light: "Light",
      dark: "Dark",
      language: "Language",
      english: "English",
      persian: "Persian",
    },
    fa: {
      dashboard: "داشبورد",
      goals: "اهداف",
      categories: "دسته‌بندی‌ها",
      settings: "تنظیمات",
      theme: "تم",
      currentTheme: "تم فعلی",
      toggleTheme: "تغییر تم",
      light: "روشن",
      dark: "تاریک",
      language: "زبان",
      english: "انگلیسی",
      persian: "فارسی",
    },
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t: (key) => translations[language][key] ?? key,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
