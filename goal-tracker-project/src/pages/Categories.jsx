import React, { useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

import { Box, Typography, Grid, Paper, Button } from "@mui/material";

export default function Categories() {
  const { goals } = useContext(GoalsContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const categories = [...new Set(goals.map((goal) => goal.category))];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" mb={3}>
        {t("categories")}
      </Typography>

      <Grid container spacing={3}>
        {categories.map((category, index) => {
          const categoryGoals = goals.filter(
            (goal) => goal.category === category,
          );

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <Typography variant="h5" mb={1}>
                  {category}
                </Typography>

                <Typography color="text.secondary" mb={2}>
                  {categoryGoals.length} {t("goals")}
                </Typography>

                <Button variant="contained" onClick={() => navigate("/goals")}>
                  {t("viewGoals")}
                </Button>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
