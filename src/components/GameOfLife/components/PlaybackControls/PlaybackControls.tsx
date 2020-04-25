import React from 'react'

interface PlaybackControlsProps {
	isPlaying: boolean
	step: () => void
	togglePlay: () => void
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
	isPlaying,
	step,
	togglePlay,
}) => {
	return (
		<>
			<div>
				<button onClick={step}>Step</button>
				<button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Start'}</button>
			</div>
		</>
	)
}
