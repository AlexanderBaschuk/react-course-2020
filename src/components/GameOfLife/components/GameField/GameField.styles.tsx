import styled from '@emotion/styled'

export const GameFieldStyled = styled.div`
	padding: 10px 0;
`

interface RowStyleProps {
	height: number
}

export const RowStyled = styled.div<RowStyleProps>`
	display: 'block';
	padding: 0;
	height: ${(props) => props.height}px;
`
