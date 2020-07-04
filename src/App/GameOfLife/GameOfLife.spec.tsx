import { changeCell, setField } from './gameOfLife.slice'

import { Field } from './engine'
import { GameOfLife } from './GameOfLife'
import { Provider } from 'react-redux'
import React from 'react'
import createMockStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { reducer } from '@/store'

const field: Field = {
	rowCount: 2,
	colCount: 2,
	cells: [
		[false, false],
		[false, false],
	],
}

const getCell = (field: any, row: number, column: number) => {
	const result = field.find(
		`Styled(div)[data-row=${row}][data-column=${column}]`,
	)
	expect(result).toBeDefined()
	expect(result.length).toBe(1)
	return result
}

const createStore = () => {
	const mockStore = createMockStore()
	const initialState = reducer(undefined, { type: 'get_initial_state' })
	const store = mockStore(initialState)
	store.dispatch(setField(field))
	store.clearActions()
	return store
}

describe('Game of Life field', () => {
	it('should dispatch change cell when the cell is clicked', () => {
		const store = createStore()
		const field = mount(
			<Provider store={store}>
				<GameOfLife cellSize={10} />
			</Provider>,
		)

		const initialCell = getCell(field, 0, 0)
		initialCell.simulate('click')

		const changeCellActions = store
			.getActions()
			.filter((action) => action.type === changeCell.type)
		expect(changeCellActions).toHaveLength(1)
		expect(changeCellActions).toContainEqual(changeCell({ row: 0, col: 0 }))
	})
})
