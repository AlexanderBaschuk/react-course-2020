import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import React from 'react'
import { action } from '@storybook/addon-actions'
import { CellStyled } from './CellStyled'

export default {
	title: 'Cell',
	decorators: [withKnobs],
}

export const CellStory: React.FC = () => (
	<CellStyled size={number('size', 10)} isAlive={boolean('isAlive', false)} onClick={action('onClick')} />
)
