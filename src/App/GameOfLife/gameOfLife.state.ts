import { Field } from './engine'

export const DEFAULT_DENSITY = 0.4
export const DEFAULT_ROW_COUNT = 10
export const DEFAULT_COL_COUNT = 10

export interface IGameOfLifeState {
	autoplay: boolean
	speed: number
	field: Field
}

export const gameOfLifeInitialState: IGameOfLifeState = {
	autoplay: false,
	speed: 100,
	field: [[false]],
}
