import { GameOfLife } from './components'
import React from 'react'
import { render } from 'react-dom'

render(
	<GameOfLife username="" rowCount={10} colCount={10} cellSize={30} />,
	document.getElementById('root'),
)
