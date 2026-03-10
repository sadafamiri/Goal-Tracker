import React, { createContext, useEffect, useMemo, useState } from "react";
import { DataGoal } from "../Data/DataGoal";

export const GoalsContext = createContext(null);

const STORAGE_KEY = "goals";

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DataGoal;
    } catch {
      return DataGoal;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const deleteGoal = (id) => {
    const newGoals = goals.filter((goal) => goal.id !== id);
    setGoals(newGoals);
  };

  const addProgress = (id) => {
  const newGoals = goals.map((goal) => {
    if (goal.id === id) {
      const newProgress = goal.progress + 1;

      return {
        ...goal,
        progress: newProgress > goal.target ? goal.target : newProgress,
      };
    }

    return goal;
  });

  setGoals(newGoals);
};

  const updateGoals = (nextGoals) => {
    setGoals(nextGoals);
  };

  const value = useMemo(
    () => ({
      goals,
      updateGoals,
      deleteGoal,
      addProgress,
    }),
    [goals],
  );

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
}
