import { withKnobs, number } from '@storybook/addon-knobs'
import React from 'react'
import GameOfLife from './GameOfLife'

export default {
	title: 'Game of Life',
	decorators: [withKnobs],
}

export const GameOfLifeStory: React.FC = () => {
	return (
		<GameOfLife
			rowCount={number('rowCount', 5)}
			colCount={number('colCount', 5)}
			cellSize={number('cellsize', 10)}
		/>
	)
}
