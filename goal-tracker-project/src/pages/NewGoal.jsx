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

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Study");
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
        <TextField
          label={t("title")}
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>{t("category")}</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="Study">Study</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>{t("type")}</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="daily">{t("daily")}</MenuItem>
            <MenuItem value="count">{t("count")}</MenuItem>
            <MenuItem value="time">{t("time")}</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={t("target")}
          type="number"
          fullWidth
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          fullWidth
        >
          {t("create")}
        </Button>
      </form>
    </Box>
  );
}