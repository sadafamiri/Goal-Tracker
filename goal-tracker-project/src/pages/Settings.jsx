import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

export default function Settings() {

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, changeLanguage } = useContext(LanguageContext);
mmm
  return (
    <div>

      <h2>Theme</h2>

      <p>Current Theme: {theme}</p>

      <button onClick={toggleTheme}>
        Toggle Theme
      </button>

      <h2>Language</h2>

      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="fa">Persian</option>
      </select>

    </div>
  );
}