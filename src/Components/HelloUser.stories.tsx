import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { HelloUser } from './HelloUser'

export default {
	title: 'HelloUser',
	decorators: [withKnobs],
}

export const HelloUserStory: React.FC = () => {
	return <HelloUser userName={text('userName', 'World')} />
}
