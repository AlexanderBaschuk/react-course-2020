import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IAsyncFlowState {
	isLoading: boolean
	swPeople: Object
	error?: string
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
			state.error = undefined
			state.swPeople = action.payload
		},
		setIsLoading(state, action?: PayloadAction<boolean>) {
			state.error = undefined
			state.isLoading = action?.payload ?? true
		},
		setErrorMessage(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export const { changePeople, setIsLoading, setErrorMessage } = asyncFlowSlice.actions
