import { useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import GoalCard from "../components/GoalCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const { goals, deleteGoal, addProgress } = useContext(GoalsContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => navigate("/goals/new")} > + New Goal </button>

      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
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