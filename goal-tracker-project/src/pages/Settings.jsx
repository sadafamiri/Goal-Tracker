import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";

import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, changeLanguage, t } = useContext(LanguageContext);

  const themeLabel = theme === "dark" ? t("dark") : t("light");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 4,
        maxWidth: 600,
        margin: "20px auto",
      }}
    >
      {/*  Theme Section */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          <Typography variant="h5">{t("theme")}</Typography>
        </Stack>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("currentTheme")}: {themeLabel}
        </Typography>

        <Button
          variant="contained"
          onClick={toggleTheme}
          startIcon={theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        >
          {t("toggleTheme")}
        </Button>
      </Paper>

      {/* 🌍 Language Section */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LanguageIcon />
          <Typography variant="h5">{t("language")}</Typography>
        </Stack>

        <FormControl fullWidth>
          <InputLabel id="language-select-label">
            {t("selectLanguage")}
          </InputLabel>

          <Select
            labelId="language-select-label"
            value={language}
            label={t("selectLanguage")}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <MenuItem value="en">{t("english")}</MenuItem>
            <MenuItem value="fa">{t("persian")}</MenuItem>
            <MenuItem value="ps">{t("pashato")}</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
}
