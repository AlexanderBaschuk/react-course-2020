import React from 'react'

interface CellProps {
	isAlive: boolean
}

const Cell: React.FC<CellProps> = ({ isAlive }) => {
	return <>{isAlive.toString()}</>
}

export default Cell
