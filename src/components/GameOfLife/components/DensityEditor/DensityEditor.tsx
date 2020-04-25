import React, { useRef, useCallback, useEffect } from 'react'

interface DensityEditorProps {
	density: number
	setDensity: (value: number) => void
}

export const DensityEditor: React.FC<DensityEditorProps> = ({ density, setDensity }) => {
	const densityInput = useRef<HTMLInputElement>()

	const changeDensity = useCallback(() => {
		const newDensity = Number(densityInput.current.value)
		setDensity(newDensity)
	}, [setDensity])

	useEffect(() => {
		densityInput.current.value = density.toString()
	}, [density])

	return (
		<>
			<div>
				<input type="text" ref={densityInput} />
				<button onClick={changeDensity}>Reset</button>
			</div>
		</>
	)
}
