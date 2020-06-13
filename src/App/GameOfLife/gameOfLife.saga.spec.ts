import * as matchers from 'redux-saga-test-plan/matchers'

import { Field, getInitialState, resize } from './engine'
import { IGameOfLifeState, gameOfLifeInitialState } from './gameOfLife.state'
import { IState, reducer } from '../../store'
import { resetAction, resizeAction } from './gameOfLife.slice'

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

it('should resize field up', async () => {
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

	const result = await expectGameSaga(state)
		.dispatch(resizeAction({ rowCount: 3, colCount: 3 }))
		.run()
	expect(result.storeState.gameOfLife.field).toEqual(expectedField)
})

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
