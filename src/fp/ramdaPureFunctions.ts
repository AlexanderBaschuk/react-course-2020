import * as R from 'ramda'

// Задание 1
export type Team = { name: string; score: number }
export const getScore = R.prop('score')
export const getName = R.prop('name')
export const getHigherTeam = R.maxBy(getScore)
export const getTopTeam = R.reduce(getHigherTeam, { score: -Infinity })
export const getTopName = R.compose(getName, getTopTeam)

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>
export const getKeyValueString = R.join("=")
export const getKeyValueStrings = R.map(getKeyValueString)
export const joinWithAmp = R.join('&')
export const addQuestion = R.concat('?')
export const createQs = R.compose(addQuestion, joinWithAmp, getKeyValueStrings, R.toPairs)

// Задание 3
export const removeQuestion = R.replace('?', '')
export const splitByAmp = R.split('&')
export const toKeyValuePair = R.split("=")
export const toKeyValuePairs = R.map(toKeyValuePair)
export const parseQs = R.compose(R.fromPairs, toKeyValuePairs, splitByAmp, removeQuestion)
