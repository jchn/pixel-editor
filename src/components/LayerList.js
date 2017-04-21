import React from 'react'
import LayerListItem from './LayerListItem'
import styled from 'styled-components'

const Wrapper = styled.div`
  border-left: 1px solid #979797;
  background-color: #1c1a22;
  width: 250px;
  top: 0;
  right: 0;
  height: 100%;
`

const LayerList = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
)

LayerList.Item = LayerListItem

export default LayerList
