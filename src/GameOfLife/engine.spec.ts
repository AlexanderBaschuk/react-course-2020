import { countNeighbours } from './engine'

describe('countNeighbours', () => {
	test('no neighbours of live cell', () => {
		const field = [
			[false, false, false],
			[false, true, false],
			[false, false, false],
		]
		const actualResult = countNeighbours(field, 1, 1)
		expect(actualResult).toBe(0)
	})

	test('no neighbours of dead cell', () => {
		const field = [
			[false, false, false],
			[false, false, false],
			[false, false, false],
		]
		const actualResult = countNeighbours(field, 1, 1)
		expect(actualResult).toBe(0)
	})

	test('existing neighbours of live cell', () => {
		const field = [
			[true, false, false],
			[true, true, false],
			[false, true, true],
		]
		const actualResult = countNeighbours(field, 1, 1)
		expect(actualResult).toBe(4)
	})

	test('existing neighbours of dead cell', () => {
		const field = [
			[false, true, true],
			[true, false, false],
			[true, false, true],
		]
		const actualResult = countNeighbours(field, 1, 1)
		expect(actualResult).toBe(5)
	})

	test('distant cells are not treated as neighbours', () => {
		const field = [
			[true, true, true, true],
			[false, false, false, true],
			[false, false, false, true],
			[false, false, false, true],
		]
		const actualResult = countNeighbours(field, 2, 1)
		expect(actualResult).toBe(0)
	})

	test('existing neighbours of edge cell', () => {
		const field = [
			[true, true, false, false],
			[false, true, false, false],
			[false, true, false, false],
			[true, true, true, true],
		]
		const actualResult = countNeighbours(field, 0, 3)
		expect(actualResult).toBe(4)
	})
})
