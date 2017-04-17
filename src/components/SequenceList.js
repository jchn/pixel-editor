import React from 'react'
import styled from 'styled-components'
import { prop } from 'ramda'

const SequenceList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
`

const SequenceListItem = styled.li`
  border: 1px solid white;
  padding: 20px;
  background-color: ${props => props.selected ? '#333' : '#282828'};
`
SequenceList.Item = SequenceListItem

export default SequenceList
