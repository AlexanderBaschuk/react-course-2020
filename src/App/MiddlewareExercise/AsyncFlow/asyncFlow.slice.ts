import { createSlice } from '@reduxjs/toolkit'

export interface IAsyncFlowState {
	isLoading: boolean
	swPeople: Object
}

const asyncFlowInitialState: IAsyncFlowState = {
	isLoading: false,
	swPeople: { names: ['Luke', 'Lea', 'Darth'] },
}

export const asyncFlowSlice = createSlice({
	name: 'asyncFlow',
	initialState: asyncFlowInitialState,
	reducers: {
		changePeople(state, action) {
			return state
		},
	},
})
