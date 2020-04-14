import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import React from 'react'
import Cell from './Cell'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Cell',
	decorators: [withKnobs],
}

export const CellStory: React.FC = () => (
	<Cell size={number('size', 10)} isAlive={boolean('isAlive', false)} onClick={action('onClick')} />
)
