import { shallow } from 'enzyme'
import React from 'react'
import { MagicButton } from './MagicButton'

const incrementMock = jest.fn()

test('Default render', () => {
	expect(
		shallow(<MagicButton increment={incrementMock} count={2}/>).matchesElement(
			<button>Button ||</button>,
		),
	).toBe(true)
})
