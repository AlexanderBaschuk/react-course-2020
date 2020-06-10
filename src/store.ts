import { Field } from './App/GameOfLife/engine'
import { IGameOfLifeState } from './App/GameOfLife/gameOfLife.state'
import { configureStore } from '@reduxjs/toolkit'

interface IState {
	gameOfLife: IGameOfLifeState
}

export const reducer = (state: IState) => state

export const store = configureStore({
	reducer,
})
