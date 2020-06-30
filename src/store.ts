import { combineReducers, configureStore } from '@reduxjs/toolkit'

import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { gameOfLifeSaga } from './App/GameOfLife/gameOfLife.saga'
import { gameOfLifeSlice } from './App/GameOfLife/gameOfLife.slice'

export const reducer = combineReducers({
	gameOfLife: gameOfLifeSlice.reducer,
})

function* saga() {
	yield fork(gameOfLifeSaga)
}

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
	reducer,
	middleware: [sagaMiddleware],
})

sagaMiddleware.run(saga)

export type State = ReturnType<typeof reducer>
