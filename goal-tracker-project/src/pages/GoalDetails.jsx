import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoalsContext } from "../context/GoalsContext";
import { LanguageContext } from "../context/LanguageContext";

import {
  Box,
  Typography,
  Button,
  Paper,
  LinearProgress,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, addProgress, deleteGoal } = useContext(GoalsContext);
  const { t } = useContext(LanguageContext);

  const goal = goals.find((g) => g.id === Number(id));

  if (!goal)
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">{t("goalNotFound")}</Typography>
      </Box>
    );

  const progressPercent = Math.round((goal.progress / goal.target) * 100);

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "600px", p: 4, borderRadius: 3 }}>
        <Typography variant="h4" mb={2}>
          {goal.title}
        </Typography>

        <Typography color="text.secondary">
          {t("category")}: {goal.category}
        </Typography>

        <Typography color="text.secondary" mb={2}>
          {t("type")}: {goal.type}
        </Typography>

        <Typography variant="h6" mb={1}>
          {t("progress")}: {goal.progress} / {goal.target} ({progressPercent}%)
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{ height: 10, borderRadius: 5, mb: 3 }}
        />

        <Stack direction="row" spacing={2} mb={3}>
          <Button
            variant="contained"
            color="success"
            onClick={() => addProgress(goal.id)}
          >
            {t("addProgress")}
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteGoal(goal.id);
              navigate("/");
            }}
          >
            {t("deleteGoal")}
          </Button>

          <Button variant="outlined" onClick={() => navigate(-1)}>
            {t("back")}
          </Button>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6" mb={2}>
          {t("activityHistory")}
        </Typography>

        {(!goal.logs || goal.logs.length === 0) && (
          <Typography color="text.secondary">{t("noActivity")}</Typography>
        )}

        <List>
          {goal.logs &&
            goal.logs.map((log, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`+${log.amount}`}
                  secondary={new Date(log.date).toLocaleDateString()}
                />
              </ListItem>
            ))}
        </List>
      </Paper>
    </Box>
  );
}
