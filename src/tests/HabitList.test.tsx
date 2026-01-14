import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import habitReducer, { HabitState } from "../store/habitSlice";
import HabitList from "../components/HabitList";

// A reusable render function with a Redux provider
const renderWithRedux = (component: React.ReactElement, preloadedState?: { habits: HabitState }) => {
  const store = configureStore({
    reducer: { habits: habitReducer },
    preloadedState,
  });
  // Spy on dispatch to check for action calls
  jest.spyOn(store, "dispatch");

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

const mockState: { habits: HabitState } = {
  habits: {
    habits: [
      { id: "1", name: "Read", frequency: "daily", completedDates: [], createdAt: new Date().toISOString() },
      { id: "2", name: "Exercise", frequency: "weekly", completedDates: [], createdAt: new Date().toISOString() },
    ],
    isLoading: false,
    error: null,
  },
};

describe("HabitList Component", () => {

  it("should render the list of habits from the store", () => {
    renderWithRedux(<HabitList />, mockState);
    expect(screen.getByText("Read")).toBeInTheDocument();
    expect(screen.getByText("Exercise")).toBeInTheDocument();
  });
});