import { mount } from 'enzyme'
import React from 'react'
import Cell from './Cell'
import GameOfLife from './GameOfLife'

const liveCellColor = '#000'
const deadCellColor = '#EEE'

describe('Cell appearance', () => {
	test.each`
		isAlive  | expectedColor
		${true}  | ${liveCellColor}
		${false} | ${deadCellColor}
	`(
		'should have color $expectedColor when isAlive is $isAlive',
		({ isAlive, expectedColor }) => {
			const cell = mount(
				<Cell size={10} isAlive={isAlive} onClick={jest.fn()} />,
			)
			const actualColor = cell.find('div').prop('style').backgroundColor
			expect(actualColor).toBe(expectedColor)
		},
	)
})

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

	it.skip('should not change other cell color when a cell is clicked', () => {})
})
