import React, { Component } from 'react'

class ColorPicker extends Component {
  onChangeColor = (e) => {
    const { updateColor } = this.props
    updateColor(e.target.value)
  }

  render () {
    const { color } = this.props
    return (
      <div>
        <input value={color} type='color' onChange={this.onChangeColor} />
      </div>
    )
  }
}

export default ColorPicker
