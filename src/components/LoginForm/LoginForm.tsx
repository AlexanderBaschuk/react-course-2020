import React, { useCallback, useState } from 'react'

export interface LoginFormProps {
	logIn: (name: string) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ logIn }) => {
	const [name, setName] = useState('')

	const changeName = useCallback((event) => {
		setName(event.target.value)
	}, [])

	const submit = useCallback(() => {
		event.preventDefault()
		logIn(name)
	}, [logIn, name])

	return (
		<>
			<form onSubmit={submit}>
				<h1>Enter your name</h1>
				<input type="text" value={name} onChange={changeName}></input>
				<input type="submit" value="Log in"></input>
			</form>
		</>
	)
}
