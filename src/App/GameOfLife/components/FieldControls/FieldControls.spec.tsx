import React from 'react'
import { mount } from 'enzyme'
import { FieldControls } from '.'

describe('Field controls', () => {
	it('should set density 0 when pressing the Clear button', () => {
		const setDensityMock = jest.fn()

		const el = mount(
			<FieldControls
				rowCount={5}
				colCount={10}
				setSize={jest.fn()}
				density={0.5}
				setDensity={setDensityMock}
			/>,
		)
		const clearButton = el.find('div button')
		clearButton.simulate('click')
		expect(setDensityMock).toHaveBeenCalledWith(0)
	})

	it('should call setSize with correct values when changing the size', () => {
		const setSizeMock = jest.fn()

		const el = mount(
			<FieldControls
				rowCount={5}
				colCount={10}
				setSize={setSizeMock}
				density={0.5}
				setDensity={jest.fn()}
			/>,
		)
		const fieldSizeForm = el.find('form').at(0)
		const rowsInput = fieldSizeForm.find('input[type="text"]').at(0)
		rowsInput.getDOMNode<HTMLInputElement>().value = '15';
		rowsInput.simulate('change')

		const columnsInput = fieldSizeForm.find('input[type="text"]').at(1)
		columnsInput.getDOMNode<HTMLInputElement>().value = '20';
		columnsInput.simulate('change')

		const submitButton = fieldSizeForm.find('input[type="submit"]')
		submitButton.simulate('submit')

		expect(setSizeMock).toHaveBeenCalledWith(15, 20)
	})

	it('should call setSpeed when submitting speed change', () => {
		const densityMock = jest.fn()

		const el = mount(
			<FieldControls
				rowCount={5}
				colCount={10}
				setSize={jest.fn()}
				density={0.5}
				setDensity={densityMock}
			/>,
		)
		const densityForm = el.find('form').at(1)
		const rowsInput = densityForm.find('input[type="text"]')
		rowsInput.getDOMNode<HTMLInputElement>().value = '0.8';
		rowsInput.simulate('change')

		const submitButton = densityForm.find('input[type="submit"]')
		submitButton.simulate('submit')

		expect(densityMock).toHaveBeenCalledWith(0.8)
	})
})
