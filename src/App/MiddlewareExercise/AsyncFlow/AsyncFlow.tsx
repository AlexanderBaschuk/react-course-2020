import React from 'react'
import { swPeopleSelector } from './asyncFlow.selectors'
import { useSelector } from 'react-redux'

export const AsyncFlow: React.FC = () => {
	const swPeopleObject = useSelector(swPeopleSelector)
	const swPeopleText = JSON.stringify(swPeopleObject)
	return <>{swPeopleText}</>
}
