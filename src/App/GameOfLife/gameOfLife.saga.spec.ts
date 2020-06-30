import * as matchers from 'redux-saga-test-plan/matchers'

import { Field, calculateNextField, getInitialState, resize } from './engine'
import { IGameOfLifeState, gameOfLifeInitialState } from './gameOfLife.state'
import { IState, reducer } from '@/store'
import {
	resetAction,
	resizeAction,
	setField,
	stepAction,
} from './gameOfLife.slice'

import { createNextState } from '@reduxjs/toolkit'
import { expectSaga } from 'redux-saga-test-plan'
import { gameOfLifeSaga } from './gameOfLife.saga'

expectSaga.DEFAULT_TIMEOUT = 50

const initState = (modifier: (gameState: IGameOfLifeState) => void): IState => {
	const gameOfLifeInit = createNextState(gameOfLifeInitialState, modifier)
	return { gameOfLife: gameOfLifeInit }
}

const expectGameSaga = (state: IState) => {
	return expectSaga(gameOfLifeSaga).withReducer(reducer, state)
}

describe('resize', () => {
	it('should resize field', () => {
		const initialField = {
			rowCount: 2,
			colCount: 2,
			cells: [
				[false, true],
				[true, false],
			],
		}

		const state = initState((state) => {
			state.field = initialField
		})

		const resizedField: Field = {
			rowCount: 3,
			colCount: 3,
			cells: [
				[false, true, false],
				[true, false, false],
				[false, false, false],
			],
		}

		return expectGameSaga(state)
			.provide([[matchers.call.fn(resize), resizedField]])
			.dispatch(resizeAction({ rowCount: 3, colCount: 3 }))
			.call(resize, initialField, 3, 3)
			.put(setField(resizedField))
			.run()
	})
})

describe('reset', () => {
	it('should reset field', () => {
		const initialField = {
			rowCount: 2,
			colCount: 2,
			cells: [
				[false, true],
				[true, false],
			],
		}
		const state = initState((state) => {
			state.field = initialField
		})

		const regeneratedField: Field = {
			rowCount: 2,
			colCount: 2,
			cells: [
				[true, true],
				[true, true],
			],
		}

		return expectGameSaga(state)
			.provide([[matchers.call.fn(getInitialState), regeneratedField]])
			.dispatch(resetAction(0.4))
			.call(getInitialState, 2, 2, 0.4)
			.put(setField(regeneratedField))
			.run()
	})
})

describe('step', () => {
	it('should perform single step', () => {
		const initialField = {
			rowCount: 2,
			colCount: 2,
			cells: [
				[false, true],
				[true, false],
			],
		}
		const state = initState((state) => {
			state.field = initialField
		})

		const resultField: Field = {
			rowCount: 2,
			colCount: 2,
			cells: [
				[true, false],
				[false, true],
			],
		}

		return expectGameSaga(state)
			.provide([[matchers.call.fn(calculateNextField), resultField]])
			.dispatch(stepAction())
			.call(calculateNextField, initialField)
			.put(setField(resultField))
			.run()
	})
})
