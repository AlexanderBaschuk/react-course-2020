import { DEFAULT_EXTENSIONS } from "@babel/core";
import { Field } from "./engine";

export interface IGameOfLifeState {
	autoplay: boolean
	speed: number
	density: number
	field: Field
}

export const gameOfLifeInitialState: IGameOfLifeState = {
	autoplay: false,
	speed: 100,
	density: 0.4,
	field: undefined,
}