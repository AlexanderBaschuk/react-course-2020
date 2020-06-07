import { changePeople, setErrorMessage, setIsLoading } from './asyncFlow.slice'

import { AppThunk } from 'src/store'

export const fetchSwPeopleThunk = (): AppThunk => async (dispatch) => {
	dispatch(setIsLoading())
	try {
		const response: Response = await fetch('https://swapi.dev/api/people/', {
			method: 'GET',
		})
		if (response?.ok) {
			const result = await response.json()
			dispatch(changePeople(result))
		} else {
			dispatch(
				setErrorMessage(
					`Response status: ${response?.status} (${response?.statusText})`,
				),
			)
		}
	} catch (error) {
		dispatch(setErrorMessage(`Error while loading data: ${error}`))
	}
}
