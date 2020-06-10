import { IState } from "src/store"
import { createSelector } from "@reduxjs/toolkit"

const gameOfLifeSelector = (state: IState) => state.gameOfLife

export const fieldSelector = createSelector(
	gameOfLifeSelector,
	(gameOfLife) => gameOfLife.field,
)

export const autoplaySelector = createSelector(
	gameOfLifeSelector,
	(gameOfLife) => gameOfLife.autoplay,
)

export const densitySelector = createSelector(
	gameOfLifeSelector,
	(gameOfLife) => gameOfLife.density,
)

export const speedSelector = createSelector(
	gameOfLifeSelector,
	(gameOfLife) => gameOfLife.speed,
)
