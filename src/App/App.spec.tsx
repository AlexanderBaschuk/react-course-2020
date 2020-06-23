import { MemoryRouter, Router } from 'react-router-dom'

import { App } from './App'
import React from 'react'
import { createMemoryHistory } from 'history'
import { mount } from 'enzyme'

describe('App routing', () => {
	it('should initially redirect to login page', () => {
		const history = createMemoryHistory()
		const app = mount(
			<Router history={history}>
				<App />
			</Router>,
		)
		expect(history.location.pathname).toBe('/login')

		const prompt = app.find('h1').text()
		expect(prompt).toBe('Enter your name')
	})

	it('should redirect to root after login', () => {
		const history = createMemoryHistory()
		history.push('/login')
		const app = mount(
			<Router history={history}>
				<App />
			</Router>,
		)

		const loginInput = app.find('input[type="text"]')
		loginInput.getDOMNode<HTMLInputElement>().value = 'John'
		loginInput.simulate('change')

		const loginButton = app.find('input[type="submit"]')
		loginButton.simulate('submit')

		expect(history.location.pathname).toBe('/')

		const greeting = app.find('div h1').text()
		expect(greeting).toBe('Hello, john')
	})
})
