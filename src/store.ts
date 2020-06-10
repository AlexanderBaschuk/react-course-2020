import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { gameOfLifeSlice } from './App/GameOfLife/gameOfLife.slice'

export const reducer = combineReducers({
	gameOfLife: gameOfLifeSlice.reducer,
})

export const store = configureStore({
	reducer,
})

export type IState = ReturnType<typeof reducer>
