import React from 'react'
import { mount } from 'enzyme'
import { PlaybackControls } from '.'

describe('Playback controls', () => {
	it('should call step when pressing the Step button', () => {
		const setpMock = jest.fn()

		const el = mount(
			<PlaybackControls
				isPlaying={false}
				step={setpMock}
				togglePlay={jest.fn()}
				setSpeed={jest.fn()}
			/>,
		)
		const stepButton = el.find('button').at(0)
		stepButton.simulate('click')
		expect(setpMock).toHaveBeenCalled()
	})

	it('should call togglePlay when pressing the Play button', () => {
		const playMock = jest.fn()

		const el = mount(
			<PlaybackControls
				isPlaying={false}
				step={jest.fn()}
				togglePlay={playMock}
				setSpeed={jest.fn()}
			/>,
		)
		const stepButton = el.find('button').at(1)
		stepButton.simulate('click')
		expect(playMock).toHaveBeenCalled()
	})

	it('should call setSpeed when submitting speed change', () => {
		const setSpeedMock = jest.fn()

		const el = mount(
			<PlaybackControls
				isPlaying={false}
				step={jest.fn()}
				togglePlay={jest.fn()}
				setSpeed={setSpeedMock}
			/>,
		)
		const speedInput = el.find('form input[type="text"]')
		speedInput.getDOMNode<HTMLInputElement>().value = '15';
		speedInput.simulate('change')
		el.find('form input[type="submit"]').simulate('submit')
		expect(setSpeedMock).toHaveBeenCalledWith(15)
	})

	it('should call setSpeed when decreasing speed', () => {
		const setSpeedMock = jest.fn()

		const el = mount(
			<PlaybackControls
				isPlaying={false}
				step={jest.fn()}
				togglePlay={jest.fn()}
				setSpeed={setSpeedMock}
			/>,
		)
		const speedInput = el.find('form input[type="text"]')
		speedInput.getDOMNode<HTMLInputElement>().value = '15';
		speedInput.simulate('change')
		const decreaseButton = el.find('form button').at(0)
		decreaseButton.simulate('click')
		expect(setSpeedMock).toHaveBeenCalledWith(14)
	})

	it('should call setSpeed when increasing speed', () => {
		const setSpeedMock = jest.fn()

		const el = mount(
			<PlaybackControls
				isPlaying={false}
				step={jest.fn()}
				togglePlay={jest.fn()}
				setSpeed={setSpeedMock}
			/>,
		)
		const speedInput = el.find('form input[type="text"]')
		speedInput.getDOMNode<HTMLInputElement>().value = '15';
		speedInput.simulate('change')
		const increaseButton = el.find('form button').at(1)
		increaseButton.simulate('click')
		expect(setSpeedMock).toHaveBeenCalledWith(16)
	})
})