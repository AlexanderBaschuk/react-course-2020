import {
	ControlWrapperStyled,
	InputLabelStyled,
	InputStyled,
	PlaybackControlsAreaStyled,
	PlaybackControlsWrapperStyled,
} from './PlaybackControls.styles'
import React, { useCallback, useRef } from 'react'

interface PlaybackControlsProps {
	isPlaying: boolean
	step: () => void
	togglePlay: () => void
	setSpeed: (value: number) => void
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
	isPlaying,
	step,
	togglePlay,
	setSpeed,
}) => {
	const speedInput = useRef<HTMLInputElement>()

	const changeSpeed = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			const newSpeed = Number(speedInput.current.value)
			setSpeed(newSpeed)
		},
		[setSpeed],
	)

	const increaseSpeed = useCallback(() => {
		const newSpeed = Number(speedInput.current.value) + 1
		speedInput.current.value = newSpeed.toString()
		setSpeed(newSpeed)
	}, [setSpeed])

	const decreaseSpeed = useCallback(() => {
		const newSpeed = Number(speedInput.current.value) - 1
		speedInput.current.value = newSpeed.toString()
		setSpeed(newSpeed)
	}, [setSpeed])

	return (
		<PlaybackControlsWrapperStyled>
			<PlaybackControlsAreaStyled>
				<ControlWrapperStyled>
					<button data-testid="start-stop-button" onClick={togglePlay}>
						{isPlaying ? 'Stop' : 'Start'}
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
					<ControlWrapperStyled>
						<button onClick={decreaseSpeed}>-</button>
						<button onClick={increaseSpeed}>+</button>
					</ControlWrapperStyled>
				</form>
			</PlaybackControlsAreaStyled>
		</PlaybackControlsWrapperStyled>
	)
}
