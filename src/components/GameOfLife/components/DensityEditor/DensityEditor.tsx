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

	const changeDensity = useCallback((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const newDensity = Number(densityInput.current.value)
		setDensity(newDensity)
	}, [setDensity])

	return (
		<>
			<div>
				<form onSubmit={changeDensity}>
					<input type="text" defaultValue={density} ref={densityInput} />
					<input type="submit" value="Reset" />
				</form>
			</div>
		</>
	)
}
