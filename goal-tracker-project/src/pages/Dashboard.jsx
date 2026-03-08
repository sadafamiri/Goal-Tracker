import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import GoalCard from "../components/GoalCard";
import { GoalsContext } from "../context/GoalsContext";

export default function Dashboard() {
  const navigate = useNavigate(); 
  const { goals } = useContext(GoalsContext);

  return (
    <div>
      <h1>Dashboard</h1>


      <button
        onClick={() => navigate("/goals/new")} 
      >
        + New Goal
      </button>

      {goals.map((goal) => (
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
