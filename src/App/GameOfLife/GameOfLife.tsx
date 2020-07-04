import { FieldControls, PlaybackControls } from './components'

import { GameField } from './components/GameField/GameField'
import React from 'react'

interface GameOfLifeProps {
	cellSize: number
}

export const GameOfLife: React.FC<GameOfLifeProps> = ({ cellSize }) => {
	return (
		<>
			<FieldControls />
			<PlaybackControls />
			<GameField cellSize={cellSize} />
		</>
	)
}
