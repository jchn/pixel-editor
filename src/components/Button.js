import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  padding: 6px;
  background-color: #1c1a22;
  border: 2px solid ${props => props.active ? 'white' : '#77757e'};
  border-radius: 3px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  line-height: 0;
  display: block;
`

export default Button
