import {
	ClearButton,
	ControlsPanelStyled,
	FieldControlsAreaStyled,
	FieldControlsWrapperStyled,
	InputLabel,
	InputStyled,
} from './FieldControls.styles'
import {
	DEFAULT_COL_COUNT,
	DEFAULT_DENSITY,
	DEFAULT_ROW_COUNT,
} from '@GameOfLife/gameOfLife.state'
import React, { useCallback, useRef } from 'react'
import { resetAction, resizeAction } from '@GameOfLife/gameOfLife.slice'

import { useDispatch } from 'react-redux'

export const FieldControls: React.FC = () => {
	const dispatch = useDispatch()

	const densityInput = useRef<HTMLInputElement>()
	const rowsInput = useRef<HTMLInputElement>()
	const columnsInput = useRef<HTMLInputElement>()

	const clearField = useCallback(() => {
		dispatch(resetAction(0))
	}, [dispatch])

	const changeSize = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			const newRows = Number(rowsInput.current.value)
			const newColumns = Number(columnsInput.current.value)
			dispatch(resizeAction({ rowCount: newRows, colCount: newColumns }))
		},
		[dispatch],
	)

	const changeDensity = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			const newDensity = Number(densityInput.current.value)
			dispatch(resetAction(newDensity))
		},
		[dispatch],
	)

	return (
		<FieldControlsWrapperStyled>
			<FieldControlsAreaStyled>
				<ClearButton onClick={clearField}>Clear</ClearButton>
			</FieldControlsAreaStyled>
			<FieldControlsAreaStyled>
				<ControlsPanelStyled>
					<form onSubmit={changeSize}>
						<InputLabel>Field size: </InputLabel>
						<InputStyled
							type="text"
							title="Rows"
							defaultValue={DEFAULT_ROW_COUNT}
							ref={rowsInput}
						/>
						<InputStyled
							type="text"
							title="Columns"
							defaultValue={DEFAULT_COL_COUNT}
							ref={columnsInput}
						/>
						<input type="submit" value="Set size" />
					</form>
				</ControlsPanelStyled>
				<ControlsPanelStyled>
					<form onSubmit={changeDensity}>
						<InputLabel>Density: </InputLabel>
						<InputStyled
							type="text"
							defaultValue={DEFAULT_DENSITY}
							ref={densityInput}
						/>
						<input type="submit" value="Generate" />
					</form>
				</ControlsPanelStyled>
			</FieldControlsAreaStyled>
		</FieldControlsWrapperStyled>
	)
}
