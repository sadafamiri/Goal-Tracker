// src/pages/EditGoal.jsx
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoalsContext } from "../context/GoalsContext";

import { Box, Typography, TextField, Button, Stack } from "@mui/material";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, updateGoal } = useContext(GoalsContext);

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
    return <Typography>Goal not found</Typography>;
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
        Edit Goal
      </Typography>

      <Stack spacing={3} maxWidth={400}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <TextField
          label="Target"
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Save Changes
        </Button>

        <Button variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}
