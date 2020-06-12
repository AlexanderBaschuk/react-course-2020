import { setAutoplay, setSpeed, stepAction } from '../../gameOfLife.slice'

import { PlaybackControls } from '.'
import { Provider } from 'react-redux'
import React from 'react'
import configureStore from 'redux-mock-store'
import { gameOfLifeInitialState } from '../../gameOfLife.state'
import { mount } from 'enzyme'

const createStore = () => {
	const mockStore = configureStore()
	return mockStore({ gameOfLife: gameOfLifeInitialState })
}

describe('Playback controls', () => {
	it('should dispatch step when pressing the Step button', () => {
		const store = createStore()
		const el = mount(
			<Provider store={store}>
				<PlaybackControls />
			</Provider>,
		)
		const stepButton = el.find('button[data-testid="step-button"]')
		stepButton.simulate('click')
		expect(store.getActions()).toContainEqual(stepAction())
	})

	it('should dispatch setAutoplay when pressing the Play button', () => {
		const store = createStore()
		const el = mount(
			<Provider store={store}>
				<PlaybackControls />
			</Provider>,
		)
		const stepButton = el.find('button[data-testid="start-stop-button"]')
		stepButton.simulate('click')
		expect(store.getActions()).toContainEqual(setAutoplay())
	})

	it('should dispatch setSpeed when submitting speed change', () => {
		const store = createStore()
		const el = mount(
			<Provider store={store}>
				<PlaybackControls />
			</Provider>,
		)
		const speedInput = el.find('form input[type="text"]')
		speedInput.getDOMNode<HTMLInputElement>().value = '10'
		speedInput.simulate('change')
		el.find('form input[type="submit"]').simulate('submit')
		expect(store.getActions()).toContainEqual(setSpeed(100))
	})

	it('should dispatch setSpeed when decreasing speed', () => {
		const store = createStore()
		const el = mount(
			<Provider store={store}>
				<PlaybackControls />
			</Provider>,
		)
		const speedInput = el.find('form input[type="text"]')
		speedInput.getDOMNode<HTMLInputElement>().value = '11'
		speedInput.simulate('change')
		const decreaseButton = el.find('button').at(2)
		decreaseButton.simulate('click')
		expect(store.getActions()).toContainEqual(setSpeed(100))
	})

	it('should dispatch setSpeed when increasing speed', () => {
		const store = createStore()
		const el = mount(
			<Provider store={store}>
				<PlaybackControls />
			</Provider>,
		)
		const speedInput = el.find('form input[type="text"]')
		speedInput.getDOMNode<HTMLInputElement>().value = '9'
		speedInput.simulate('change')
		const increaseButton = el.find('button').at(3)
		increaseButton.simulate('click')
		expect(store.getActions()).toContainEqual(setSpeed(100))
	})
})
