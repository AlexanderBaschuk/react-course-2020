import { GameOfLife } from "./GameOfLife"
import { mount } from "enzyme"
import React from 'react'

const findCell = (field: any, row: number, column: number) => {
	return field.find({ row, column })
}

describe('Game of Life field', () => {
	it('should change cell color when the cell is clicked', () => {
		const field = mount(<GameOfLife rowCount={2} colCount={2} cellSize={10} />)
		const initialCell = findCell(field, 0, 0)

		initialCell.simulate('click')

		const resultCell = findCell(field, 0, 0)
		const isAlive = resultCell.props().isAlive
		expect(isAlive).toBeTruthy()
	})

	it('should not change other cells color when a cell is clicked', () => {
		const field = mount(<GameOfLife rowCount={2} colCount={2} cellSize={10} />)
		const initialCell = findCell(field, 0, 0)

		initialCell.simulate('click')

		expect(findCell(field, 0, 1).props().isAlive).toBeFalsy()
		expect(findCell(field, 1, 0).props().isAlive).toBeFalsy()
		expect(findCell(field, 1, 1).props().isAlive).toBeFalsy()
	})
})
