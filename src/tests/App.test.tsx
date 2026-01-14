import { Provider } from "react-redux";
import App from "../App";
import { render } from "@testing-library/react";
import store from "../store/store";

describe("unit tests for App", () => {
  it("render the app component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
