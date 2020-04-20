import { shallow } from 'enzyme'
import React from 'react'
import { HelloUser } from './HelloUser'

describe('HelloUser', () => {
	test.each`
		userName    | expectedText
		${'World'}  | ${'Hello, World!'}
		${'Mozart'} | ${'Hello, Mozart!'}
	`(
		'should insert user name ($userName) in the text',
		({ userName, expectedText }) => {
			const hello = shallow(<HelloUser userName={userName} />)
			expect(hello.matchesElement(<h1>{expectedText}</h1>)).toBe(true)
		},
	)
})
