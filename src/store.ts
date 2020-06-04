import { Action, ThunkAction, combineReducers } from '@reduxjs/toolkit'

import { asyncFlowSlice } from './App/MiddlewareExercise/AsyncFlow/asyncFlow.slice'
import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
	asyncFlow: asyncFlowSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
	reducer: rootReducer,
})

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
