import { createContext, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {

  const [language, setLanguage] = useState("en");

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const translations = {
    en: {
      dashboard: "Dashboard",
      settings: "Settings",
      goals: "Goals"
    },
    fa: {
      dashboard: "داشبورد",
      settings: "تنظیمات",
      goals: "هدف ها"
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}