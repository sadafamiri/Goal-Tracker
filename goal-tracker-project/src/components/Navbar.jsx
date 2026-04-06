import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";

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
  const muiTheme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const links = [
    { path: "/", label: t("dashboard") },
    { path: "/archive", label: t("archive") },
    { path: "/goals", label: t("goals") },
    { path: "/categories", label: t("categories") },
    { path: "/settings", label: t("settings") },
  ];

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive
      ? muiTheme.palette.primary.main
      : muiTheme.palette.text.primary,
    fontWeight: isActive ? "bold" : "normal",
  });

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
        color={theme === "dark" ? "default" : "primary"}
      >
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
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
          
          {/* Search + Links */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <InputBase
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                px: 1,
                py: 0.5,
                bgcolor: "background.paper",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                width: 200,
              }}
              startAdornment={<SearchIcon sx={{ mr: 1 }} />}
            />
            <Stack direction="row" spacing={1}>
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
          </Box>
          {/* Dark / Light Toggle */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

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
