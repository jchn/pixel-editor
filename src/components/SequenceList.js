import React from 'react'
import styled from 'styled-components'
import { prop } from 'ramda'

const SequenceList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  background-color: #1c1a22;
  height: 168px;
  flex-shrink: 0;
`

const SequenceListItem = styled.li`
  border: 1px solid ${props => props.selected ? 'white' : '#77757e'};
  padding: 20px;
  background-color: #1C1a22;
`
SequenceList.Item = SequenceListItem

export default SequenceList
