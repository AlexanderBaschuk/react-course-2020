import React, { useState, useEffect, useCallback, useRef } from 'react'
import { GameField } from './components/GameField/GameField'
import { useField } from './useField'

interface GameOfLifeProps {
	rowCount: number
	colCount: number
	cellSize: number
	initialDensity?: number
}

export const GameOfLife: React.FC<GameOfLifeProps> = ({
	rowCount,
	colCount,
	cellSize,
	initialDensity = 0.4,
}) => {
	const [density, setDensity] = useState(initialDensity)
	const { field, init, changeCell, step } = useField(
		rowCount,
		colCount,
		density,
	)

	const [autoplay, setAutoplay] = useState(false)
	const [animate, setAnimate] = useState(false)

	const densityInputRef = useRef<HTMLInputElement>()

	const toggleAutoplay = useCallback(() => {
		if (!autoplay) {
			setAnimate(true)
			step()
		}
		setAutoplay(!autoplay)
	}, [autoplay, setAutoplay, step])

	const invertCell = useCallback(
		(row: number, col: number) => {
			setAnimate(false)
			changeCell(row, col)
		},
		[changeCell, setAnimate],
	)

	const clearField = useCallback(() => {
		init()(rowCount, colCount, 0)
	}, [rowCount, colCount, init])

	const generateField = useCallback(() => {
		const newDensity = Number(densityInputRef.current.value)
		setDensity(newDensity)
		init()(rowCount, colCount, newDensity)
	}, [rowCount, colCount, init])

	useEffect(() => {
		if (!autoplay) {
			return
		}

		const timeout = setTimeout(() => {
			step()
		}, 100)
		return () => {
			clearTimeout(timeout)
		}
	}, [autoplay, step])

	useEffect(() => {
		densityInputRef.current.value = density.toString()
	}, [density])

	return (
		<>
			<div>
				<button onClick={clearField}>Clear</button>
			</div>
			<div>
				<input type="text" ref={densityInputRef} />
				<button onClick={generateField}>Reset</button>
			</div>
			<div>
				<button onClick={step}>Step</button>
				<button onClick={toggleAutoplay}>{autoplay ? 'Stop' : 'Start'}</button>
			</div>
			<GameField
				field={field}
				cellSize={cellSize}
				clickCell={invertCell}
				animate={animate}
				duration={150}
			/>
		</>
	)
}
