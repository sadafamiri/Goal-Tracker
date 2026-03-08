import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Categories from "./pages/Categories";
import GoalDetails from './pages/GoalDetails'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import Goals from './pages/Goals'
import NewGoal from './pages/NewGoal'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <div>
      

<Routes>
      
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/goals/new" element={<NewGoal />} />
        <Route path="/goals/:id" element={<GoalDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
