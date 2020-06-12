import { App } from './App'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import createMockStore from 'redux-mock-store'
import { gameOfLifeInitialState } from './GameOfLife/gameOfLife.state'
import { mount } from 'enzyme'

const store = createMockStore()({ gameOfLife: gameOfLifeInitialState })

describe('App routing', () => {
	it('should initially redirect to login page', () => {
		const history = createMemoryHistory()
		const app = mount(
			<Provider store={store}>
				<Router history={history}>
					<App />
				</Router>
			</Provider>,
		)
		expect(history.location.pathname).toBe('/login')

		const prompt = app.find('h1').text()
		expect(prompt).toBe('Enter your name')
	})

	it('should redirect to root after login', () => {
		const history = createMemoryHistory()
		history.push('/login')
		const app = mount(
			<Provider store={store}>
				<Router history={history}>
					<App />
				</Router>
			</Provider>,
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
