import * as Engine from './engine'

describe('getInitialState', () => {
	test('when unspecified density should return all false', () => {
		const expectedCells = [
			[false, false, false],
			[false, false, false],
			[false, false, false],
		]
		const actualState = Engine.getInitialState(3, 3)
		expect(actualState.cells).toStrictEqual(expectedCells)
	})
})

describe('countNeighbours', () => {
	test('no neighbours of live cell', () => {
		const field = {
			cells: [
				[false, false, false],
				[false, true, false],
				[false, false, false],
			],
			rowCount: 3,
			colCount: 3,
		}
		const actualResult = Engine.countNeighbours(field, 1, 1)
		expect(actualResult).toBe(0)
	})

	test('no neighbours of dead cell', () => {
		const field = {
			cells: [
				[false, false, false],
				[false, false, false],
				[false, false, false],
			],
			rowCount: 3,
			colCount: 3,
		}
		const actualResult = Engine.countNeighbours(field, 1, 1)
		expect(actualResult).toBe(0)
	})

	test('existing neighbours of live cell', () => {
		const field = {
			cells: [
				[true, false, false],
				[true, true, false],
				[false, true, true],
			],
			rowCount: 3,
			colCount: 3,
		}
		const actualResult = Engine.countNeighbours(field, 1, 1)
		expect(actualResult).toBe(4)
	})

	test('existing neighbours of dead cell', () => {
		const field = {
			cells: [
				[false, true, true],
				[true, false, false],
				[true, false, true],
			],
			rowCount: 3,
			colCount: 3,
		}
		const actualResult = Engine.countNeighbours(field, 1, 1)
		expect(actualResult).toBe(5)
	})

	test('distant cells are not treated as neighbours', () => {
		const field = {
			cells: [
				[true, true, true, true],
				[false, false, false, true],
				[false, false, false, true],
				[false, false, false, true],
			],
			rowCount: 4,
			colCount: 4,
		}
		const actualResult = Engine.countNeighbours(field, 2, 1)
		expect(actualResult).toBe(0)
	})

	test('existing neighbours of edge cell', () => {
		const field = {
			cells: [
				[true, true, false, false],
				[false, true, false, false],
				[false, true, false, false],
				[true, true, true, true],
			],
			rowCount: 4,
			colCount: 4,
		}
		const actualResult = Engine.countNeighbours(field, 0, 3)
		expect(actualResult).toBe(4)
	})
})

describe('calculateNextStep', () => {
	test('Move glider in field', () => {
		const initialField = {
			cells: [
				[false, false, false, false, false],
				[false, false, true, false, false],
				[false, false, false, true, false],
				[false, true, true, true, false],
				[false, false, false, false, false],
			],
			rowCount: 5,
			colCount: 5,
		}
		const expectedNewCells = [
			[false, false, false, false, false],
			[false, false, false, false, false],
			[false, true, false, true, false],
			[false, false, true, true, false],
			[false, false, true, false, false],
		]
		const actualNewField = Engine.calculateNextField(initialField)
		expect(actualNewField.cells).toStrictEqual(expectedNewCells)
	})

	test('Move glider through edge', () => {
		const initialField = {
			cells: [
				[false, false, false, false, false],
				[false, false, false, false, false],
				[false, false, false, false, true],
				[true, false, false, false, false],
				[true, false, false, true, true],
			],
			rowCount: 5,
			colCount: 5,
		}
		const expectedNewCells = [
			[false, false, false, false, true],
			[false, false, false, false, false],
			[false, false, false, false, false],
			[true, false, false, true, false],
			[true, false, false, false, true],
		]
		const actualNewField = Engine.calculateNextField(initialField)
		expect(actualNewField.cells).toStrictEqual(expectedNewCells)
	})
})
