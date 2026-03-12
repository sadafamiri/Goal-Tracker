import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/goalcard.css";
export default function GoalCard({
  id,
  title,
  progress,
  target,
  category,
  onDelete,
  onAddProgress,
}) {
  console.log(title, category, progress, target);
  const progressPercent = Math.round((progress / target) * 100);
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="goal-title">{title}</h3>
      <p className="goal-category">Category: {category}</p>
      <div className="progress-container">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="progress-text">
        Progress: {progress} / {target} ({progressPercent}%)
      </p>
      <button onClick={() => navigate(`/goals/${id}`)}>View Details</button>
      <button onClick={onAddProgress}>+ Progress</button>

      <button
        onClick={() => {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this goal?",
          );

          if (confirmDelete) {
            onDelete();
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
