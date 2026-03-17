import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";
const linkClass = ({ isActive }) =>
  "nav-link " + (isActive ? "fw-bold text-primary" : "");

export default function Navbar() {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const navbarThemeClass =
    theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light";

  return (
    <nav className={`navbar navbar-expand border-bottom ${navbarThemeClass}`}>
      <div className="container">
        <span className="navbar-brand fw-bold">
          {t("dashboard")}
        </span>

        <div className="navbar-nav">
          <NavLink className={linkClass} to="/">{t("dashboard")}</NavLink>

          <NavLink className={linkClass} to="/goals">{t("goals")}</NavLink>
          <NavLink className={linkClass} to="/categories">{t("categories")}</NavLink>
          <NavLink className={linkClass} to="/settings">{t("settings")}</NavLink>
        </div>
      </div>
    </nav>
  );
}
