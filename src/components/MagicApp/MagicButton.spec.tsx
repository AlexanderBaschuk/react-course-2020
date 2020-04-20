import { shallow } from 'enzyme'
import React from 'react'
import { MagicButton } from './MagicButton'

const incrementMock = jest.fn()

describe('Magic Button', () => {
	test('Default render', () => {
		const button = shallow(<MagicButton increment={incrementMock} count={0} />)
		expect(button.matchesElement(<button>Button </button>)).toBe(true)
	})

	test('Render with count', () => {
		const button = shallow(<MagicButton increment={incrementMock} count={2} />)
		expect(button.matchesElement(<button>Button ||</button>)).toBe(true)
	})

	it('should call increment when clicked', () => {
		const button = shallow(<MagicButton increment={incrementMock} count={2} />)
		button.find('button').simulate('click')
		expect(incrementMock).toBeCalledTimes(1)
	})
})
