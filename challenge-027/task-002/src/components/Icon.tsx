import styled from 'styled-components'
import { Tag } from './Tag'

export const Icon = styled.img`
  filter: blur(6px);

  ${Tag} &:hover {
    filter: none;
  }
`
