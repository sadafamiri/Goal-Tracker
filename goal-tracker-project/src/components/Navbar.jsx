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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  const { t } = useContext(LanguageContext);
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

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
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
  );

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
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>

          {/* 🔹 Left: Menu + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {t("dashboard")}
            </Typography>
          </Box>

          {/* 🔹 Center: Search */}
          <Box
            sx={{
              display: "flex",
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

          {/* 🔹 Right: Links + Theme */}
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
                  sx={{
                    color:
                      theme === "dark"
                        ? muiTheme.palette.text.primary
                        : "#fff",
                    textTransform: "none",
                  }}
                  style={({ isActive }) => ({
                    fontWeight: isActive ? "bold" : "normal",
                    borderBottom: isActive
                      ? `2px solid ${muiTheme.palette.secondary.main}`
                      : "none",
                  })}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            {/* 🌙 Theme Toggle */}
            <IconButton color="inherit" onClick={toggleTheme}>
              {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>

      {/* 📱 Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}