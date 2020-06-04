import { isLoadingSelector, swPeopleSelector } from './asyncFlow.selectors'
import { useDispatch, useSelector } from 'react-redux'

import React from 'react'
import { fetchSwPeopleThunk } from './asyncFlow.thunk'

export const AsyncFlow: React.FC = () => {
	const swPeopleObject = useSelector(swPeopleSelector)
	const isLoading = useSelector(isLoadingSelector)

	const dispatch = useDispatch()
	const loadPeople = () => {
		dispatch(fetchSwPeopleThunk())
	}

	const swPeopleText = JSON.stringify(swPeopleObject)

	return (
		<>
			<div>
				<button onClick={loadPeople}>Load SW people</button>
			</div>
			{isLoading && <div>loading...</div>}
			<div>{swPeopleText}</div>
		</>
	)
}
