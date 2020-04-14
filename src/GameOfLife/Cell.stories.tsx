import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import React from 'react'
import Cell from './Cell'

export default {
	title: 'Cell',
	decorators: [withKnobs],
}

export const CellStory: React.FC = () => (
	<Cell size={number('size', 10)} isAlive={boolean('isAlive', false)} />
)
