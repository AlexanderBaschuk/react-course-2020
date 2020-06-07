import { changePeople, setIsLoading } from './asyncFlow.slice'

import { fetchSwPeopleThunk } from './asyncFlow.thunk'

describe('asyncFlow thunk', () => {
	let nativeFetch

	beforeEach(() => {
		nativeFetch = window.fetch
	})

	afterEach(() => {
		window.fetch = nativeFetch
	})

	const mockFetchOk = (json: any) => {
		const mock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => json,
		})
		window.fetch = mock
		return mock
	}

	it('should change sw-people on success', async () => {
		mockFetchOk('abc')
		const dispatchMock = jest.fn()

		const thunk = fetchSwPeopleThunk()
		await thunk(dispatchMock, jest.fn(), undefined)
		expect(dispatchMock).toHaveBeenCalledTimes(2)
		expect(dispatchMock).toHaveBeenCalledWith(setIsLoading())
		expect(dispatchMock).toHaveBeenCalledWith(changePeople('abc'))
	})
})
