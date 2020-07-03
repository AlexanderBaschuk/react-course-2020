import { History, createMemoryHistory } from 'history'

import { App } from './App'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { Store } from '@reduxjs/toolkit'
import createMockStore from 'redux-mock-store'
import { gameOfLifeInitialState } from './GameOfLife/gameOfLife.state'
import { mount } from 'enzyme'

const store = createMockStore()({ gameOfLife: gameOfLifeInitialState })
const mountWithWrappers = (jsx: JSX.Element, store: Store, history: History) =>
	mount(
		<Provider store={store}>
			<Router history={history}>{jsx}</Router>
		</Provider>,
	)

describe('App routing', () => {
	it('should initially redirect to login page', () => {
		const history = createMemoryHistory()
		const app = mountWithWrappers(<App />, store, history)
		expect(history.location.pathname).toBe('/login')

		const prompt = app.find('h1').text()
		expect(prompt).toBe('Enter your name')
	})

	it('should redirect to root after login', () => {
		const history = createMemoryHistory()
		history.push('/login')
		const app = mountWithWrappers(<App />, store, history)

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
