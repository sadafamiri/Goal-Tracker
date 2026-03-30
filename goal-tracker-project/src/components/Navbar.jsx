
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  useTheme
} from "@mui/material";

export default function Navbar() {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const muiTheme = useTheme();

  const links = [
    { path: "/", label: t("dashboard") },
    { path: "/archive", label: t("archive") },
    { path: "/goals", label: t("goals") },
    { path: "/categories", label: t("categories") },
    { path: "/settings", label: t("settings") },
  ];

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? muiTheme.palette.primary.main : muiTheme.palette.text.primary,
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <AppBar position="static" color={theme === "dark" ? "default" : "primary"} sx={{ mb: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {t("dashboard")}
        </Typography>

        <Stack direction="row" spacing={2}>
          {links.map((link) => (
            <Button
              key={link.path}
              component={NavLink}
              to={link.path}
              sx={{ color: "inherit", textTransform: "none" }}
              style={({ isActive }) => linkStyle({ isActive })}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}