import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoalsContext } from "../context/GoalsContext";
import { LanguageContext } from "../context/LanguageContext";

import { Box, Typography, TextField, Button, Stack } from "@mui/material";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { goals, updateGoal } = useContext(GoalsContext);
  const { t } = useContext(LanguageContext); // ✅ مهم

  const goal = goals.find((g) => g.id === Number(id));

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setCategory(goal.category);
      setTarget(goal.target);
    }
  }, [goal]);

  if (!goal) {
    return <Typography>{t("goalNotFound")}</Typography>;
  }

  const handleSubmit = () => {
    updateGoal(goal.id, {
      ...goal,
      title,
      category,
      target: Number(target),
    });

    navigate("/goals");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        {t("editGoal")}
      </Typography>

      <Stack spacing={3} maxWidth={400}>
        <TextField
          label={t("title")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label={t("category")}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <TextField
          label={t("target")}
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <Button variant="contained" onClick={handleSubmit}>
          {t("saveChanges")}
        </Button>

        <Button variant="outlined" onClick={() => navigate(-1)}>
          {t("cancel")}
        </Button>
      </Stack>
    </Box>
  );
}