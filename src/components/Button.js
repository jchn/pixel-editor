import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  padding: 5px;
  background-color: ${({ active }) => active ? '#8a8a8a' : '#4a4a4a'};
  border: 1px solid;
  border-radius: 3px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`

export default Button
