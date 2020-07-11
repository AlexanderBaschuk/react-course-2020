import { homeUrl, logIn } from './testsSetup'

import { ElementHandle } from 'puppeteer'

const liveCellColor = '#000000'
const cellSelector = '[data-row][data-column]'

const getLiveness = async (elementHandle: ElementHandle) =>
	await elementHandle.evaluate((element) => element.getAttribute('data-alive'))

const getRow = async (elementHandle: ElementHandle) =>
	await elementHandle.evaluate((element) => element.getAttribute('data-row'))

const getColumn = async (elementHandle: ElementHandle) =>
	await elementHandle.evaluate((element) => element.getAttribute('data-column'))

const getAllCells = async () => {
	const cellElements = await page.$$(cellSelector)
	const cells = await Promise.all(
		cellElements.map(async (ce) => ({
			row: await getRow(ce),
			col: await getColumn(ce),
			isAlive: (await getLiveness(ce)).toLowerCase() === 'true',
		})),
	)
	return cells
}

test('at start displays the field having alive and dead cells', async () => {
	await logIn()
	const cells = await getAllCells()
	const liveCells = cells.filter((c) => c.isAlive)
	const deadCells = cells.filter((c) => !c.isAlive)
	expect(liveCells.length).toBeGreaterThan(0)
	expect(deadCells.length).toBeGreaterThan(0)
})
