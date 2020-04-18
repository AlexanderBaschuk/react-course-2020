import React from 'react'

interface CellProps {
	row?: number
	column?: number
	size: number
	isAlive: boolean
	onClick: () => void
}

export const Cell: React.FC<CellProps> = ({ row, column, size, isAlive, onClick }) => {
	const cellStyle = {
		display: 'inline-block',
		width: size,
		height: size,
		backgroundColor: isAlive ? '#000' : '#EEE',
	}

	return (
		<div
			data-row={row}
			data-column={column}
			style={cellStyle}
			onClick={onClick}
		/>
	)
}
