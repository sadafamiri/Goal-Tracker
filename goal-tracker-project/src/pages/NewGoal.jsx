import React, { useState, useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Create New Goal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Health">Health</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="count">Count-based</option>
            <option value="time">Time-based</option>
          </select>
        </div>

        <div>
          <label>Target:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            min={1}
            required
          />
        </div>

        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
}
