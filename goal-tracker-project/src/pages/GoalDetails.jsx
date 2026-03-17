import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoalsContext } from "../context/GoalsContext";

// MUI
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
  ListItemText
} from "@mui/material";

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, addProgress, deleteGoal } = useContext(GoalsContext);

  const goal = goals.find((g) => g.id === Number(id));

  if (!goal)
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">Goal not found</Typography>
      </Box>
    );

  const progressPercent = Math.round((goal.progress / goal.target) * 100);

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={4}
        sx={{
          width: "600px",
          p: 4,
          borderRadius: 3
        }}
      >
        {/* Title */}
        <Typography variant="h4" mb={2}>
          {goal.title}
        </Typography>

        <Typography color="text.secondary">
          Category: {goal.category}
        </Typography>

        <Typography color="text.secondary" mb={2}>
          Type: {goal.type}
        </Typography>

        {/* Progress */}
        <Typography variant="h6" mb={1}>
          Progress: {goal.progress} / {goal.target} ({progressPercent}%)
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 10,
            borderRadius: 5,
            mb: 3
          }}
        />

        {/* Buttons */}
        <Stack direction="row" spacing={2} mb={3}>
          <Button
            variant="contained"
            color="success"
            onClick={() => addProgress(goal.id)}
          >
            + Progress
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteGoal(goal.id);
              navigate("/");
            }}
          >
            Delete Goal
          </Button>

          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Activity History */}
        <Typography variant="h6" mb={2}>
          Activity History
        </Typography>

        {(!goal.logs || goal.logs.length === 0) && (
          <Typography color="text.secondary">
            No activity yet
          </Typography>
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