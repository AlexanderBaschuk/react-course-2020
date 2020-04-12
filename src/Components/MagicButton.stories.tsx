import { MagicButton } from './MagicButton'
import { action } from '@storybook/addon-actions'
import React from 'react'

export default {
	title: 'MagicButton',
	decorators: [],
}

export const MagicButtonStory: React.FC = () => {
	return <MagicButton increment={action('Increment')} />
}
