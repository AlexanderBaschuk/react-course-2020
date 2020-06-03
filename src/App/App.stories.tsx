import { text, withKnobs } from '@storybook/addon-knobs'

import { HeaderPanel } from '.'
import { LoginForm } from './LoginForm/LoginForm'
import React from 'react'
import { action } from '@storybook/addon-actions'

export default {
	title: 'App',
	decorators: [withKnobs],
}

export const LoginFormStory: React.FC = () => {
	return <LoginForm logIn={action('logIn')} />
}

export const HeaderPanelStory: React.FC = () => {
	return (
		<HeaderPanel
			username={text('username', 'username123')}
			logOut={action('logOut')}
		/>
	)
}
