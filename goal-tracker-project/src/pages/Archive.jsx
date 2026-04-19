import React, { useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import GoalCard from "../components/GoalCard";
import { Grid, Typography, Box } from "@mui/material";
import { LanguageContext } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function Archive() {
  const { goals, deleteGoal, restoreGoal } = useContext(GoalsContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const completedGoals = goals.filter((goal) => goal.status === "completed");

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t("archive")}
      </Typography>

      {completedGoals.length === 0 ? (
        <Typography>{t("noCompleted")}</Typography>
      ) : (
        <Grid container spacing={2}>
          {completedGoals.map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <GoalCard
                title={goal.title}
                progress={goal.progress}
                target={goal.target}
                category={goal.category}
                onDelete={() => deleteGoal(goal.id)}

                //  Edit
                onEdit={() => navigate(`/goals/edit/${goal.id}`)}

                //  Details
                onViewDetails={() => navigate(`/goals/${goal.id}`)}

              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}