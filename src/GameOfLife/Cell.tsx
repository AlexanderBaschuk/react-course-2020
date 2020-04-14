import React from 'react'

interface CellProps {
	size: number
	isAlive: boolean
	onClick: () => void
}

const Cell: React.FC<CellProps> = ({ size, isAlive, onClick }) => {
	const cellStyle = {
		display: 'inline-block',
		width: size,
		height: size,
		backgroundColor: isAlive ? '#000' : '#EEE',
	}

	return <div style={cellStyle} onClick={onClick} />
}

export default Cell
