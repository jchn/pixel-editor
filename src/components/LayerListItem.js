import React from 'react'
import Canvas from './Canvas'
import InlineEdit from 'react-edit-inline'
import styled from 'styled-components'
import Icon from './Icon'

const Wrapper = styled.div`
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.selected ? '#333' : 'transparent'};
`

const ToggleButton = styled.button`
  border: none;
  background-color: transparent;
`

const LayerListItem = ({ layer, selected, onClickToggle, ...props }) => {
  return (
    <Wrapper selected={selected} {...props}>
      <InlineEdit text={ layer.name } paramName='name' change={props.change} style={{ color: 'white' }} />
      <ToggleButton onClick={onClickToggle}><Icon type='eye' style={{ opacity: layer.isVisible ? 1 : 0.2 }} /></ToggleButton>
      <Canvas pixels={layer.pixels} scale={2} width={16} height={16} />
    </Wrapper>
  )
}

export default LayerListItem
