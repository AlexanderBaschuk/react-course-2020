import { asyncFlowSlice } from './App/MiddlewareExercise/AsyncFlow/asyncFlow.slice'
import { combineReducers } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
	asyncFlow: asyncFlowSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
	reducer: rootReducer,
	middleware: [],
})
