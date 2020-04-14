import { mount } from 'enzyme'
import React from 'react'
import Cell from './Cell'

describe('Cell', () => {
	test.each`
		isAlive  | expectedColor
		${true}  | ${'#000'}
		${false} | ${'#EEE'}
	`(
		'should have color $expectedColor when isAlive is $isAlive',
		({ isAlive, expectedColor }) => {
			const cell = mount(<Cell size={10} isAlive={isAlive} />)
			const actualColor = cell.find('div').prop('style').backgroundColor
			expect(actualColor).toBe(expectedColor)
		},
	)
})
