import React, { useContext, useState } from "react";
import { GoalsContext } from "../context/GoalsContext";
import GoalCard from "../components/GoalCard";
import { useNavigate } from "react-router-dom";

export default function Goals() {

  const { goals, deleteGoal, addProgress } = useContext(GoalsContext);
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");

  const filteredGoals =
    filter === "All"
      ? goals
      : goals.filter((goal) => goal.category === filter);

  return (
    <div>

      <h1>All Goals</h1>

      {/* filter */}
      <label>Filter by Category: </label>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Study">Study</option>
        <option value="Work">Work</option>
        <option value="Health">Health</option>
        <option value="Personal">Personal</option>
      </select>

      <br /><br />

      <button onClick={() => navigate("/goals/new")}>
        + Create New Goal
      </button>

      <br /><br />

      {filteredGoals.map((goal) => (
        <GoalCard
          key={goal.id}
          id={goal.id}
          title={goal.title}
          progress={goal.progress}
          target={goal.target}
          category={goal.category}
          onDelete={() => deleteGoal(goal.id)}
          onAddProgress={() => addProgress(goal.id)}
        />
      ))}

    </div>
  );
}