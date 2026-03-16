import React, { useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import GoalCard from "../components/GoalCard";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Stack
} from "@mui/material";

export default function Dashboard() {

  const { goals, deleteGoal, addProgress, xp, streak } = useContext(GoalsContext);
  const navigate = useNavigate();

  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.progress === goal.target
  ).length;

  const completionRate =
    totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

  return (
    <Box sx={{ p: 4 }}>

      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h3">
          Dashboard
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/goals/new")}
        >
          + New Goal
        </Button>
      </Stack>

      {/* XP and Streak */}
      <Stack direction="row" spacing={3} mb={4}>

        <Paper sx={{ p: 3, textAlign: "center", flex: 1 }} elevation={3}>
          <Typography variant="h6">XP</Typography>
          <Typography variant="h4">{xp}</Typography>
        </Paper>

        <Paper sx={{ p: 2, textAlign: "center", flex: 1 }} elevation={3}>
          <Typography variant="h4">⚡ Streak</Typography>
          <Typography variant="h2">{streak} days</Typography>
        </Paper>

      </Stack>

      {/* Stats */}
      <Grid container spacing={3} mb={4}>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }} elevation={3}>
            <Typography variant="h6">Total Goals</Typography>
            <Typography variant="h4">{totalGoals}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }} elevation={3}>
            <Typography variant="h6">Completed Goals</Typography>
            <Typography variant="h4">{completedGoals}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }} elevation={3}>
            <Typography variant="h6">Completion Rate</Typography>
            <Typography variant="h4">{completionRate}%</Typography>
          </Paper>
        </Grid>

      </Grid>

      {/* Goals */}
      <Grid container spacing={3}>

        {goals.map((goal) => (
          <Grid item xs={12} sm={6} md={4} key={goal.id}>

            <GoalCard
              id={goal.id}
              title={goal.title}
              progress={goal.progress}
              target={goal.target}
              category={goal.category}
              onDelete={() => deleteGoal(goal.id)}
              onAddProgress={() => addProgress(goal.id)}
            />

          </Grid>
        ))}

      </Grid>

    </Box>
  );
}