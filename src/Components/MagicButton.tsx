import React from 'react'

interface MagicButtonProps {
	increment: () => void
	count: number
}

export const MagicButton: React.FC<MagicButtonProps> = ({ increment, count }) => {
	const bars = '|'.repeat(count)
	return (
	<button onClick={increment}>Button {bars}</button>
)}

