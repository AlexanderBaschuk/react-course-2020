export interface IState {
	asyncFlow: IAsyncFlowState
}

export interface IAsyncFlowState {
	isLoading: boolean
	swPeople: Object
}

export const initialState: IState = {
	asyncFlow: { isLoading: false, swPeople: { names: ['Luke', 'OWK', 'Yoda'] } },
}
