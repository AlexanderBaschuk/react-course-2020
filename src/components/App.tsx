import { GameOfLife, HeaderPanel, LoginForm } from '.'
import React, { useCallback, useState } from 'react'
import {
	Redirect,
	Route,
	Switch,
	useHistory,
} from 'react-router-dom'

const HOME_PATH = '/'
const LOGIN_PATH = '/login'

export const App: React.FC = () => {
	const [username, setUsername] = useState<string>()

	const history = useHistory()

	const logIn = useCallback(
		(name: string) => {
			setUsername(name)
			history.push(HOME_PATH)
		},
		[history],
	)

	const logOut = useCallback(() => {
		setUsername(void 0)
		history.push('/login')
	}, [history])

	return (
		<Switch>
			<Route exact path={HOME_PATH}>
				{username === void 0 ? (
					<Redirect to={LOGIN_PATH} />
				) : (
					<>
						<HeaderPanel username={username} logOut={logOut} />
						<GameOfLife rowCount={10} colCount={10} cellSize={30} />
					</>
				)}
			</Route>
			<Route exact path={LOGIN_PATH}>
				<LoginForm logIn={logIn} />
			</Route>
			<Route path="*">
				<h2>Oops. The page doesn&apos;t exist</h2>
			</Route>
		</Switch>
	)
}
