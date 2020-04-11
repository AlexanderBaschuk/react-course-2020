import React from 'react'

interface MagicButtonProps {
	increment: () => void
}

export const MagicButton: React.FC<MagicButtonProps> = ({ increment }) => (
	<button onClick={increment}>Button</button>
)
