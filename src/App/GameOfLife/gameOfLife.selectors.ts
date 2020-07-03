import { State } from 'src/store'
import { createSelector } from '@reduxjs/toolkit'

const gameOfLifeSelector = (state: State) => state.gameOfLife

export const fieldSelector = createSelector(
	gameOfLifeSelector,
	(gameOfLife) => gameOfLife.field,
)

export const autoplaySelector = createSelector(
	gameOfLifeSelector,
	(gameOfLife) => gameOfLife.autoplay,
)

export const speedSelector = createSelector(
	gameOfLifeSelector,
	(gameOfLife) => gameOfLife.speed,
)
