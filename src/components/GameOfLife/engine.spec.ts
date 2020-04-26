import * as Engine from './engine'

describe('getInitialState', () => {
	test('when unspecified density should return all falses', () => {
		const expectedCells = [
			[false, false, false],
			[false, false, false],
			[false, false, false],
		]
		const actualState = Engine.getInitialState(3, 3)
		expect(actualState.cells).toStrictEqual(expectedCells)
	})

	test('when density is 1 should return all trues', () => {
		const expectedCells = [
			[true, true, true],
			[true, true, true],
			[true, true, true],
		]
		const actualState = Engine.getInitialState(3, 3, 1)
		expect(actualState.cells).toStrictEqual(expectedCells)
	})

	test('when high density should return more trues than falses', () => {
		const actualState = Engine.getInitialState(100, 100, 0.9)
		const truesCount = actualState.cells.reduce(
			(result, row) =>
				result +
				row.reduce(
					(rowResult, col) => rowResult + (col === true ? 1 : 0),
					0,
				),
			0,
		)
		expect(truesCount).toBeGreaterThan(5000)
		expect(truesCount).toBeLessThan(10000)
	})

	test('when low density should return more falses than trues', () => {
		const actualState = Engine.getInitialState(100, 100, 0.1)
		const truesCount = actualState.cells.reduce(
			(result, row) =>
				result +
				row.reduce(
					(rowResult, col) => rowResult + (col === true ? 1 : 0),
					0,
				),
			0,
		)
		expect(truesCount).toBeLessThan(5000)
		expect(truesCount).toBeGreaterThan(0)
	})
})

describe('resize field', () => {
	test('add row', () => {
		const initialField = {
			cells: [
				[true, false, true],
				[false, true, false],
				[true, false, true],
			],
			rowCount: 3,
			colCount: 3,
		}
		const expectedField = {
			cells: [
				[true, false, true],
				[false, true, false],
				[true, false, true],
				[false, false, false],
			],
			rowCount: 4,
			colCount: 3,
		}
		const actualField = Engine.resize(initialField, 4, 3)
		expect(actualField).toStrictEqual(expectedField)
	})

	test('add column', () => {
		const initialField = {
			cells: [
				[true, false, true],
				[false, true, false],
				[true, false, true],
			],
			rowCount: 3,
			colCount: 3,
		}
		const expectedField = {
			cells: [
				[true, false, true, false],
				[false, true, false, false],
				[true, false, true, false],
			],
			rowCount: 3,
			colCount: 4,
		}
		const actualField = Engine.resize(initialField, 3, 4)
		expect(actualField).toStrictEqual(expectedField)
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
