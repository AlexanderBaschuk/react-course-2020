export type Field = { cells: boolean[][]; rowCount: number; colCount: number }

function getCellValueByDensity(density?: number): boolean {
	if (!density) return false
	if (density === 1) return true
	return Math.random() > density ? false : true
}

export const getInitialState = (
	rowCount: number,
	colCount: number,
	density?: number,
): Field => {
	const cells = Array(rowCount).fill(Array(colCount).fill(false))
	for (let row of cells) {
		for (let i = 0; i < colCount; i++) {
			row[i] = getCellValueByDensity(density)
		}
	}

	return {
		cells: cells,
		rowCount,
		colCount,
	}
}

export const invertOneCell = (
	field: Field,
	row: number,
	col: number,
): Field => {
	const newCells = field.cells.map((currentRow) => [...currentRow])
	newCells[row][col] = !newCells[row][col]
	return {
		cells: newCells,
		rowCount: field.rowCount,
		colCount: field.colCount,
	}
}

export const countNeighbours = (
	field: Field,
	row: number,
	col: number,
): number => {
	let result = 0
	for (let i = -1; i <= 1; i++)
		for (let j = -1; j <= 1; j++) {
			if (i == 0 && j == 0) {
				continue
			}
			if (
				field.cells[(field.rowCount + row + i) % field.rowCount][
					(field.colCount + col + j) % field.colCount
				]
			) {
				result++
			}
		}
	return result
}

export const calculateNextField = (field: Field): Field => {
	const newCells = field.cells.map((row) => [...row])
	for (let r = 0; r < field.rowCount; r++) {
		for (let c = 0; c < field.colCount; c++) {
			const neighbours = countNeighbours(field, r, c)
			if (field.cells[r][c]) {
				newCells[r][c] = neighbours == 2 || neighbours == 3
			} else {
				newCells[r][c] = neighbours == 3
			}
		}
	}
	return { cells: newCells, rowCount: field.rowCount, colCount: field.colCount }
}
