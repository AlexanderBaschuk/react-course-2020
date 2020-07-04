import { resetAction, resizeAction } from '@/App/GameOfLife/gameOfLife.slice'

import { FieldControls } from '.'
import { Provider } from 'react-redux'
import React from 'react'
import configureStore from 'redux-mock-store'
import { gameOfLifeInitialState } from '@/App/GameOfLife/gameOfLife.state'
import { mount } from 'enzyme'

const createStore = () => {
	const mockStore = configureStore()
	return mockStore({ gameOfLife: gameOfLifeInitialState })
}

describe('Field controls', () => {
	it('should set density 0 when pressing the Clear button', () => {
		const store = createStore()
		const el = mount(
			<Provider store={store}>
				<FieldControls />
			</Provider>,
		)

		const clearButton = el.find('div button')
		clearButton.simulate('click')
		expect(store.getActions()).toContainEqual(resetAction(0))
	})

	it('should call setSize with correct values when changing the size', () => {
		const store = createStore()
		const el = mount(
			<Provider store={store}>
				<FieldControls />
			</Provider>,
		)

		const fieldSizeForm = el.find('form').at(0)
		const rowsInput = fieldSizeForm.find('input[type="text"]').at(0)
		rowsInput.getDOMNode<HTMLInputElement>().value = '15'
		rowsInput.simulate('change')

		const columnsInput = fieldSizeForm.find('input[type="text"]').at(1)
		columnsInput.getDOMNode<HTMLInputElement>().value = '20'
		columnsInput.simulate('change')

		const submitButton = fieldSizeForm.find('input[type="submit"]')
		submitButton.simulate('submit')

		expect(store.getActions()).toContainEqual(
			resizeAction({ rowCount: 15, colCount: 20 }),
		)
	})

	it('should call setSpeed when submitting speed change', () => {
		const store = createStore()
		const el = mount(
			<Provider store={store}>
				<FieldControls />
			</Provider>,
		)

		const densityForm = el.find('form').at(1)
		const rowsInput = densityForm.find('input[type="text"]')
		rowsInput.getDOMNode<HTMLInputElement>().value = '0.8'
		rowsInput.simulate('change')

		const submitButton = densityForm.find('input[type="submit"]')
		submitButton.simulate('submit')

		expect(store.getActions()).toContainEqual(resetAction(0.8))
	})
})
