import {
	DEFAULT_COL_COUNT,
	DEFAULT_DENSITY,
	DEFAULT_ROW_COUNT,
} from './gameOfLife.state'
import {
	autoplaySelector,
	fieldSelector,
	speedSelector,
} from './gameOfLife.selectors'
import {
	calculateNextField,
	getDimensions,
	getInitialState,
	resize,
} from './engine'
import {
	call,
	delay,
	put,
	select,
	takeEvery,
	takeLatest,
} from 'redux-saga/effects'
import {
	changeCell,
	initAction,
	resetAction,
	resizeAction,
	setField,
	stepAction,
	toggleAutoplay,
} from './gameOfLife.slice'

function* initializeField() {
	const field = yield call(
		getInitialState,
		DEFAULT_ROW_COUNT,
		DEFAULT_COL_COUNT,
		DEFAULT_DENSITY,
	)
	yield put(setField(field))
}

function* generateField(action) {
	const currentField = yield select(fieldSelector)
	const [rowCount, colCount] = getDimensions(currentField)
	const field = yield call(getInitialState, rowCount, colCount, action.payload)
	yield put(setField(field))
}

function* resizeField(action) {
	const currentField = yield select(fieldSelector)
	const field = yield call(
		resize,
		currentField,
		action.payload.rowCount,
		action.payload.colCount,
	)
	yield put(setField(field))
}

function* step() {
	const currentField = yield select(fieldSelector)
	const newField = yield call(calculateNextField, currentField)
	yield put(setField(newField))
}

function* start() {
	const isAutoplay = yield select(autoplaySelector)
	if (isAutoplay) {
		yield put(stepAction())
	}
}

function* scheduleNextStep() {
	let isAutoplay = yield select(autoplaySelector)
	if (!isAutoplay) {
		return
	}

	const speed = yield select(speedSelector)
	yield delay(speed)

	isAutoplay = yield select(autoplaySelector)
	if (isAutoplay) {
		yield put(stepAction())
	}
}

export function* gameOfLifeSaga() {
	yield takeEvery(initAction, initializeField)
	yield takeEvery(resetAction, generateField)
	yield takeEvery(resizeAction, resizeField)
	yield takeEvery(stepAction, step)
	yield takeEvery(toggleAutoplay, start)
	yield takeLatest([changeCell, setField], scheduleNextStep)
}
