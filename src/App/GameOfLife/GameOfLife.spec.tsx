import { GameOfLife } from "./GameOfLife"
import React from 'react'
import { mount } from "enzyme"

const getCell = (field: any, row: number, column: number) => {
	const result = field.find(`Styled(div)[data-row=${row}][data-column=${column}]`)
	expect(result).toBeDefined()
	expect(result.length).toBe(1)
	return result
}

describe('Game of Life field', () => {
	it('should change cell color when the cell is clicked', () => {
		const field = mount(<GameOfLife cellSize={10} />)
		const initialCell = getCell(field, 0, 0)

		initialCell.simulate('click')

		const resultCell = getCell(field, 0, 0)
		expect(resultCell.props().isAlive).toBeTruthy()
	})

	it('should not change other cells color when a cell is clicked', () => {
		const field = mount(<GameOfLife cellSize={10} />)
		const initialCell = getCell(field, 0, 0)

		initialCell.simulate('click')

		expect(getCell(field, 0, 1).props().isAlive).toBeFalsy()
		expect(getCell(field, 1, 0).props().isAlive).toBeFalsy()
		expect(getCell(field, 1, 1).props().isAlive).toBeFalsy()
	})
})
