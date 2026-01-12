import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchHabits, selectHabitStats } from "../store/habitSlice";
import Paper from "@mui/material/Paper";
import { LinearProgress, Typography } from "@mui/material";

const HabitStats: React.FC = () => {
  const { isLoading, error } = useSelector(
    (state: RootState) => state.habits
  );
  const { total, completedToday, longestStreak } = useSelector(selectHabitStats);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>
      <Typography variant="body1">Total Habits: {total}</Typography>
      <Typography variant="body1">
        Completed Today: {completedToday}
      </Typography>
      <Typography variant="body1">
        Longest Streak: {longestStreak}
      </Typography>
    </Paper>
  );
};

export default HabitStats;
