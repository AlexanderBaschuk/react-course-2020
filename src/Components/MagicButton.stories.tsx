import { MagicButton } from './MagicButton'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { withKnobs, number } from '@storybook/addon-knobs'

export default {
	title: 'MagicButton',
	decorators: [withKnobs],
}

export const MagicButtonStory: React.FC = () => {
	return (
		<MagicButton increment={action('Increment')} count={number('Count', 0)} />
	)
}
