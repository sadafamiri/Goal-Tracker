import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoalsContext } from "../context/GoalsContext";

export default function GoalDetails() {
  const { id } = useParams(); // گرفتن id از URL
  const navigate = useNavigate();
  const { goals, addProgress, deleteGoal } = useContext(GoalsContext);

  // پیدا کردن Goal با id
  const goal = goals.find((g) => g.id === Number(id));
  if (!goal) return <h2>Goal not found!</h2>;

  const progressPercent = Math.round((goal.progress / goal.target) * 100);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{goal.title}</h1>
      <p>Category: {goal.category}</p>
      <p>Type: {goal.type}</p>
      <p>Progress: {goal.progress} / {goal.target} ({progressPercent}%)</p>

      {/* Progress Bar */}
      <div style={{
        width: "300px",
        height: "20px",
        background: "#eee",
        borderRadius: "10px",
        overflow: "hidden",
        margin: "10px 0"
      }}>
        <div style={{
          width: `${progressPercent}%`,
          height: "100%",
          background: "#4CAF50",
          transition: "0.3s"
        }}></div>
      </div>

      <button onClick={() => addProgress(goal.id)} style={{ marginRight: "10px" }}>
        + Progress
      </button>

      <button onClick={() => { deleteGoal(goal.id); navigate("/"); }}>
        Delete Goal
      </button>

      <button onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
        Back
      </button>
    </div>
  );
}