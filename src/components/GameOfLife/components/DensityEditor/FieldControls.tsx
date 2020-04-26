import React, { useRef, useCallback } from 'react'

interface FieldControlsProps {
	rowCount: number
	colCount: number
	setSize: (rows: number, columns: number) => void
	density: number
	setDensity: (value: number) => void
}

export const FieldControls: React.FC<FieldControlsProps> = ({
	rowCount,
	colCount,
	setSize,
	density,
	setDensity,
}) => {
	const densityInput = useRef<HTMLInputElement>()
	const rowsInput = useRef<HTMLInputElement>()
	const columnsInput = useRef<HTMLInputElement>()

	const clearField = useCallback(() => {
		setDensity(0)
	}, [setDensity])

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
			setDensity(newDensity)
		},
		[setDensity],
	)

	return (
		<>
			<div>
				<button onClick={clearField}>Clear</button>
			</div>
			<div>
				<form onSubmit={changeSize}>
					<span>Field size: </span>
					<input type="text" title="Rows" defaultValue={rowCount} ref={rowsInput} />
					<input type="text" title="Columns" defaultValue={colCount} ref={columnsInput} />
					<input type="submit" value="Set size" />
				</form>
			</div>
			<div>
				<form onSubmit={changeDensity}>
					<span>Density: </span>
					<input type="text" defaultValue={density} ref={densityInput} />
					<input type="submit" value="Generate" />
				</form>
			</div>
		</>
	)
}
