import React from 'react'
import styled from 'styled-components'

const MenuItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: blue;
  }
`

/*const MenuItem = ({ children }) => {
  return (
    <Item>
      { children }
    </Item>
  )
}*/

export default MenuItem
