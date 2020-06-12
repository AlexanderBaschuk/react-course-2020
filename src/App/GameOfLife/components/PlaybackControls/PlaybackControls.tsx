import {
	ControlWrapperStyled,
	InputLabelStyled,
	InputStyled,
	PlaybackControlsAreaStyled,
	PlaybackControlsWrapperStyled,
} from './PlaybackControls.styles'
import React, { useCallback, useRef } from 'react'
import { setAutoplay, setSpeed, stepAction } from '../../gameOfLife.slice'
import { useDispatch, useSelector } from 'react-redux'

import { autoplaySelector } from '../../gameOfLife.selectors'

export const PlaybackControls: React.FC = () => {
	const dispatch = useDispatch()
	const isAutoplay = useSelector(autoplaySelector)
	const speedInput = useRef<HTMLInputElement>()

	const togglePlay = useCallback(() => {
		dispatch(setAutoplay())
	}, [dispatch])

	const step = useCallback((): void => {
		dispatch(stepAction())
	}, [dispatch])

	const setSpeedInternal = useCallback(
		(value) => {
			dispatch(setSpeed(value === 0 ? 0 : 1000 / value))
		},
		[dispatch],
	)

	const changeSpeed = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			const newSpeed = Number(speedInput.current.value)
			setSpeedInternal(newSpeed)
		},
		[setSpeedInternal],
	)

	const increaseSpeed = useCallback(() => {
		const newSpeed = Number(speedInput.current.value) + 1
		speedInput.current.value = newSpeed.toString()
		setSpeedInternal(newSpeed)
	}, [setSpeedInternal])

	const decreaseSpeed = useCallback(() => {
		const newSpeed = Number(speedInput.current.value) - 1
		speedInput.current.value = newSpeed.toString()
		setSpeedInternal(newSpeed)
	}, [setSpeedInternal])

	return (
		<PlaybackControlsWrapperStyled>
			<PlaybackControlsAreaStyled>
				<ControlWrapperStyled>
					<button data-testid="start-stop-button" onClick={togglePlay}>
						{isAutoplay ? 'Stop' : 'Start'}
					</button>
				</ControlWrapperStyled>
				<ControlWrapperStyled>
					<button data-testid="step-button" onClick={step}>
						1 Step
					</button>
				</ControlWrapperStyled>
			</PlaybackControlsAreaStyled>
			<PlaybackControlsAreaStyled>
				<form onSubmit={changeSpeed}>
					<ControlWrapperStyled>
						<InputLabelStyled>Speed:</InputLabelStyled>
						<InputStyled type="text" defaultValue={10} ref={speedInput} />
					</ControlWrapperStyled>
					<ControlWrapperStyled>
						<input type="submit" value="Set" />
					</ControlWrapperStyled>
				</form>
				<ControlWrapperStyled>
					<button onClick={decreaseSpeed}>-</button>
					<button onClick={increaseSpeed}>+</button>
				</ControlWrapperStyled>
			</PlaybackControlsAreaStyled>
		</PlaybackControlsWrapperStyled>
	)
}
