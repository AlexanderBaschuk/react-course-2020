import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from 'react'
import { configureStore } from "@reduxjs/toolkit";
import { render } from 'react-dom'

const initialState = {}

const rootReducer = (state) => {
	return state;
};

const store = configureStore({
	reducer: rootReducer,
	preloadedState: initialState,
});

render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
)
