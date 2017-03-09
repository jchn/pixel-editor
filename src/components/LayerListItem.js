import React from 'react'
import Canvas from './Canvas'
import InlineEdit from 'react-edit-inline'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.selected ? '#333' : 'transparent'};
`

const LayerListItem = ({ layer, selected, ...props }) => {
  return (
    <Wrapper selected={selected} {...props}>
      <InlineEdit text={ layer.name } {...props} style={{ color: 'white' }} />
      <Canvas pixels={layer.pixels} scale={2} width={16} height={16} />
    </Wrapper>
  )
}

export default LayerListItem
