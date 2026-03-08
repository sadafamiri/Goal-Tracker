import GoalCard from "../components/GoalCard"
import { DataGoal } from "../Data/DataGoal"


export default function Dashboard(){
    return(

        <div>
        <h1>Dashboard</h1>

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

        
    )
}