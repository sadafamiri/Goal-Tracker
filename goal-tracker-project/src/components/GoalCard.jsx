import React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Stack
} from "@mui/material";

export default function GoalCard({
  id,
  title,
  progress,
  target,
  category,
  onDelete,
  onAddProgress
}) {

  const navigate = useNavigate();

  const percent = Math.round((progress / target) * 100);

  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.03)"
        }
      }}
      elevation={4}
    >

      <CardContent>

        <Typography variant="h6" mb={1}>
          {title}
        </Typography>

        <Typography color="text.secondary" mb={2}>
          {category}
        </Typography>

        <Typography variant="body2" mb={1}>
          {progress} / {target} ({percent}%)
        </Typography>

        <LinearProgress
          variant="determinate"
          value={percent}
          sx={{ height: 8, borderRadius: 5, mb: 2 }}
        />

        <Stack direction="row" spacing={1}>

          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={(e) => {
              e.stopPropagation();
              onAddProgress();
            }}
          >
            + Progress
          </Button>

          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/goals/${id}`);
            }}
          >
            View
          </Button>

          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </Button>

        </Stack>

      </CardContent>

    </Card>
  );
}