import { Field, invertOneCell } from './engine'
import { IGameOfLifeState, gameOfLifeInitialState } from './gameOfLife.state'
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit'

export interface Coordinates {
	row: number
	col: number
}

export interface FieldSize {
	rowCount: number
	colCount: number
}

export const gameOfLifeSlice = createSlice({
	name: 'gameOfLife',
	initialState: gameOfLifeInitialState,
	reducers: {
		setField(state: IGameOfLifeState, action: PayloadAction<Field>) {
			state.field = action.payload
		},
		changeCell(state: IGameOfLifeState, action: PayloadAction<Coordinates>) {
			state.field = invertOneCell(state.field, action.payload.row, action.payload.col)
		},
		toggleAutoplay(state: IGameOfLifeState) {
			state.autoplay = !state.autoplay
		},
		setSpeed(state: IGameOfLifeState, action: PayloadAction<number>) {
			if (action.payload > 0) {
				state.speed = action.payload
			}
		},
	},
})

export const initAction = createAction<number>('gameOfLife/init')
export const resetAction = createAction<number>('gameOfLife/reset')
export const resizeAction = createAction<FieldSize>('gameOfLife/resize')
export const stepAction = createAction('gameOfLife/step')

export const {
	setField,
	changeCell,
	toggleAutoplay,
	setSpeed,
} = gameOfLifeSlice.actions
