import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../store/habitSlice";
import AddHabitForm from "../components/AddHabitForm";

const renderWithRedux = (component) => {
  const store = configureStore({
    reducer: { habits: habitReducer },
  });
  jest.spyOn(store, "dispatch");

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("AddHabitForm Component", () => {
  it("should render the form elements", () => {
    renderWithRedux(<AddHabitForm />);
    // Note: You might need to adjust this query to match your component's implementation
    expect(screen.getByPlaceholderText("Enter habit name")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should allow user to type in the input", () => {
    renderWithRedux(<AddHabitForm />);
    const input = screen.getByPlaceholderText("Enter habit name");
    fireEvent.change(input, { target: { value: "New test habit" } });
    expect(input).toHaveValue("New test habit");
  });

  it("should dispatch addHabit action on form submission", () => {
    const { store } = renderWithRedux(<AddHabitForm />);
    const input = screen.getByPlaceholderText("Enter habit name");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "New test habit" } });
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "habits/addHabit",
        // Assuming a default frequency is set in the component
        payload: { name: "New test habit", frequency: "daily" },
      })
    );
  });
});