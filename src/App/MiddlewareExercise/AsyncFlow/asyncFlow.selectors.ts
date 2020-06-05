import { RootState as IState } from 'src/store'
import { createSelector } from '@reduxjs/toolkit'

const asyncFlowSelector = (state: IState) => state.asyncFlow

export const swPeopleSelector = createSelector(
	asyncFlowSelector,
	(asyncFlow) => asyncFlow.swPeople,
)

export const isLoadingSelector = (state: IState) => state.asyncFlow.isLoading

export const errorMessageSelector = (state: IState) => state.asyncFlow.error
