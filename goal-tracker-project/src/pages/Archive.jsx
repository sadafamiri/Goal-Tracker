import React, { useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import GoalCard from "../components/GoalCard";
import { Grid, Typography, Box } from "@mui/material";

export default function Archive() {
  const { goals, deleteGoal, restoreGoal } = useContext(GoalsContext);

  // complete goals
  const completedGoals = goals.filter((goal) => goal.status === "completed");

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Completed Goals Archive
      </Typography>

      {completedGoals.length === 0 ? (
        <Typography variant="body1">Yet No complete goal tacker.</Typography>
      ) : (
        <Grid container spacing={2}>
          {completedGoals.map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <GoalCard
                title={goal.title}
                progress={goal.progress}
                target={goal.target}
                category={goal.category}
                status={goal.status}
                onDelete={() => deleteGoal(goal.id)}
                onEdit={() => restoreGoal(goal.id)}
                onViewDetails={() => console.log("View", goal.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
