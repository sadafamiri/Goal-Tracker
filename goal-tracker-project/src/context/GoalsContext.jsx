
import React, { createContext, useEffect, useMemo, useState } from "react";
import { DataGoal } from "../Data/DataGoal";

export const GoalsContext = createContext(null);

const STORAGE_KEY = "goals";

export function GoalsProvider({ children }) {
  // Goals state
  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DataGoal;
    } catch {
      return DataGoal;
    }
  });

  // XP state
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem("xp");
    return saved ? JSON.parse(saved) : 0;
  });

  // Streak state
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    return saved ? JSON.parse(saved) : 0;
  });


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    localStorage.setItem("xp", JSON.stringify(xp));
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [goals, xp, streak]);


  const deleteGoal = (id) => {
    const newGoals = goals.filter((goal) => goal.id !== id);
    setGoals(newGoals);
  };

  
  const addProgress = (id) => {
    const today = new Date().toDateString(); 

    const newGoals = goals.map((goal) => {
      if (goal.id === id) {
        // بررسی logs برای Streak
        const lastLogDate = goal.logs && goal.logs.length
          ? new Date(goal.logs[goal.logs.length - 1].date).toDateString()
          : null;

        if (lastLogDate) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (lastLogDate === yesterday.toDateString()) {
            setStreak((prev) => prev + 1);
          } else if (lastLogDate !== today) {
            
            setStreak(1);
          }
        } else {
         
          setStreak(1);
        }

        const newProgress = goal.progress + 1;

        // XP
        setXp((prev) => prev + 10);

        const newLog = {
          amount: 1,
          date: new Date().toISOString(),
        };

        return {
          ...goal,
          progress: newProgress > goal.target ? goal.target : newProgress,
          logs: [...(goal.logs || []), newLog],
          status: newProgress >= goal.target ? "completed" : goal.status,
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
      xp,
      streak,
    }),
    [goals, xp, streak]
  );

  return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>;
}