import React from 'react'
import Canvas from './Canvas'
import InlineEdit from 'react-edit-inline'
import styled from 'styled-components'
import Icon from './Icon'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #1c1a22;
  border: 1px solid ${props => props.selected ? 'white' : '#77757e'}
  font-size: 0.875rem;
`

const ToggleButton = styled.button`
  border: none;
  background-color: transparent;
`

const LayerListItemCanvas = styled(Canvas)`
  border-radius: 3px;
`

const LayerListItem = ({ layer, selected, onClickToggle, ...props }) => {
  return (
    <Wrapper selected={selected} {...props}>
      <LayerListItemCanvas pixels={layer.pixels} scale={2} width={16} height={16} style={{ borderRadius: '3px' }} />
      <InlineEdit text={ layer.name } paramName='name' change={props.change} style={{ color: 'white' }} />
      <ToggleButton onClick={onClickToggle}><Icon type='eye' style={{ opacity: layer.isVisible ? 1 : 0.2 }} /></ToggleButton>
    </Wrapper>
  )
}

export default LayerListItem
