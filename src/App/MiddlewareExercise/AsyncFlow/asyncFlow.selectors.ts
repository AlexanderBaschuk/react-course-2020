import { RootState as IState } from 'src/store'
import { createSelector } from '@reduxjs/toolkit'

const asyncFlowSelector = (state: IState) => state.asyncFlow

export const swPeopleSelector = createSelector(
	asyncFlowSelector,
	(asyncFlow) => asyncFlow.swPeople,
)

export const isLoadingSelector = createSelector(
	asyncFlowSelector,
	(asyncFlow) => asyncFlow.isLoading,
)

export const errorMessageSelector = createSelector(
	asyncFlowSelector,
	(asyncFlow) => asyncFlow.error,
)
