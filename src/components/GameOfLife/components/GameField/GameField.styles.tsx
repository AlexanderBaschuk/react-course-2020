import styled from '@emotion/styled'

interface RowStyleProps {
	height: number
}

export const RowStyled = styled.div<RowStyleProps>`
	display: 'block';
	padding: 0;
	height: ${(props) => props.height}px;
`
