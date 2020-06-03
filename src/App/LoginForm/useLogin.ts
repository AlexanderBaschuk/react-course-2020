import { useCallback, useState } from "react"

export const useLogin = () => {
	const [name, setName] = useState('')

	const changeName = useCallback((dirtyName: string) => {
		const cleanName = dirtyName.toLowerCase().replace(/[^a-z0-9]/, '')
		setName(cleanName)
	}, [])

	return {
		name,
		changeName,
	}
}