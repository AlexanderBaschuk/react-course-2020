import React from 'react'
import { MyHeader } from './MyHeader'
import { withKnobs, number } from '@storybook/addon-knobs'

export default {
	title: 'MyHeader',
	decorators: [withKnobs],
}

export const MyHeaderStory: React.FC = () => {
	return <MyHeader count={number('Count', 0)} />
}
