import renderer from 'react-test-renderer'
import { CellStyled } from './CellStyled'
import React from 'react'

test.each`
	cellSize | isAlive
	${10}    | ${true}
	${20}    | ${true}
	${20}    | ${false}
`('Cell snapshot test', ({ cellSize, isAlive }) => {
	const cell = renderer
		.create(<CellStyled cellSize={cellSize} isAlive={isAlive} />)
		.toJSON()
	expect(cell).toMatchSnapshot()
})
