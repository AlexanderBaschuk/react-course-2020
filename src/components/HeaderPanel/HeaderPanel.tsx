import {
	GreetingArea,
	HeaderPanelStyled,
	LogoutArea,
} from './HeaderPanel.styles'

import React from 'react'

interface HeaderPanelProps {
	username: string
	logOut: () => void
}

export const HeaderPanel: React.FC<HeaderPanelProps> = ({ username, logOut }) => {
	return (
		<HeaderPanelStyled>
			<GreetingArea>
				<h1>Hello, {username}</h1>
			</GreetingArea>
			<LogoutArea>
				<button onClick={logOut}>Log out</button>
			</LogoutArea>
		</HeaderPanelStyled>
	)
}
