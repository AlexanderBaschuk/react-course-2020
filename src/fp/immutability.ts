// Задание 1
export type OriginalTeam = {
	size: number
	name: string
	league: string
}

export type ExpectedTeam = {
	name: string
	league: string
	roster: number
}

const namesMap = {
	'Tampa Bay Roosters': 'New York Badgers',
	'Rooster Bay Tampas': 'Badger York News',
	'Bayster Roo Tampax': 'Yorker Bad News',
}

export const originalTeamToExpectedTeam = (
	originalTeam: OriginalTeam,
): ExpectedTeam => ({
	league: originalTeam.league,
	name: namesMap[originalTeam.name],
	roster: originalTeam.size + 10,
})

// Задание 2
export type SomeElement = number | string
export type SomeArray = SomeElement[]

const numberToString = (n: SomeElement): string => {
	switch (n) {
		case 0:
			return 'zero'
		case 1:
			return 'one'
		case 2:
			return 'two'
		default:
			return n.toString()
	}
}

export const originalArrayToExpectedArray = (
	originalArray: readonly SomeElement[],
): SomeElement[] =>
	originalArray
		.map((item) => (typeof item == 'number' ? item + 1 : item))
		.map((item, index) => (index == 0 ? numberToString(item) : item))

// Задание 3
export type Team = {
	name: string
	captain: {
		name: string
		age: number
	}
}

export const originalTeamToExpectedTeamDeep = (originalTeam: Team): Team => {
	const copy = JSON.parse(JSON.stringify(originalTeam))
	copy.captain.age++
	return copy
}
