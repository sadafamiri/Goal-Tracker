import React, { useContext, useState } from "react";
import { GoalsContext } from "../context/GoalsContext";
import GoalCard from "../components/GoalCard";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from "@mui/material";

export default function Goals() {

  const { goals, deleteGoal, addProgress } = useContext(GoalsContext);
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");

  const filteredGoals =
    filter === "All"
      ? goals
      : goals.filter((goal) => goal.category === filter);

  return (
    <Box sx={{ p: 4 }}>

      <Typography variant="h3" mb={3}>
        All Goals
      </Typography>

      {/* Filter + Button */}
      <Stack
        direction="row"
        spacing={3}
        mb={4}
        alignItems="center"
      >

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>

          <Select
            value={filter}
            label="Category"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Study">Study</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/goals/new")}
        >
          + Create New Goal
        </Button>

      </Stack>

      {/* Goals List */}
      <Grid container spacing={3}>

        {filteredGoals.map((goal) => (

          <Grid item xs={12} sm={6} md={4} key={goal.id}>

            <GoalCard
              id={goal.id}
              title={goal.title}
              progress={goal.progress}
              target={goal.target}
              category={goal.category}
              onDelete={() => deleteGoal(goal.id)}
              onAddProgress={() => addProgress(goal.id)}
            />

          </Grid>

        ))}

      </Grid>

    </Box>
  );
}