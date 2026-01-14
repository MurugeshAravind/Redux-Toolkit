import { fireEvent, render, screen } from "@testing-library/react";
import DebugState from "../components/DebugState";
import { Provider } from "react-redux";
import store from "../store/store";

function DebugStateInstance() {
  return render(
    <Provider store={store}>
      <DebugState />
    </Provider>
  );  
}

describe("unit test for DebugState", () => {
  it("component loads correctly", () => {
    DebugStateInstance();
  });
  it("mocking the clear actions button", () => {
    DebugStateInstance();
    const inputText = screen.getByLabelText("Filter actions");
    expect(inputText).toBeDefined();
    fireEvent.input(inputText, { target: { value: "fetchHabits"}});
    const button = screen.getByText("Clear Actions");
    expect(button).toBeDefined();
    fireEvent.click(button);
  });
});
