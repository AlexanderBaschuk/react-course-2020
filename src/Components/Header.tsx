import React from 'react'

interface MyHeaderProps {
	count: number
}

export const MyHeader: React.FC<MyHeaderProps> = ({ count }) => (
	<h1>Clicked {count} times!</h1>
)
