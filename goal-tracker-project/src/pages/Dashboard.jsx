// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import GoalCard from "../components/GoalCard";
import { Grid, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { goals, deleteGoal, addProgress, xp, streak } = useContext(GoalsContext);
  const navigate = useNavigate();

  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.progress === goal.target).length;
  const completionRate = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Dashboard</Typography>
      <Typography variant="h6">XP: {xp}</Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>⚡ Streak: {streak} days</Typography>

      <Button variant="contained" color="primary" onClick={() => navigate("/goals/new")} sx={{ mb: 3 }}>
        + New Goal
      </Button>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total Goals</Typography>
            <Typography variant="h5">{totalGoals}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Completed Goals</Typography>
            <Typography variant="h5">{completedGoals}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Completion Rate</Typography>
            <Typography variant="h5">{completionRate}%</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {goals.map(goal => (
          <Grid item xs={12} sm={6} md={4} key={goal.id}>
            <GoalCard
              title={goal.title}
              progress={goal.progress}
              target={goal.target}
              category={goal.category}
              onDelete={() => deleteGoal(goal.id)}
              onAddProgress={() => addProgress(goal.id)}
              onViewDetails={() => navigate(`/goals/${goal.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}