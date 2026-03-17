// src/components/GoalCard.jsx
import React from "react";
import { Card, CardContent, Typography, LinearProgress, Button, Box } from "@mui/material";

export default function GoalCard({ title, progress, target, category, onDelete, onAddProgress, onViewDetails }) {
  const progressPercent = Math.round((progress / target) * 100);

  return (
    <Card sx={{ mb: 2, cursor: "pointer", position: "relative" }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {category}
        </Typography>

        <Box sx={{ my: 1 }}>
          <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 10, borderRadius: 5 }} />
          <Typography variant="body2">{progress} / {target} ({progressPercent}%)</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button variant="contained" color="primary" onClick={onAddProgress}>+ Progress</Button>
          <Button variant="outlined" color="secondary" onClick={onDelete}>Delete</Button>
          <Button variant="text" onClick={onViewDetails}>View Details</Button>
        </Box>
      </CardContent>
    </Card>
  );
}