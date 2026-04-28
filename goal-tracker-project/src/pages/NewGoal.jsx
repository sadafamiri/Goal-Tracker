import React, { useState, useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";

export default function NewGoal() {
  const { addGoal } = useContext(GoalsContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  //  IMPORTANT: lowercase values for consistency
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("study");
  const [type, setType] = useState("daily");
  const [target, setTarget] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGoal = {
      title,
      category,
      type,
      target: Number(target),
      progress: 0,
      status: "active",
      logs: [],
      createdAt: new Date().toISOString(),
    };

    addGoal(newGoal);
    navigate("/");
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" mb={3}>
        {t("createGoal")}
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* TITLE */}
        <TextField
          label={t("title")}
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />

        {/* CATEGORY */}
        <FormControl fullWidth margin="normal">
          <InputLabel>{t("category")}</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label={t("category")}
          >
            <MenuItem value="study">{t("study")}</MenuItem>
            <MenuItem value="work">{t("work")}</MenuItem>
            <MenuItem value="health">{t("health")}</MenuItem>
            <MenuItem value="personal">{t("personal")}</MenuItem>
          </Select>
        </FormControl>

        {/* TYPE */}
        <FormControl fullWidth margin="normal">
          <InputLabel>{t("type")}</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label={t("type")}
          >
            <MenuItem value="daily">{t("daily")}</MenuItem>
            <MenuItem value="count">{t("count")}</MenuItem>
            <MenuItem value="time">{t("time")}</MenuItem>
          </Select>
        </FormControl>

        {/* TARGET */}
        <TextField
          label={t("target")}
          type="number"
          fullWidth
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
          margin="normal"
        />

        {/* BUTTON */}
        <Button type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
          {t("create")}
        </Button>
      </form>
    </Box>
  );
}