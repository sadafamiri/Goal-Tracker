import { useContext } from "react";
import { GoalsContext } from "../context/GoalsContext";
import GoalCard from "../components/GoalCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { goals, deleteGoal, addProgress , xp, streak} = useContext(GoalsContext);
  const navigate = useNavigate();

  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.progress === goal.target,
  ).length;

  const completionRate =
    totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

  return (
    <div>

      <h3>XP: {xp}</h3>
<h3>⚡ Streak: {streak} days</h3>
      <h1>Dashboard</h1>

      <button onClick={() => navigate("/goals/new")}> + New Goal </button>

      <div>
        <div style={{ border: "1px solid #ddd", padding: "15px" }}>
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "15px" }}>
          <h3>Completed Goals</h3>
          <p>{completedGoals}</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "15px" }}>
          <h3>Completion Rate</h3>
          <p>{completionRate}%</p>
        </div>
      </div>

      {goals.map((goal) => (
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
