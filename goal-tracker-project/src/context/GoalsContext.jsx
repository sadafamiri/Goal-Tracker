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

  const updateGoals = (nextGoals) => {
    setGoals(nextGoals);
  };

  const value = useMemo(() => ({ goals, updateGoals }), [goals]);

  return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>;
}
