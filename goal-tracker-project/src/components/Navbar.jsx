import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";
import { SearchContext } from "../context/SearchContext";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputBase,
  Stack,
  useTheme,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  const { t, language, changeLanguage } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { search, setSearch } = useContext(SearchContext);
  const muiTheme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { path: "/", label: t("dashboard") },
    { path: "/archive", label: t("archive") },
    { path: "/goals", label: t("goals") },
    { path: "/categories", label: t("categories") },
    { path: "/settings", label: t("settings") },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor:
            theme === "dark"
              ? muiTheme.palette.background.paper
              : muiTheme.palette.primary.main,
          color: theme === "dark" ? muiTheme.palette.text.primary : "#fff",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6">{t("goalTracker")}</Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
              px: 1,
              py: 0.5,
              bgcolor: "background.paper",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
              width: 220,
            }}
          >
            <SearchIcon />
            <InputBase
              placeholder={t("searchGoals")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1}>
              {links.map((link) => (
                <Button
                  key={link.path}
                  component={NavLink}
                  to={link.path}
                  sx={{ color: "inherit", textTransform: "none" }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            {/* Theme */}
            <IconButton color="inherit" onClick={toggleTheme}>
              {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 260, p: 2 }}>
          {/* Theme */}
          <Button
            fullWidth
            variant="contained"
            onClick={toggleTheme}
            startIcon={theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          >
            {t("theme")}
          </Button>

          {/* Language */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <MenuItem value="en">{t("english")}</MenuItem>
              <MenuItem value="fa">{t("persian")}</MenuItem>
              <MenuItem value="ps">{t("pashto")}</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ my: 2 }} />

          {/* Links */}
          <List>
            {links.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton component={NavLink} to={link.path}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
