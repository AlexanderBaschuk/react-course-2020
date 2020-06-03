import { AsyncFlow, GameOfLife, HeaderPanel, LoginForm } from '.'
import React, { useCallback, useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

const USERNAME_KEY = 'username'
const HOME_PATH = '/'
const LOGIN_PATH = '/login'
const ASYNC_FLOW_PATH = '/async'

export const App: React.FC = () => {
	const [username, setUsername] = useState<string>(
		localStorage.getItem(USERNAME_KEY) || undefined,
	)

	const history = useHistory()

	useEffect(() => {
		if (username) {
			localStorage.setItem(USERNAME_KEY, username)
		} else {
			localStorage.removeItem(USERNAME_KEY)
		}
	}, [username])

	const logIn = useCallback(
		(name: string) => {
			setUsername(name)
			history.push(HOME_PATH)
		},
		[history],
	)

	const logOut = useCallback(() => {
		setUsername(undefined)
		history.push('/login')
	}, [history])

	return (
		<Switch>
			{username && (
				<Route exact path={HOME_PATH}>
					<HeaderPanel username={username} logOut={logOut} />
					<GameOfLife rowCount={10} colCount={10} cellSize={30} />
				</Route>
			)}
			<Route exact path={LOGIN_PATH}>
				<LoginForm logIn={logIn} />
			</Route>
			<Route exact path={ASYNC_FLOW_PATH}>
				<AsyncFlow />
			</Route>
			<Route path="*">
				<Redirect to={username ? HOME_PATH : LOGIN_PATH} />
			</Route>
		</Switch>
	)
}
