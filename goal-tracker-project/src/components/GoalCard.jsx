import React, { useState, useContext } from "react";
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
  DialogActions,
  onPause,
  onResume,
  status,
} from "@mui/material";

import { LanguageContext } from "../context/LanguageContext";

export default function GoalCard({
  title,
  progress,
  target,
  category,
  onDelete,
  onAddProgress,
  onViewDetails,
  onEdit,
}) {
  const { t } = useContext(LanguageContext);

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
            {t("category")}: {category}
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
              <Button variant="contained" onClick={onAddProgress}>
                {t("addProgress")}
              </Button>
            )}

            {onEdit && (
              <Button variant="outlined" onClick={onEdit}>
                ✏️ {t("edit")}
              </Button>
            )}

            {status === "active" && (
              <Button variant="outlined" onClick={onPause}>
                Pause
              </Button>
            )}

            {status === "paused" && (
              <Button variant="contained" onClick={onResume}>
                Resume
              </Button>
            )}

            {onDelete && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteClick}
              >
                🗑️ {t("delete")}
              </Button>
            )}

            {onViewDetails && (
              <Button variant="text" onClick={onViewDetails}>
                {t("viewDetails")}
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={openConfirm} onClose={handleCancelDelete}>
        <DialogTitle>{t("confirmDelete")}</DialogTitle>
        <DialogContent>
          <Typography>{t("deleteMessage")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>{t("cancel")}</Button>
          <Button onClick={handleConfirmDelete} color="error">
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
