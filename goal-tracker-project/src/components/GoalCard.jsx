import React from "react";
import '../styles/goalcard.css'
export default function GoalCard({ title, progress, target, category }) {
    console.log(title, category, progress, target);
  const progressPercent = Math.round((progress / target) * 100);
  return (
    <div className="goal-card">
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
    </div>
  );
}