import React, { useState, useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import { useNavigate } from "react-router-dom";
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
  const { goals, updateGoals } = useContext(GoalsContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Study");
  const [type, setType] = useState("daily");
  const [target, setTarget] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGoal = {
      id: Date.now(),
      title,
      category,
      type,
      target: Number(target),
      progress: 0,
      status: "active",
      logs: [],
      createdAt: new Date().toISOString(),
    };

    const newGoalsArray = [...goals, newGoal];
    updateGoals(newGoalsArray);

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
        Create New Goal
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="Study">Study</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Type"
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="count">Count-based</MenuItem>
            <MenuItem value="time">Time-based</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Target"
          type="number"
          fullWidth
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          inputProps={{ min: 1 }}
          required
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          fullWidth
        >
          Create Goal
        </Button>
      </form>
    </Box>
  );
}
