import React, { useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import GoalCard from "../components/GoalCard";
import {
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  LinearProgress,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { goals, deleteGoal, addProgress, xp, streak } =
    useContext(GoalsContext);

  const navigate = useNavigate();

  // 📊 محاسبات
  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (g) => g.progress >= g.target
  ).length;

  const activeGoals = goals.filter(
    (g) => g.status === "active"
  );

  const completedList = goals.filter(
    (g) => g.status === "completed"
  );

  const totalProgress = goals.reduce(
    (acc, g) => acc + g.progress,
    0
  );

  const totalTarget = goals.reduce(
    (acc, g) => acc + g.target,
    1
  );

  const percent = Math.round(
    (totalProgress / totalTarget) * 100
  );

  return (
    <Box sx={{ p: 3 }}>

      {/* 🔥 Header */}
      <Typography variant="h4" mb={2}>
        Dashboard
      </Typography>

      {/* ⚡ XP + Streak */}
      <Stack direction="row" spacing={3} mb={3}>
        <Typography>🔥 XP: {xp}</Typography>
        <Typography>⚡ Streak: {streak} days</Typography>
      </Stack>

      {/* 📊 Summary Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography>Total Goals</Typography>
            <Typography variant="h5">{totalGoals}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography>Completed</Typography>
            <Typography variant="h5">{completedGoals}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography>Progress</Typography>
            <Typography variant="h5">{percent}%</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 📈 Overall Progress */}
      <Box mb={4}>
        <Typography mb={1}>Overall Progress</Typography>
        <LinearProgress
          variant="determinate"
          value={percent}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>

      {/* ➕ Actions */}
      <Stack direction="row" spacing={2} mb={3}>
        <Button
          variant="contained"
          onClick={() => navigate("/goals/new")}
        >
          + New Goal
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/goals")}
        >
          View All Goals
        </Button>
      </Stack>

      {/* 🎯 Active Goals */}
      <Typography variant="h5" mb={2}>
        Active Goals
      </Typography>

      <Grid container spacing={2} mb={4}>
        {activeGoals.length === 0 ? (
          <Typography>No active goals</Typography>
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
                onViewDetails={() =>
                  navigate(`/goals/${goal.id}`)
                }
              />
            </Grid>
          ))
        )}
      </Grid>

      {/* ✅ Completed Preview */}
      <Typography variant="h5" mb={2}>
        Completed Goals
      </Typography>

      <Grid container spacing={2}>
        {completedList.slice(0, 3).map((goal) => (
          <Grid item xs={12} sm={6} md={4} key={goal.id}>
            <GoalCard
              title={goal.title}
              progress={goal.progress}
              target={goal.target}
              category={goal.category}
            />
          </Grid>
        ))}
      </Grid>

      <Button
        sx={{ mt: 2 }}
        onClick={() => navigate("/archive")}
      >
        View Archive
      </Button>

    </Box>
  );
}