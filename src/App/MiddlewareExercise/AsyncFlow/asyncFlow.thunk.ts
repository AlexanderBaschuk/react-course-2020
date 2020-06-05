import { changePeople, setIsLoading } from './asyncFlow.slice'

import { AppThunk } from 'src/store'

export const fetchSwPeopleThunk = (): AppThunk => (dispatch) => {
	dispatch(setIsLoading())
	fetch('https://swapi.dev/api/people/', { method: 'GET' })
		.then(async (response) => {
			if (response.ok) {
				const result = await response.json()
				dispatch(changePeople(result))
			} else {
				dispatch(changePeople(`Response status: ${response.status} (${response.statusText})`))
			}
		})
		.catch((error) => {
			dispatch(setIsLoading(false))
			console.error(error)
		})
}
