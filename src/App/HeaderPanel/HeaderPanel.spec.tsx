import { HeaderPanel } from "."
import React from "react"
import { mount } from "enzyme"

describe('Playback controls', () => {
	it('should show user name', () => {
		const field = mount(<HeaderPanel username="John" logOut={jest.fn()} />)
		expect(field.find('h1').text()).toBe('Hello, John')
	})

	it('should call logOut when the button is clicked', () => {
		const logOutMock = jest.fn()
		const field = mount(<HeaderPanel username="John" logOut={logOutMock} />)
		
		field.find('div button').simulate('click')

		expect(logOutMock).toHaveBeenCalledTimes(1)
	})
})