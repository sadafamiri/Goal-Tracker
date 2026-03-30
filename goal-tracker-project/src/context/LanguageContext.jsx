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

      // dashboard page
      totalGoals: "Total Goals",
      completedGoals: "Completed Goals",
      progress: "Progress",
      overallProgress: "Overall Progress",
      newGoal: "+ New Goal",
      viewAllGoals: "View All Goals",
      activeGoals: "Active Goals",
      noActiveGoals: "No active goals",
      viewArchive: "View Archive",
      xp: "XP",
      streak: "Streak",
      days: "days",
    },
    fa: {
      dashboard: "داشبورد",
      archive: "آرشیف",
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
      totalGoals: "مجموع اهداف",

      // dashboard page
      completedGoals: "اهداف تکمیل شده",
      progress: "پیشرفت",
      overallProgress: "پیشرفت کلی",
      newGoal: "+ هدف جدید",
      viewAllGoals: "نمایش همه اهداف",
      activeGoals: "اهداف فعال",
      noActiveGoals: "هیچ هدف فعالی وجود ندارد",
      viewArchive: "مشاهده آرشیف",
      xp: "امتیاز",
      streak: "استریک",
      days: "روز",

      //  goals page
      allGoals: "همه اهداف",
      searchGoals: "جستجوی هدف...",
      all: "همه",
      createGoal: "+ ایجاد هدف جدید",

      //  categories
      viewGoals: "مشاهده اهداف",

      //  goal details
      category: "دسته‌بندی",
      type: "نوع",
      addProgress: "+ پیشرفت",
      deleteGoal: "حذف هدف",
      back: "برگشت",
      activityHistory: "تاریخچه فعالیت",
      noActivity: "هنوز فعالیتی وجود ندارد",
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
