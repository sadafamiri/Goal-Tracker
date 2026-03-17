import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

export default function Settings() {

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, changeLanguage, t } = useContext(LanguageContext);
  const themeLabel = theme === "dark" ? t("dark") : t("light");
  return (
    <div>

      <h2>{t("theme")}</h2>
      <p>
        {t("currentTheme")}: {themeLabel}
      </p>
      <button onClick={toggleTheme}>{t("toggleTheme")}</button>

      <h2>{t("language")}</h2>

      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">{t("english")}</option>
        <option value="fa">{t("persian")}</option>
      </select>

    </div>
  );
}
