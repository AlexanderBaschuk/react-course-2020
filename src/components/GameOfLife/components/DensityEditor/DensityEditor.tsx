import React, { useRef, useCallback } from 'react'

interface DensityEditorProps {
	density: number
	setDensity: (value: number) => void
}

export const DensityEditor: React.FC<DensityEditorProps> = ({
	density,
	setDensity,
}) => {
	const densityInput = useRef<HTMLInputElement>()

	const clearField = useCallback(() => {
		setDensity(0)
	}, [setDensity])

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
				<form onSubmit={changeDensity}>
					<span>Density: </span>
					<input type="text" defaultValue={density} ref={densityInput} />
					<input type="submit" value="Reset" />
				</form>
			</div>
		</>
	)
}
