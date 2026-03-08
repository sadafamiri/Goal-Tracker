import React from "react";
import { useNavigate } from "react-router-dom"; 
import GoalCard from "../components/GoalCard";
import { DataGoal } from "../Data/DataGoal";

export default function Dashboard() {
  const navigate = useNavigate(); 

  return (
    <div>
      <h1>Dashboard</h1>


      <button
        onClick={() => navigate("/goals/new")} 
      >
        + New Goal
      </button>

      {DataGoal.map((goal) => (
        <GoalCard
          key={goal.id}
          title={goal.title}
          progress={goal.progress}
          target={goal.target}
          category={goal.category}
        />
      ))}
    </div>
  );
}