import { ElementHandle } from 'puppeteer'
import { logIn } from './testsSetup'

interface CellInfo {
	row: string
	col: string
	isAlive: boolean
}

const cellSelector = '[data-row][data-column]'
const cellSelectorRowCol = (row: number, col: number) =>
	`[data-row="${row}"][data-column="${col}"]`

const getLiveness = async (elementHandle: ElementHandle) =>
	await elementHandle.evaluate((element) => element.getAttribute('data-alive'))

const getRow = async (elementHandle: ElementHandle) =>
	await elementHandle.evaluate((element) => element.getAttribute('data-row'))

const getColumn = async (elementHandle: ElementHandle) =>
	await elementHandle.evaluate((element) => element.getAttribute('data-column'))

const toCellInfo = async (cellElement: ElementHandle) => ({
	row: await getRow(cellElement),
	col: await getColumn(cellElement),
	isAlive: (await getLiveness(cellElement)).toLowerCase() === 'true',
})

const getAllCells = async (): Promise<CellInfo[]> => {
	const cellElements = await page.$$(cellSelector)
	const cells = await Promise.all(
		cellElements.map(async (ce) => await toCellInfo(ce)),
	)
	return cells
}

const getCell = async (row: number, column: number): Promise<CellInfo> => {
	const cellElement = await page.$(cellSelectorRowCol(row, column))
	return toCellInfo(cellElement)
}

const clickCell = async (row: number, column: number): Promise<void> => {
	await page.click(cellSelectorRowCol(row, column))
}

beforeEach(async () => {
	await logIn()
})

test('at start displays the field having alive and dead cells', async () => {
	const cells = await getAllCells()
	const liveCells = cells.filter((c) => c.isAlive)
	const deadCells = cells.filter((c) => !c.isAlive)
	expect(liveCells.length).toBeGreaterThan(0)
	expect(deadCells.length).toBeGreaterThan(0)
})

test('clicking a cell changes its state', async () => {
	const initialCell = await getCell(2, 3)
	await clickCell(2, 3)
	const resultCell = await getCell(2, 3)
	expect(resultCell.isAlive).not.toBe(initialCell.isAlive)
})
