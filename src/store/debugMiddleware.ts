import { type Middleware } from "@reduxjs/toolkit";
import { logActions } from "./debugSlice";

type AnyReduxAction = {
  type: string;
  payload?: unknown;
};

const isReduxAction = (action: unknown): action is AnyReduxAction => {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof (action).type === "string"
  )
}

export const debugMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (
      window.location.hostname === "localhost" &&
      isReduxAction(action) &&
      !action.type.startsWith("debug/")
    ) {
      store.dispatch(
        logActions({
          type: action.type,
          payload: action.payload,
          timestamp: Date.now(),
        })
      );
    }
    return next(action);
  };
