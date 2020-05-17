import {
	BrowserRouter,
	Redirect,
	Route,
	Switch,
	useHistory,
} from 'react-router-dom'
import { GameOfLife, LoginForm } from '.'
import React, { useCallback, useState } from 'react'

export const App: React.FC = () => {
	const [username, setUsername] = useState<string>()

	const history = useHistory()

	const logIn = useCallback(
		(name: string) => {
			setUsername(name)
			history.push('/')
		},
		[history],
	)

	return (
		<Switch>
			<Route exact path="/">
				{username === void 0 ? (
					<Redirect to="/login" />
				) : (
					<GameOfLife
						username={username}
						rowCount={10}
						colCount={10}
						cellSize={30}
					/>
				)}
			</Route>
			<Route exact path="/login">
				<LoginForm logIn={logIn} />
			</Route>
			<Route path="*">
				<h2>Oops. The page doesn&apos;t exist</h2>
			</Route>
		</Switch>
	)
}
