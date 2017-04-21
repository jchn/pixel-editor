import Item from './MenuItem'
import Menu from './Menu'
import React from 'react'
import { iiHoverable } from './Hoverable'
import styled from 'styled-components'

const Title = styled.h2`
  font-size: 1rem;
`

const SubMenuItem = styled(Item)`
  position: relative;
`

// const HoverableSubMenuItem = iiHoverable('isHovering')(SubMenuItem)

const SubMenu = ({ children, title, showSubMenu }) => {
  return (
    <SubMenuItem>
      <Title>{ title }</Title>
        {showSubMenu &&
          <div style={{ position: 'absolute', bottom: '-35px', left: 0 }}>
            <Menu>
              { children }
            </Menu>
          </div>
        }
    </SubMenuItem>
  )
}

console.log('iiHoverable', iiHoverable)

export default iiHoverable('showSubMenu')(SubMenu)
