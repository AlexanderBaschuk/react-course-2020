import {
	CellStyled,
	FieldControls,
	PlaybackControls,
} from './components/GameOfLife/components'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'

import { Field } from './components/GameOfLife/engine'
import { GameField } from './components/GameOfLife/components/GameField/GameField'
import { GameOfLife } from './components/GameOfLife/GameOfLife'
import { HeaderPanel } from './components'
import { LoginForm } from './components/LoginForm/LoginForm'
import React from 'react'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Game of Life',
	decorators: [withKnobs],
}

export const LoginFormStory: React.FC = () => {
	return <LoginForm logIn={action('logIn')} />
}

export const HeaderPanelStory: React.FC = () => {
	return <HeaderPanel username={text('username', 'username123')} logOut={action('logOut')} />
}

export const GameOfLifeStory: React.FC = () => {
	return (
		<GameOfLife
			username={text('username', 'username123')}
			rowCount={number('rowCount', 10)}
			colCount={number('colCount', 10)}
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
			animate={false}
			duration={100}
			clickCell={action('clickCell')}
		/>
	)
}

export const FieldControlsStory: React.FC = () => {
	return (
		<FieldControls
			rowCount={number('rowCount', 10)}
			colCount={number('colCount', 10)}
			setSize={action('setSize')}
			density={number('density', 0.4)}
			setDensity={action('setDensity')}
		/>
	)
}

export const PlaybackControlsStory: React.FC = () => {
	return (
		<PlaybackControls
			isPlaying={boolean('isPlaying', false)}
			step={action('step')}
			togglePlay={action('togglePlay')}
			setSpeed={action('setSpeed')}
		/>
	)
}

export const CellStory: React.FC = () => (
	<>
		<CellStyled
			cellSize={number('size', 20)}
			isAlive={false}
			onClick={action('onClick')}
			animate={false}
			duration={100}
		/>
		<CellStyled
			cellSize={number('size', 20)}
			isAlive={true}
			onClick={action('onClick')}
			animate={false}
			duration={100}
		/>
	</>
)
