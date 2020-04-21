import styled from '@emotion/styled'

interface CellStyleProps {
	cellSize: number
	isAlive: boolean
}

export const CellStyled = styled.div<CellStyleProps>`
	display: inline-block;
	width: ${(props) => props.cellSize}px;
	height: ${(props) => props.cellSize}px;
	background-color: ${(props) => (props.isAlive ? '#000' : '#EEE')};
	transition: background-color 200ms;
`
