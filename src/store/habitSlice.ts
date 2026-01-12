import { createAsyncThunk, createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null
};

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null
};

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async() => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockHabits: Habit[] = [
    {
      id: "1",
      name: "Read",
      frequency: "daily",
      completedDates: [],
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "Exercise",
      frequency: "daily",
      completedDates: [],
      createdAt: new Date().toISOString()
    }
  ];
  return mockHabits;
});

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string}>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);
      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
    removeHabit: (state, action: PayloadAction<{ id: string; date: string}>) => {
      state.habits = state.habits.filter((h) => h.id !== action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchHabits.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchHabits.fulfilled, (state, action) => {
      state.isLoading = false;
      state.habits = action.payload;
    })
    .addCase(fetchHabits.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch habits";
    }) 
  }
});

// Selectors
const selectHabitsState = (state: { habits: HabitState }) => state.habits;

export const selectHabits = createSelector(
  [selectHabitsState],
  (habitState) => habitState.habits
);

export const selectHabitStats = createSelector(
  [selectHabits],
  (habits) => {
    const today = new Date().toISOString().split("T")[0];
    
    const completedToday = habits.reduce(
      (count, habit) => count + (habit.completedDates.includes(today) ? 1 : 0),
      0
    );

    const getStreak = (habit: Habit) => {
      let streak = 0;
      const currentDate = new Date();
      while (true) {
        const dateString = currentDate.toISOString().split("T")[0];
        if (habit.completedDates.includes(dateString)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
      return streak;
    };

    const longestStreak = habits.length === 0 ? 0 : Math.max(...habits.map(getStreak));

    return {
      total: habits.length,
      completedToday,
      longestStreak
    };
  }
);

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
