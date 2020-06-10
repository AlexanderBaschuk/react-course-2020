import { IGameOfLifeState, gameOfLifeInitialState } from './gameOfLife.state'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Field } from './engine'

export const gameOfLifeSlice = createSlice({
	name: 'gameOfLife',
	initialState: gameOfLifeInitialState,
	reducers: {
		setField(state: IGameOfLifeState, action: PayloadAction<Field>) {
			state.field = action.payload
		},
		setAutoplay(state: IGameOfLifeState, action: PayloadAction<boolean>) {
			state.autoplay = action.payload
		},
		saveDensity(state: IGameOfLifeState, action: PayloadAction<number>) {
			state.density = action.payload
		},
		setSpeed(state: IGameOfLifeState, action: PayloadAction<number>) {
			if (action.payload > 0 ) {
				state.speed = action.payload
			}
		},
	},
})

export const { setField, setAutoplay, saveDensity, setSpeed } = gameOfLifeSlice.actions
