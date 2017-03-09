import React from 'react'
import LayerListItem from './LayerListItem'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid;
  background-color: #282828;
  width: 300px;
  position: fixed;
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
