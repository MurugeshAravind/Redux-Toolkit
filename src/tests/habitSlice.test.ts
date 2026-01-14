import reducer, {
  addHabit,
  toggleHabit,
  removeHabit,
  fetchHabits,
  selectHabits,
  selectHabitStats,
  Habit,
  HabitState,
} from "../store/habitSlice";

let initialState: HabitState;

describe("habitSlice", () => {
  beforeEach(() => {
    initialState = {
      habits: [],
      isLoading: false,
      error: null,
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("reducers", () => {
    it("should handle addHabit", () => {
      let state = initialState;
      const habitsToAdd = ["Write", "Speak", "Breathe", "Sleep", "Rest", "Eat"];

      habitsToAdd.forEach((name) => {
        state = reducer(state, addHabit({ name, frequency: "daily" }));
      });

      expect(state.habits).toHaveLength(habitsToAdd.length);
      expect(state.habits[0].name).toBe("Write");
      expect(state.habits[5].name).toBe("Eat");
    });

    it("should handle toggleHabit to complete", () => {
      const habit: Habit = {
        id: "1",
        name: "Test Habit",
        frequency: "daily",
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      let date = "";
      initialState.habits.push(habit);
      date = "2024-01-01";
      const newState = reducer(initialState, toggleHabit({ id: "1", date }));
      expect(newState.habits[0].completedDates).toContain(date);
      expect(newState.habits[0].completedDates).toHaveLength(1);
    });

    it("should handle toggleHabit to incomplete", () => {
      const date = "2024-01-01";
      const habit: Habit = {
        id: "1",
        name: "Test Habit",
        frequency: "daily",
        completedDates: [date],
        createdAt: new Date().toISOString(),
      };
      initialState.habits.push(habit);
      const newState = reducer(initialState, toggleHabit({ id: "1", date }));
      expect(newState.habits[0].completedDates).not.toContain(date);
    });

    it("should handle removeHabit", () => {
      const habit: Habit = {
        id: "1",
        name: "Test Habit",
        frequency: "daily",
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      initialState.habits.push(habit);
      const newState = reducer(
        initialState,
        removeHabit({ id: "1", date: "" })
      );
      expect(newState.habits).toHaveLength(0);
    });
  });
  describe("thunks", () => {
    it("should execute fetchHabits logic", async () => {
      jest.useFakeTimers();
      const dispatch = jest.fn();
      const getState = jest.fn();
      const action = fetchHabits();
      const promise = action(dispatch, getState, undefined);
      jest.runAllTimers();

      const result = await promise;

      expect(result.payload).toHaveLength(2);
      expect(result.type).toBe("habits/fetchHabits/fulfilled");

      jest.useRealTimers();
    });
  });
  describe("extraReducers", () => {
    it("should handle fetchHabits.pending", () => {
      const action = { type: fetchHabits.pending.type };
      const newState = reducer(initialState, action);
      expect(newState.isLoading).toBe(true);
    });

    it("should handle fetchHabits.fulfilled", () => {
      const mockHabits: Habit[] = [
        {
          id: "1",
          name: "Fetched Habit",
          frequency: "daily",
          completedDates: [],
          createdAt: "",
        },
      ];
      const action = { type: fetchHabits.fulfilled.type, payload: mockHabits };
      const newState = reducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.habits).toEqual(mockHabits);
    });
    it("should handle fetchHabits.rejected", () => {
      const error = { message: "Internal Server Error" };
      const action = { type: fetchHabits.rejected.type, error };
      const newState = reducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe("Internal Server Error");
    });
    it("should handle fetchHabits.rejected without error message", () => {
      const action = { type: fetchHabits.rejected.type, error: "" };
      const newState = reducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe("Failed to fetch habits");
    });
  });
  describe("selectors", () => {
    const state: { habits: HabitState } = {
      habits: {
        habits: [
          {
            id: "1",
            name: "Read",
            frequency: "daily",
            completedDates: [new Date().toISOString().split("T")[0]],
            createdAt: "",
          },
          {
            id: "2",
            name: "Exercise",
            frequency: "weekly",
            completedDates: [],
            createdAt: "",
          },
          {
            id: "3",
            name: "Code",
            frequency: "weekly",
            completedDates: [],
            createdAt: "",
          },
          {
            id: "4",
            name: "Study",
            frequency: "weekly",
            completedDates: [],
            createdAt: "",
          },
          {
            id: "5",
            name: "Detoxing",
            frequency: "weekly",
            completedDates: [],
            createdAt: "",
          },
          {
            id: "6",
            name: "Hope",
            frequency: "weekly",
            completedDates: [],
            createdAt: "",
          },
        ],
        isLoading: false,
        error: null,
      },
    };
    it("should select habits with selectHabits", () => {
      const selectedHabits = selectHabits(state);
      expect(selectedHabits).toHaveLength(6);
    });
    it("should select habit stats with selectHabitStats", () => {
      const stats = selectHabitStats(state);
      expect(stats.total).toBe(6);
      expect(stats.completedToday).toBe(1);
      expect(stats.longestStreak).toBe(1);
    });
    it("should return 0 for longestStreak when there are no habits", () => {
      const emptyState: { habits: HabitState } = {
        habits: {
          habits: [],
          isLoading: false,
          error: null,
        },
      };
      const stats = selectHabitStats(emptyState);
      expect(stats.longestStreak).toBe(0);
    });
  });
});
