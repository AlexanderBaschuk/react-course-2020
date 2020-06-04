import { changePeople, setIsLoading } from './asyncFlow.slice'

import { AppThunk } from 'src/store'

export const fetchSwPeopleThunk = (): AppThunk => (dispatch) => {
	dispatch(setIsLoading(true))
	fetch('https://swapi.dev/api/people', { method: 'GET', mode: 'no-cors' })
		.then((response) => {
			dispatch(setIsLoading(false))
			dispatch(changePeople(response.body))
		})
		.catch((error) => {
			dispatch(setIsLoading(false))
			console.error(error)
		})
}
