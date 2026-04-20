import React, { useContext, useState } from "react";
import { GoalsContext } from "../context/GoalsContext";
import { LanguageContext } from "../context/LanguageContext";
import GoalCard from "../components/GoalCard";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import {
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

export default function Goals() {
  const { goals, deleteGoal, addProgress, pauseGoal, resumeGoal } =
    useContext(GoalsContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ FIXED FILTER
  const filteredGoals = goals.filter((goal) => {
    const matchCategory =
      filter === "all" || goal.category.toLowerCase() === filter;

    const matchSearch = goal.title.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" mb={3}>
        {t("allGoals")}
      </Typography>

      <Stack direction="row" spacing={3} mb={4} alignItems="center">
        {/* 🔍 SEARCH */}
        <TextField
          label={t("searchGoals")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* 📂 CATEGORY FILTER */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>{t("category")}</InputLabel>

          <Select
            value={filter}
            label={t("category")}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">{t("all")}</MenuItem>
            <MenuItem value="study">{t("study")}</MenuItem>
            <MenuItem value="work">{t("work")}</MenuItem>
            <MenuItem value="health">{t("health")}</MenuItem>
            <MenuItem value="personal">{t("personal")}</MenuItem>
          </Select>
        </FormControl>

        {/* ➕ NEW GOAL */}
        <Button variant="contained" onClick={() => navigate("/goals/new")}>
          {t("createGoal")}
        </Button>
      </Stack>

      {/* 📋 GOALS LIST */}
      <Grid container spacing={3}>
        {filteredGoals.map((goal) => (
          <Grid item xs={12} sm={6} md={4} key={goal.id}>
            <GoalCard
              id={goal.id}
              title={goal.title}
              progress={goal.progress}
              target={goal.target}
              category={goal.category}
              status={goal.status}
              onDelete={() => deleteGoal(goal.id)}
              onEdit={() => navigate(`/goals/edit/${goal.id}`)}
              onAddProgress={() => addProgress(goal.id)}
              onPause={() => pauseGoal(goal.id)}
              onResume={() => resumeGoal(goal.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
