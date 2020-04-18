import { mount } from 'enzyme'
import React from 'react'
import { Cell } from './Cell'

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
