import React from 'react'

interface CellProps {
	size: number
	isAlive: boolean
}

const Cell: React.FC<CellProps> = ({ size, isAlive }) => {
	const cellStyle = {
		display: 'inline-block',
		width: size,
		height: size,
		backgroundColor: isAlive ? '#000' : '#EEE',
	}

	return <div style={cellStyle} />
}

export default Cell
