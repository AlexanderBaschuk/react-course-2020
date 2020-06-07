import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = (state) => state

export type IState = ReturnType<typeof rootReducer>

export const store = configureStore({
	reducer: rootReducer,
})
