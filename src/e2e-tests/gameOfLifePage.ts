import { ElementHandle } from 'puppeteer'

export interface CellInfo {
	row: string
	col: string
	isAlive: boolean
}

const clearButtonSelector = '#clear-button'
const stepButtonSelector = '[data-testid="step-button"]'
const sizeRowsSelector = 'input#size-rows'
const sizeColumnsSelector = 'input#size-columns'
const resizeButtonSelector = '#set-size'

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

export const getAllCells = async (): Promise<CellInfo[]> => {
	const cellElements = await page.$$(cellSelector)
	const cells = await Promise.all(
		cellElements.map(async (ce) => await toCellInfo(ce)),
	)
	return cells
}

export const getCell = async (
	row: number,
	column: number,
): Promise<CellInfo> => {
	const cellElement = await page.$(cellSelectorRowCol(row, column))
	return toCellInfo(cellElement)
}

export const clickCell = async (row: number, column: number): Promise<void> => {
	await expect(page).toClick(cellSelectorRowCol(row, column))
}

export const clickClearButton = async (): Promise<void> => {
	await expect(page).toClick(clearButtonSelector)
}

export const clickStepButton = async (): Promise<void> => {
	await expect(page).toClick(stepButtonSelector)
}

export const resizeField = async (
	rowCount: number,
	colCount: number,
): Promise<void> => {
	await expect(page).toFill(sizeRowsSelector, rowCount.toString())
	await expect(page).toFill(sizeColumnsSelector, colCount.toString())
	await expect(page).toClick(resizeButtonSelector)
}
