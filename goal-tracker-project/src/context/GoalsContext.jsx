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

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    localStorage.setItem("xp", JSON.stringify(xp));
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [goals, xp, streak]);

  //  Add Goal
  const addGoal = (goal) => {
    setGoals((prev) => [...prev, { ...goal, id: Date.now() }]);
  };

  //  Delete Goal
  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  //  Update Goal
  const updateGoal = (id, updatedGoal) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? updatedGoal : goal)),
    );
  };

  const pauseGoal = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, status: "paused" } : goal,
      ),
    );
  };

  const resumeGoal = (id) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? { ...goal, status: "active" } : goal,
      ),
    );
  };

  // Add Progress
  const addProgress = (id) => {
    const today = new Date().toDateString();

    const newGoals = goals.map((goal) => {
      if (goal.id !== id) return goal;

      if (goal.progress >= goal.target) return goal;

      const lastLog =
        goal.logs && goal.logs.length ? goal.logs[goal.logs.length - 1] : null;

      const lastLogDate = lastLog
        ? new Date(lastLog.date).toDateString()
        : null;

      //  STREAK
      if (lastLogDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastLogDate === yesterday.toDateString()) {
          setStreak((prev) => prev + 1);
        } else {
          setStreak(1);
        }
      }

      //  PROGRESS
      const newProgress = goal.progress + 1;

      //  XP
      setXp((prev) => prev + 10);

      const newLog = {
        amount: 1,
        date: new Date().toISOString(),
      };

      return {
        ...goal,
        progress: newProgress > goal.target ? goal.target : newProgress,
        logs: [...(goal.logs || []), newLog],
        status: newProgress >= goal.target ? "completed" : "active",
      };
    });

    setGoals(newGoals);
  };

  //  Value
  const value = useMemo(
    () => ({
      goals,
      addGoal,
      deleteGoal,
      updateGoal,
      addProgress,
      pauseGoal,
      resumeGoal,
      xp,
      streak,
    }),
    [goals, xp, streak],
  );

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
}
