export type Field = { cells: boolean[][] }

function getCellValueByDensity(density?: number): boolean {
	if (!density) return false
	if (density === 1) return true
	return Math.random() > density ? false : true
}

export const getDimensions = (field: Field): [number, number] => {
	const rowCount = field.cells.length
	const colCount = rowCount === 0 ? 0 : field.cells[0].length
	return [rowCount, colCount]
}

export const getInitialState = (
	rowCount: number,
	colCount: number,
	density?: number,
): Field => {
	const cells = Array.from(Array(rowCount), () =>
		Array.from(Array(colCount), () => getCellValueByDensity(density)),
	)

	return { cells }
}

export const resize = (
	field: Field,
	rowCount: number,
	colCount: number,
): Field => {
	const [currentRowCount, currentColCount] = getDimensions(field)
	let resultCells = Array(rowCount)
	for (let r = 0; r < rowCount; r++) {
		const row = Array(colCount)
		if (r >= currentRowCount) {
			resultCells[r] = row.fill(false)
			continue
		}

		for (let c = 0; c < colCount; c++) {
			row[c] = c >= currentColCount ? false : field.cells[r][c] ?? false
		}
		resultCells[r] = row
	}
	return { cells: resultCells }
}

export const invertOneCell = (
	field: Field,
	row: number,
	col: number,
): Field => {
	const newCells = field.cells.map((currentRow) => [...currentRow])
	newCells[row][col] = !newCells[row][col]
	return { cells: newCells }
}

export const countNeighbours = (
	field: Field,
	row: number,
	col: number,
): number => {
	const [rowCount, colCount] = getDimensions(field)

	let result = 0
	for (let i = -1; i <= 1; i++)
		for (let j = -1; j <= 1; j++) {
			if (i == 0 && j == 0) {
				continue
			}
			if (
				field.cells[(rowCount + row + i) % rowCount][
					(colCount + col + j) % colCount
				]
			) {
				result++
			}
		}
	return result
}

export const calculateNextField = (field: Field): Field => {
	const [rowCount, colCount] = getDimensions(field)
	const newCells = field.cells.map((row) => [...row])
	for (let r = 0; r < rowCount; r++) {
		for (let c = 0; c < colCount; c++) {
			const neighbours = countNeighbours(field, r, c)
			if (field.cells[r][c]) {
				newCells[r][c] = neighbours == 2 || neighbours == 3
			} else {
				newCells[r][c] = neighbours == 3
			}
		}
	}
	return { cells: newCells }
}
