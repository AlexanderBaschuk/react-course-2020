import React, { useCallback, useState } from 'react'

import { useLogin } from './useLogin'

export interface LoginFormProps {
	logIn: (name: string) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ logIn }) => {
	const { name, changeName } = useLogin()

	const submit = useCallback(() => {
		event.preventDefault()
		logIn(name)
	}, [logIn, name])

	const handleChange = useCallback((event) => {
		changeName(event.target.value)
	}, [changeName])

	return (
		<>
			<form onSubmit={submit}>
				<h1>Enter your name</h1>
				<input type="text" value={name} onChange={handleChange}></input>
				<input type="submit" value="Log in"></input>
			</form>
		</>
	)
}
