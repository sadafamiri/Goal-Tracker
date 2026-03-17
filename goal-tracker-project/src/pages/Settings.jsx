import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Paper } from "@mui/material";

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
      {/* Theme Section */}
      <Paper sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t("theme")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("currentTheme")}: {themeLabel}
        </Typography>
        <Button variant="contained" color="primary" onClick={toggleTheme}>
          {t("toggleTheme")}
        </Button>
      </Paper>

      {/* Language Section */}
      <Paper sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t("language")}
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="language-select-label">{t("selectLanguage")}</InputLabel>
          <Select
            labelId="language-select-label"
            value={language}
            label={t("selectLanguage")}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <MenuItem value="en">{t("english")}</MenuItem>
            <MenuItem value="fa">{t("persian")}</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
}