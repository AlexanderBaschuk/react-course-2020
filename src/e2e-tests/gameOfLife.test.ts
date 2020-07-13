import {
	DEFAULT_COL_COUNT,
	DEFAULT_ROW_COUNT,
} from '@/App/GameOfLife/gameOfLife.state'
import {
	clickCell,
	clickClearButton,
	clickStepButton,
	getAllCells,
	getCell,
	resizeField,
} from './gameOfLifePage'

import { logIn } from './testsSetup'

beforeEach(async () => {
	await logIn()
})

test('At start displays the field having live and dead cells', async () => {
	const cells = await getAllCells()
	const liveCells = cells.filter((c) => c.isAlive)
	const deadCells = cells.filter((c) => !c.isAlive)
	expect(liveCells.length).toBeGreaterThan(0)
	expect(deadCells.length).toBeGreaterThan(0)
})

test('Clicking a cell changes its state', async () => {
	const initialCell = await getCell(2, 3)
	await clickCell(2, 3)
	const resultCell = await getCell(2, 3)
	expect(resultCell.isAlive).not.toBe(initialCell.isAlive)
})

test('Clear button clears the field', async () => {
	await clickClearButton()
	const cells = await getAllCells()
	const liveCells = cells.filter((c) => c.isAlive)
	expect(liveCells.length).toBe(0)
})

test('Step button changes the field', async () => {
	const initialCells = await getAllCells()
	await clickStepButton()
	const finalCells = await getAllCells()
	expect(finalCells).not.toStrictEqual(initialCells)
})

test('Resize field up', async () => {
	const initialCells = await getAllCells()
	await resizeField(DEFAULT_ROW_COUNT + 1, DEFAULT_COL_COUNT + 1)
	const finalCells = await getAllCells()
	expect(finalCells.length).toBeGreaterThan(initialCells.length)
})

test('Resize field down', async () => {
	const initialCells = await getAllCells()
	await resizeField(DEFAULT_ROW_COUNT - 1, DEFAULT_COL_COUNT - 1)
	const finalCells = await getAllCells()
	expect(finalCells.length).toBeLessThan(initialCells.length)
})
