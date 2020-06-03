import { configureStore } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { rootReducer } from "./reducer";

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: initialState,
});
