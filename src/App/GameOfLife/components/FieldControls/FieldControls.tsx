import {
	ClearButton,
	ControlsPanelStyled,
	FieldControlsAreaStyled,
	FieldControlsWrapperStyled,
	InputLabel,
	InputStyled,
} from './FieldControls.styles'
import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { densitySelector } from '../../gameOfLife.selectors'
import { saveDensity } from '../../gameOfLife.slice'

interface FieldControlsProps {
	rowCount: number
	colCount: number
	setSize: (rows: number, columns: number) => void
	setDensity: (value: number) => void
}

export const FieldControls: React.FC<FieldControlsProps> = ({
	rowCount,
	colCount,
	setSize,
	setDensity,
}) => {
	const density = useSelector(densitySelector)
	const dispatch = useDispatch()

	const densityInput = useRef<HTMLInputElement>()
	const rowsInput = useRef<HTMLInputElement>()
	const columnsInput = useRef<HTMLInputElement>()

	const clearField = useCallback(() => {
		dispatch(saveDensity(0))
		setDensity(0)
	}, [dispatch, setDensity])

	const changeSize = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			const newRows = Number(rowsInput.current.value)
			const newColumns = Number(columnsInput.current.value)
			setSize(newRows, newColumns)
		},
		[setSize],
	)

	const changeDensity = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			const newDensity = Number(densityInput.current.value)
			dispatch(saveDensity(newDensity))
			setDensity(newDensity)
		},
		[dispatch, setDensity],
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
							defaultValue={rowCount}
							ref={rowsInput}
						/>
						<InputStyled
							type="text"
							title="Columns"
							defaultValue={colCount}
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
							defaultValue={density}
							ref={densityInput}
						/>
						<input type="submit" value="Generate" />
					</form>
				</ControlsPanelStyled>
			</FieldControlsAreaStyled>
		</FieldControlsWrapperStyled>
	)
}
