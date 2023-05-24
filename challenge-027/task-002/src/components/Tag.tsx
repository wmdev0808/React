import styled from 'styled-components'

interface TagProps {
  color?: string
  borderRadius?: string
}

export const Tag = styled.span<TagProps>`
  display: inline-block;
  padding: 0.5em;
  background-color: ${(props) => props.color || 'red'};
  border-radius: ${(props) => props.borderRadius || '1em'};
`
