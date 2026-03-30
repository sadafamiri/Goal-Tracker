// src/components/GoalCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

export default function GoalCard({
  title,
  progress,
  target,
  category,
  onDelete,
  onAddProgress,
  onViewDetails,
  onEdit 
}) {
  const progressPercent = Math.round((progress / target) * 100);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDeleteClick = () => setOpenConfirm(true);
  const handleConfirmDelete = () => {
    setOpenConfirm(false);
    onDelete();
  };
  const handleCancelDelete = () => setOpenConfirm(false);

  return (
    <>
      <Card sx={{ mb: 2, cursor: "pointer", position: "relative" }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {category}
          </Typography>

          <Box sx={{ my: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progressPercent}
              sx={{ height: 10, borderRadius: 5 }}
            />
            <Typography variant="body2">
              {progress} / {target} ({progressPercent}%)
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} mt={1}>
            {onAddProgress && (
              <Button variant="contained" color="primary" onClick={onAddProgress}>
                + Progress
              </Button>
            )}
            {onEdit && (
              <Button variant="outlined" color="secondary" onClick={onEdit}>
                ✏️ Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="outlined" color="error" onClick={handleDeleteClick}>
                🗑️ Delete
              </Button>
            )}
            {onViewDetails && (
              <Button variant="text" onClick={onViewDetails}>
                View Details
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirm} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure to delete this card ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}