import styled from '@emotion/styled'

interface CellStyleProps {
	size: number
	isAlive: boolean
}

export const CellStyled = styled.div<CellStyleProps>`
	display: 'inline-block';
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	backgroundColor: ${(props) => props.isAlive} ? '#000' : '#EEE'
`
