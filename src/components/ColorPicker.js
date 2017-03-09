import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: #4a4a4a;
  padding: 0;
`

const Input = styled.input`
  background-color: transparent;
  border: none;
  padding: 0;
`

class ColorPicker extends Component {
  onChangeColor = (e) => {
    const { updateColor } = this.props
    updateColor(e.target.value)
  }

  render () {
    const { color } = this.props
    return (
      <Wrapper>
        <Input value={color} type='color' onChange={this.onChangeColor} />
      </Wrapper>
    )
  }
}

export default ColorPicker
