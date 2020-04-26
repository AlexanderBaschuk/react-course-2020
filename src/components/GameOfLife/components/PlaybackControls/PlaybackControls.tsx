import React, { useRef, useCallback } from 'react'

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

	const changeSpeed = useCallback((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const newSpeed = Number(speedInput.current.value)
		setSpeed(newSpeed)
	}, [setSpeed])

	return (
		<>
			<div>
				<button onClick={step}>Step</button>
				<button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Start'}</button>
			</div>
			<div>
				<form onSubmit={changeSpeed}>
					<input type="text" title="Speed" defaultValue={10} ref={speedInput} />
					<input type="submit" value="Set speed" />
				</form>
			</div>
		</>
	)
}
