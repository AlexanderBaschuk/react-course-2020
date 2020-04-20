import { withKnobs, number } from '@storybook/addon-knobs'
import React from 'react'
import { GameOfLife } from './GameOfLife'
import { CellStyled } from './components/Cell/CellStyled'
import { action } from '@storybook/addon-actions'

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


export const Cell: React.FC = () => (
	<>
		<CellStyled
			cellSize={number('size', 10)}
			isAlive={false}
			onClick={action('onClick')}
		/>
		<CellStyled
			cellSize={number('size', 10)}
			isAlive={true}
			onClick={action('onClick')}
		/>
	</>
)
