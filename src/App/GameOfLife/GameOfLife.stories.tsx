import {
	CellStyled,
	FieldControls,
	GameField,
	PlaybackControls,
} from './components'
import { number, withKnobs } from '@storybook/addon-knobs'

import { Field } from './engine'
import { GameOfLife } from '.'
import React from 'react'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Game of Life',
	decorators: [withKnobs],
}

export const GameOfLifeStory: React.FC = () => {
	return (
		<GameOfLife
			cellSize={number('cellSize', 20)}
		/>
	)
}

export const GameFieldStory: React.FC = () => {
	const field: Field = {
		cells: [
			[false, false, false, false, false],
			[false, false, true, false, false],
			[false, false, false, true, false],
			[false, true, true, true, false],
			[false, false, false, false, false],
		],
		rowCount: 5,
		colCount: 5,
	}
	return (
		<GameField
			field={field}
			cellSize={number('cellSize', 20)}
			clickCell={action('clickCell')}
		/>
	)
}

export const FieldControlsStory: React.FC = () => {
	return (
		<FieldControls />
	)
}

export const PlaybackControlsStory: React.FC = () => {
	return (
		<PlaybackControls />
	)
}

export const CellStory: React.FC = () => (
	<>
		<CellStyled
			cellSize={number('size', 20)}
			isAlive={false}
			onClick={action('onClick')}
		/>
		<CellStyled
			cellSize={number('size', 20)}
			isAlive={true}
			onClick={action('onClick')}
		/>
	</>
)
