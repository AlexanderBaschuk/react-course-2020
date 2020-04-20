import { render } from 'react-dom'
import React from 'react'
import { GameOfLife } from './components'

render(
	<GameOfLife rowCount={10} colCount={10} cellSize={30} />,
	document.getElementById('root'),
)
