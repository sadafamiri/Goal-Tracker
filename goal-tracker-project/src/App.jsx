import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import GoalDetails from "./pages/GoalDetails";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Goals from "./pages/Goals";
import NewGoal from "./pages/NewGoal";

import { Route, Routes } from "react-router-dom";

import { GoalsProvider } from "./context/GoalsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import theme from "./theme/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <GoalsProvider>
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
        </GoalsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
