import * as matchers from 'redux-saga-test-plan/matchers'

import { Field, calculateNextField, getInitialState, resize } from './engine'
import { IGameOfLifeState, gameOfLifeInitialState } from './gameOfLife.state'
import { IState, reducer } from '../../store'
import { resetAction, resizeAction, stepAction } from './gameOfLife.slice'

import { expectSaga } from 'redux-saga-test-plan'
import { gameOfLifeSaga } from './gameOfLife.saga'
import produce from 'immer'

const initState = (modifier: (gameState: IGameOfLifeState) => void): IState => {
	const gameOfLifeInit = produce(gameOfLifeInitialState, modifier)
	return { gameOfLife: gameOfLifeInit }
}

const expectGameSaga = (state: IState) => {
	return expectSaga(gameOfLifeSaga).withReducer(reducer, state)
}

jest.mock('./engine')

describe('resize', () => {
	it('should call engine.resize() with current field', async () => {
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

		await expectGameSaga(state)
			.dispatch(resizeAction({ rowCount: 3, colCount: 3 }))
			.run()

		expect(resize).toBeCalledWith(initialField, 3, 3)
	})

	it('should resize field', async () => {
		const state = initState((state) => {
			state.field = {
				rowCount: 2,
				colCount: 2,
				cells: [
					[false, true],
					[true, false],
				],
			}
		})

		const expectedField: Field = {
			rowCount: 3,
			colCount: 3,
			cells: [
				[false, true, false],
				[true, false, false],
				[false, false, false],
			],
		}

		;(resize as jest.Mock).mockImplementation(() => expectedField)

		const result = await expectGameSaga(state)
			.dispatch(resizeAction({ rowCount: 3, colCount: 3 }))
			.run()

		expect(result.storeState.gameOfLife.field).toEqual(expectedField)
	})
})

describe('reset', () => {
	it('should reset field', async () => {
		const state = initState((state) => {
			state.field = {
				rowCount: 2,
				colCount: 2,
				cells: [
					[false, true],
					[true, false],
				],
			}
		})

		const mockedField: Field = {
			rowCount: 2,
			colCount: 2,
			cells: [
				[true, true],
				[true, true],
			],
		}

		const result = await expectGameSaga(state)
			.provide([[matchers.call.fn(getInitialState), mockedField]])
			.dispatch(resetAction(0.4))
			.run()

		expect(result.storeState.gameOfLife.field).toEqual(mockedField)
	})
})

describe('step', () => {
	it('should perform single step', async () => {
		const state = initState((state) => {
			state.field = {
				rowCount: 2,
				colCount: 2,
				cells: [
					[false, true],
					[true, false],
				],
			}
		})

		const mockedField: Field = {
			rowCount: 2,
			colCount: 2,
			cells: [
				[true, true],
				[true, true],
			],
		}

		const result = await expectGameSaga(state)
			.provide([[matchers.call.fn(calculateNextField), mockedField]])
			.dispatch(stepAction())
			.run()

		expect(result.storeState.gameOfLife.field).toEqual(mockedField)
	})
})
