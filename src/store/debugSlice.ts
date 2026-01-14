import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DebugAction = {
    type: string;
    payload?: unknown;
    timestamp: number;
}

const debugSlice = createSlice({
    name: "debug",
    initialState: {
        actions: [] as DebugAction[]
    },
    reducers: {
        logActions(state, action: PayloadAction<DebugAction>) {
            state.actions.push(action.payload);
            if (state.actions.length > 5) {
                state.actions.shift()
            }
        },
        clearActions(state) {
            state.actions = [];
        }
    }
});

export const { logActions, clearActions } = debugSlice.actions;
export default debugSlice.reducer;