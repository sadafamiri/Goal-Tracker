import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);

    const dir = language === "fa" || language === "ps" ? "rtl" : "ltr";

    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const changeLanguage = (lang) => setLanguage(lang);

  const translations = {
    // 🇺🇸 English
    en: {
      //navbar
      goalTracker: "Goal Tracker",
      dashboard: "Dashboard",
      goals: "Goals",
      categories: "Categories",
      settings: "Settings",
      archive: "Archive",
      //settings
      theme: "Theme",
      currentTheme: "Current Theme",
      toggleTheme: "Toggle Theme",
      light: "Light",
      dark: "Dark",
      language: "Language",
      english: "English",
      persian: "Persian",
      pashto: "Pashto",

      noCompleted: "No completed goals yet",
      completedOn: "Completed on",
      // goal card
      viewGoals: "View Goals",
      createGoal: "Create New Goal",
      delete: "DELETE",
      edit: "EDIT",
      viewDetails: "viewDetails",
      resume :"Resume",
      pause : "pause",

      title: "Title",
      category: "Category",
      type: "Type",
      target: "Target",
      create: "Create",
      all: "all",
      study: "Study",
      work: "Work",
      health: "Health",
      personal: "Personal",
      daily: "Daily",
      count: "Count",
      time: "Time",

      // dashboard
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

      // goals page
      allGoals: "All Goals",
      searchGoals: "Search goals...",

      // details
      addProgress: "+ Add Progress",
      deleteGoal: "Delete Goal",
      back: "Back",
      activityHistory: "Activity History",
      noActivity: "No activity yet",

      //Edit page
      editdGoal: "Edit Goal",
      saveChanges: "Save Changes",
      cancel: "Cancel",
      goalNotFound: "Goal not found",
    },

    // 🇮 Persian
    fa: {
      //navbar
      goalTracker: "پیگیری اهداف",
      dashboard: "داشبورد",
      archive: "آرشیف",
      goals: "اهداف",
      categories: "دسته‌بندی‌ها",
      settings: "تنظیمات",
      //settings
      theme: "تم",
      currentTheme: "تم فعلی",
      toggleTheme: "تغییر تم ",
      light: "روشن",
      dark: "تاریک",
      language: "زبان",
      english: "انگلیسی",
      persian: "فارسی",
      pashto: "پشتو",

      noCompleted: "هنوز هدفی تکمیل نشده",
      completedOn: "تاریخ تکمیل",

      viewGoals: "مشاهده اهداف",
      createGoal: "+ ایجاد هدف جدید",
      delete: "حذف",
      edit: "تغییرات",
      viewDetails: "دیدن اطلاعات بیشتر",
      pause: "متوقف",
      resume: " دامه دادن",
      
      title: "عنوان",
      category: "دسته‌بندی",
      type: "نوع",
      target: "هدف",
      create: "ایجاد",
      all: "همه",
      study: "مطالعه",
      work: "کار",
      health: "صحت",
      personal: "شخصی",
      daily: "روزانه",
      count: "تعدادی",
      time: "زمانی",
      // dashboard
      totalGoals: "مجموع اهداف",
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
      // goals page
      allGoals: "همه اهداف",
      searchGoals: "جستجوی هدف...",
      // details
      addProgress: "+ پیشرفت",
      deleteGoal: "حذف هدف",
      back: "برگشت",
      activityHistory: "تاریخچه فعالیت",
      noActivity: "هنوز فعالیتی وجود ندارد",

      // Edit page

      editGoal: "تغییرات هدف",
      saveChanges: "ذخیره تغییرات",
      cancel: "لغو",
      goalNotFound: "هدف پیدا نشد",
    },

    //  Pashto
    ps: {
      //navbar
      goalTracker: "د موخو څارونکی",
      dashboard: "ډشبورډ",
      archive: "ارشیف",
      goals: "موخې",
      categories: "کتګورۍ",
      settings: "تنظیمات",
      //settings
      theme: "بڼه",
      currentTheme: "اوسنی بڼه",
      toggleTheme: "بڼه بدلول",
      light: "روښانه",
      dark: "تیاره",
      language: "ژبه",
      english: "انګلیسي",
      persian: "فارسي",
      pashto: "پښتو",

      noCompleted: "تر اوسه هېڅ موخه نه ده بشپړه شوې",
      completedOn: "د بشپړېدو نېټه",
      // goals page
      viewGoals: "موخې وګورئ",
      createGoal: "+ نوې موخه جوړ کړئ",

      title: "سرلیک",
      category: "کتګوري",
      type: "ډول",
      target: "هدف",
      create: "جوړ کړئ",
      all: "تول",
      study: "مطالعه",
      work: "کار",
      health: "روغتیا",
      personal: "شخصي",
      daily: "ورځنۍ",
      count: "شمېر",
      time: "وخت",
      // dashboard
      totalGoals: "ټولې موخې",
      completedGoals: "بشپړې شوې موخې",
      progress: "پرمختګ",
      overallProgress: "ټول پرمختګ",
      newGoal: "+ نوې موخه",
      viewAllGoals: "ټولې موخې وګورئ",
      activeGoals: "فعاله موخې",
      noActiveGoals: "هیڅ فعاله موخه نشته",
      viewArchive: "ارشیف وګورئ",
      xp: "XP",
      streak: "سټریک",
      days: "ورځې",

      allGoals: "ټولې موخې",
      searchGoals: "موخې ولټوئ...",
      delete: "ړنګول",
      edit: "سمول",
      viewDetails: "جزئیات کتل",
      pause: "درول",
      resume: " بیا پیل",
      // details
      addProgress: "+ پرمختګ",
      deleteGoal: "موخه حذف کړئ",
      back: "شاته",
      activityHistory: "فعالیت تاریخ",
      noActivity: "هیڅ فعالیت نشته",

      // Edit page

      editGoal: "موخه سمول",
      saveChanges: "بدلونونه خوندي کړئ",
      cancel: "لغوه",
      goalNotFound: "موخه ونه موندل شوه",
    },
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t: (key) => translations[language]?.[key] ?? key,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
