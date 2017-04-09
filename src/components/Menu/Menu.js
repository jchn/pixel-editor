import React from 'react'
import styled from 'styled-components'

const List = styled.ol`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  background-color: #4a4a4a;
  color: white;
`

const Menu = ({ children }) => {
  return (
    <List>
      { children }
    </List>
  )
}

export default Menu
