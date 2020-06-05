import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IAsyncFlowState {
	isLoading: boolean
	swPeople: Object
}

const asyncFlowInitialState: IAsyncFlowState = {
	isLoading: false,
	swPeople: 'Click the button to load them!',
}

export const asyncFlowSlice = createSlice({
	name: 'asyncFlow',
	initialState: asyncFlowInitialState,
	reducers: {
		changePeople(state, action: PayloadAction<Object>) {
			state.isLoading = false
			state.swPeople = action.payload
		},
		setIsLoading(state, action?: PayloadAction<boolean>) {
			state.isLoading = action?.payload ?? true
		},
	},
})

export const { changePeople, setIsLoading } = asyncFlowSlice.actions
