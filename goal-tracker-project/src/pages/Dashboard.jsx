// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import { LanguageContext } from "../context/LanguageContext";
import GoalCard from "../components/GoalCard";

import {
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  LinearProgress,
  Stack,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { goals, deleteGoal, addProgress, xp, streak } =
    useContext(GoalsContext);

  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const totalGoals = goals.length;

  const completedGoals = goals.filter((g) => g.progress >= g.target).length;

  const activeGoals = goals.filter((g) => g.status === "active");

  const completedList = goals.filter((g) => g.status === "completed");

  const totalProgress = goals.reduce((acc, g) => acc + g.progress, 0);

  const totalTarget = goals.reduce((acc, g) => acc + g.target, 0);

  const percent =
    totalTarget === 0 ? 0 : Math.round((totalProgress / totalTarget) * 100);

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔥 Header */}
      <Typography variant="h4" mb={2}>
        {t("dashboard")}
      </Typography>

      {/* ⚡ XP + Streak */}
      <Stack direction="row" spacing={3} mb={3}>
        <Typography>
          🔥 {t("xp")}: {xp}
        </Typography>
        <Typography>
          ⚡ {t("streak")}: {streak} {t("days")}
        </Typography>
      </Stack>

      {/* 📊 Summary Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography>{t("totalGoals")}</Typography>
            <Typography variant="h5">{totalGoals}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography>{t("completedGoals")}</Typography>
            <Typography variant="h5">{completedGoals}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography>{t("progress")}</Typography>
            <Typography variant="h5">{percent}%</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 📈 Overall Progress */}
      <Box mb={4}>
        <Typography mb={1}>{t("overallProgress")}</Typography>
        <LinearProgress
          variant="determinate"
          value={percent}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>

      {/* ➕ Actions */}
      <Stack direction="row" spacing={2} mb={3}>
        <Button variant="contained" onClick={() => navigate("/goals/new")}>
          {t("newGoal")}
        </Button>

        <Button variant="outlined" onClick={() => navigate("/goals")}>
          {t("viewAllGoals")}
        </Button>
      </Stack>

      {/* 🎯 Active Goals */}
      <Typography variant="h5" mb={2}>
        {t("activeGoals")}
      </Typography>

      <Grid container spacing={2} mb={4}>
        {activeGoals.length === 0 ? (
          <Typography>{t("noActiveGoals")}</Typography>
        ) : (
          activeGoals.map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <GoalCard
                title={goal.title}
                progress={goal.progress}
                target={goal.target}
                category={goal.category}
                onDelete={() => deleteGoal(goal.id)}
                onAddProgress={() => addProgress(goal.id)}
                onViewDetails={() => navigate(`/goals/${goal.id}`)}
                onEdit={() => navigate(`/goals/edit/${goal.id}`)}
              />
            </Grid>
          ))
        )}
      </Grid>

      {/*  Completed Preview  */}
      <Typography variant="h5" mb={2}>
        {t("completedGoals")}
      </Typography>

      <Grid container spacing={2}>
        {completedList.length === 0 ? (
          <Typography>{t("noActiveGoals")}</Typography>
        ) : (
          completedList.slice(0, 3).map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <Paper sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="h6">{goal.title}</Typography>

                <Typography color="text.secondary" mb={1}>
                  {goal.category}
                </Typography>

                <Typography color="success.main" mb={1}>
                  ✅ {t("completedGoals")}
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/archive")}
                >
                  {t("viewArchive")}
                </Button>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

    </Box>
  );
}
