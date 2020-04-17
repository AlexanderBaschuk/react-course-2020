import React from 'react'

interface HelloUserProps {
	userName: string
}

export const HelloUser: React.FC<HelloUserProps> = ({ userName }) => (
<h1>Hello, {userName}!</h1>
)
